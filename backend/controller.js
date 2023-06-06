// Dependencies
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

// Connect to the defined repository
await mongoose.connect('mongodb://127.0.0.1:27017/Clear',
  { useNewUrlParser: true, useUnifiedTopology: true });

// get user model registered in Mongoose
const User = mongoose.model("users");
const Application = mongoose.model("applications");

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

const addAccount = async (req, res) => {
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send({ success: false });
  }

  const newUser = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    studentNumber: req.body.studentNumber,
    college: req.body.college,
    userType: req.body.userType,
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

const editAccount = async (req, res) => {
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send({ success: false });
  }

  try {
    let account = await User.updateOne({ _id: req.body.id }, {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      studentNumber: req.body.studentNumber,
      college: req.body.college,
      email: req.body.email,
      password: req.body.password
    });

    // If saving is successful and there were matches, return success
    res.send({ success: (account.acknowledged && account.matchedCount > 0) })
  } catch (e) {
    res.send({ success: false })
  }
}

const deleteAccount = async (req, res) => {
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send({ success: false });
  }

  try {
    let account = await User.deleteOne({ _id: req.body.id });

    // If saving is successful and there were matches, return success
    res.send({ success: (account.acknowledged && account.deletedCount > 0) })
  } catch (err) {
    console.log(err);
    res.send({ success: false })
  }
}

const signUpWithEmail = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    studentNumber: req.body.studentNumber,
    course: req.body.course,
    college: req.body.college,
    userType: null,
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

const assignAccount = async (req, res) => {
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send({success: false});
  }
  
  try {
    let account;

    if (req.query.type === "officer") {
      account = await User.updateOne({ _id: req.body.id }, { officerUid: req.body.assignId });
    } else {
      account = await User.updateOne({ _id: req.body.id }, { adviserUid: req.body.assignId });
    }

    // If saving is successful and there were matches, return success
    res.send({ success: (account.acknowledged && account.matchedCount > 0) })
  } catch (err) {
    console.log(err);
    res.send({ success: false })
  }
}

const assignAccountType = async (req, res) => {
  let userInfo = await getUser(req);

  console.log(userInfo)

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send({ success: false });
  }

  try {
    let account = await User.updateOne({ _id: req.body.id }, { userType: req.body.userType });

    // If saving is successful and there were matches, return success
    res.send({ success: (account.acknowledged && account.matchedCount > 0) })
  } catch (err) {
    console.log(err);
    res.send({ success: false })
  }
}

const approveAccount = async (req, res) => {
  try {
    let account = await User.updateOne({ _id: req.body.id }, { userType: "STUDENT" });

    // If saving is successful and there were matches, return success
    res.send({ success: (account.acknowledged && account.matchedCount > 0) })
  } catch (err) {
    console.log(err);
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
    return res.send({ success: false, reason: "account-not-exist" })
  }

  // Check if password is correct using the Schema method defined in User Schema
  user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      return res.send({ success: false, reason: "wrong-email-password" });
    }

    // Scenario 3: FAIL - User is not approved yet
    if (user.userType === null) {
      return res.send({ success: false, reason: "not-approved" });
    }

    // Scenario 4: SUCCESS - time to create a token
    const tokenPayload = {
      _id: user._id
    }

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    // return the token to the client
    return res.send({ success: true, token, username: user.name });


  })
}

const getApplications = async (req, res) => {
  let data = [];
  let userInfo = await getUser(req);

  let semester = 2;
  let year = 2022;

  // Check if token is valid and user is logged in
  if (userInfo === null) {
    return res.send(data);
  }

  switch (userInfo.userType) {
    case "STUDENT":
      data = await Application.find({ uid: userInfo._id, semester: semester, year: year }).sort({ dateSubmitted: "desc" });
      break;
    case "ADVISER":
      data = await Application.find({ adviserUid: userInfo._id, semester: semester, year: year }).sort({ dateSubmitted: "desc" });
      break;
    case "CLEARANCE_OFFICER":
      data = await Application.find({ officerUid: userInfo._id, step: 2, semester: semester, year: year }).sort({ dateSubmitted: "desc" });
      break;
    case "ADMINISTRATOR":
      data = await Application.find({}).sort({ dateSubmitted: "desc" });
      break;
  }

  return res.send(data);
}

const getStudents = async (req, res) => {
  let data = [];
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo.userType !== "ADMINISTRATOR") {
    return res.send(data);
  }

  const students = await User.find().or([{ userType: "STUDENT", }, { userType: null, }]);
  for (let i = 0; i < students.length; i++) {
    data[i] = JSON.parse(JSON.stringify(students[i]));;
    data[i].password = undefined;

    data[i].assignedAdviser = undefined;
    data[i].assignedAdviser = undefined;

    try {
      data[i].assignedAdviser = await User.findById(data[i].adviserUid);
      data[i].assignedAdviser.password = undefined;
    } catch (e) {
      console.log(e);
    }

    try {
      data[i].assignedOfficer = await User.findById(data[i].officerUid);
      data[i].assignedOfficer.password = undefined;
    } catch (e) {
      console.log(e);
    }
  }

  return res.send(data);
}

const getOfficers = async (req, res) => {
  let data = [];
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send(data);
  }

  const accounts = await User.find({ userType: "CLEARANCE_OFFICER" });
  for (let i = 0; i < accounts.length; i++) {
    data[i] = JSON.parse(JSON.stringify(accounts[i]));;
    data[i].password = undefined;
  }

  return res.send(data);
}

const getAdvisers = async (req, res) => {
  let data = [];
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send(data);
  }

  const accounts = await User.find({ userType: "ADVISER" });
  for (let i = 0; i < accounts.length; i++) {
    data[i] = JSON.parse(JSON.stringify(accounts[i]));;
    data[i].password = undefined;
  }

  return res.send(data);
}

const getAccounts = async (req, res) => {
  let data = [];
  let userInfo = await getUser(req);

  // Check if token is valid and user is an administrator
  if (userInfo === null || userInfo === undefined || userInfo.userType !== "ADMINISTRATOR") {
    return res.send(data);
  }

  const accounts = await User.find({ userType: { $ne: "STUDENT" } });
  for (let i = 0; i < accounts.length; i++) {
    data[i] = JSON.parse(JSON.stringify(accounts[i]));;
    data[i].password = undefined;
  }

  return res.send(data);
}

const getUserInfo = async (req, res) => {
  let data = {};
  let userInfo = await getUser(req);

  // Check if token is valid and user is logged in
  if (userInfo === null) {
    return res.send({userInfo: null});
  }

  data.semester = 2;
  data.year = 2022;

  data.userInfo = JSON.parse(JSON.stringify(userInfo));
  data.userInfo.password = undefined;

  if (data.userInfo.userType === "STUDENT") {
    try {
      data.userInfo.assignedAdviser = await User.findById(data.userInfo.adviserUid);
      data.userInfo.assignedAdviser.password = undefined;
    } catch (e) {
      console.log(e);
    }

    try {
      data.userInfo.assignedOfficer = await User.findById(data.userInfo.officerUid);
      data.userInfo.assignedOfficer.password = undefined;
    } catch (e) {
      console.log(e);
    }
  }

  return res.send(data);
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

      data.students = [];


      data.accounts = await User.find({ userType: { $ne: "STUDENT" } });
      break;
  }

  console.log(data);
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

export { signUpWithEmail, addAccount, editAccount, deleteAccount, signInWithEmail, heartbeat, assignAccount, assignAccountType, addApplication, updateApplication, approveAccount, getUserInfo, getApplications, getAccounts, getStudents, getAdvisers, getOfficers }
