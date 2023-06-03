// Dependencies
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

// Connect to the defined repository
await mongoose.connect('mongodb://127.0.0.1:27017/Clear',
  { useNewUrlParser: true, useUnifiedTopology: true });

// get user model registered in Mongoose
const User = mongoose.model("users");
const Application = mongoose.model("applications");

const signUpWithEmail = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    studentNumber: req.body.studentNumber,
    course: req.body.course,
    college: req.body.college,
    userType: "STUDENT",
    email: req.body.email,
    password: req.body.password
  });

  console.log(req.body);
  const result = await newUser.save();

  if (result._id) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
}

const addApplication = async (req, res) => {
  const newApplication = new Application({
    uid: req.body.uid,
    user: req.body.user,
    adviserUid: req.body.adviserUid,
    officerUid: req.body.officerUid,
    adviser: req.body.adviser,
    officer: req.body.officer,
    status: "PENDING",
    step: req.body.step,
    submission: req.body.submission,
    year: req.body.year,
    semester: req.body.semester,
    dateSubmitted: req.body.dateSubmitted,
    dateApproved: req.body.dateApproved,
    dateReturned: req.body.dateReturned
  });

  console.log(req.body);
  const result = await newApplication.save();

  if (result._id) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
}

const updateApplication = async (req, res) => {
  try {
    let application;

    if (req.body.dateApproved !== undefined) {
      if (req.body.step === 3) {
        application = await Application.updateOne({ _id: req.body.id }, { step: req.body.step, status: "APPROVED", dateApproved: req.body.dateApproved, remarks: req.body.remarks });
      } else {
        application = await Application.updateOne({ _id: req.body.id }, { step: req.body.step, dateApproved: req.body.dateApproved });
      }
    } else if (req.body.dateReturned !== undefined) {
      application = await Application.updateOne({ _id: req.body.id }, { dateReturned: req.body.dateReturned, status: "REJECTED", remarks: req.body.remarks });
    }

    // If saving is successful and there were matches, return success
    res.send({ success: (application.acknowledged && application.matchedCount > 0) })
  } catch (err) {
    console.log(err);
    res.send({ success: false })
  }
}

const signInWithEmail = async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check if email exists
  const user = await User.findOne({ email })

  //  Scenario 1: FAIL - User doesn't exist
  if (!user) {
    return res.send({ success: false })
  }

  // Check if password is correct using the Schema method defined in User Schema
  user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      return res.send({ success: false });
    }

    // Scenario 3: SUCCESS - time to create a token
    const tokenPayload = {
      _id: user._id
    }

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    // return the token to the client
    return res.send({ success: true, token, username: user.name });


  })
}

async function getUser(req) {
  // Scenario 1 - No cookies / no authToken cookie sent
  if (!req.cookies || !req.cookies.authToken) {
    return null;
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET_STRING');

    // check if the _id in the payload is an existing user id
    const user = await User.findById(tokenPayload._id);

    if (user) {
      // SUCCESS Scenario - User is found
      return user;
    } else {
      // FAIL Scenario 2 - Token is valid but user id not found
      return null;
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return null;
  }
}

const heartbeat = async (req, res) => {
  let data = {};
  data.userInfo = await getUser(req);

  // Check if token is valid and user is logged in
  if (data.userInfo === null) {
    return res.send(data);
  }

  data.semester = 2;
  data.year = 2022;

  data.userInfo.password = undefined;

  switch (data.userInfo.userType) {
    case "STUDENT":
      data.applications = await Application.find({ uid: data.userInfo._id, semester: data.semester, year: data.year }).sort({ dateSubmitted: "desc" });

      try {
        data.assignedAdviser = await User.findById(data.userInfo.adviserUid);
        data.assignedAdviser.password = undefined;
      } catch (e) {
        console.log(e);
      }

      try {
        data.assignedOfficer = await User.findById(data.userInfo.officerUid);
        data.assignedOfficer.password = undefined;
      } catch (e) {
        console.log(e);
      }

      break;
    case "ADVISER":
      data.applications = await Application.find({ adviserUid: data.userInfo._id, semester: data.semester, year: data.year }).sort({ dateSubmitted: "desc" });
      break;
    case "CLEARANCE_OFFICER":
      data.applications = await Application.find({ officerUid: data.userInfo._id, step: 2, semester: data.semester, year: data.year }).sort({ dateSubmitted: "desc" });
      break;
    case "ADMINISTRATOR":
      data.applications = await Application.find({}).sort({ dateSubmitted: "desc" });
      break;
  }

  return res.send(data);
}

const checkIfLoggedIn = async (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // FAIL Scenario 1 - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET_STRING');

    // check if the _id in the payload is an existing user id
    const user = await User.findById(tokenPayload._id)

    if (user) {
      // SUCCESS Scenario - User is found
      return res.send({ isLoggedIn: true })
    } else {
      // FAIL Scenario 2 - Token is valid but user id not found
      return res.send({ isLoggedIn: false })
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return res.send({ isLoggedIn: false });
  }
}

export { signUpWithEmail, signInWithEmail, heartbeat, addApplication, updateApplication }
