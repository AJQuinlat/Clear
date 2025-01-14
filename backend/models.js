import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    studentNumber: { type: String, required: true },
    course: { type: String, required: false },
    college: { type: String, required: true },
    userType: { type: String, required: false, default: null },
    email: { type: String, required: true },
    password: { type: String, required: true },
    adviserUid: { type: String, required: false },
    officerUid: { type: String, required: false },
});

const ApplicationSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    user: { type: mongoose.Schema.Types.Mixed, required: true },
    adviserUid: { type: String, required: true },
    officerUid: { type: String, required: true },
    adviser: { type: mongoose.Schema.Types.Mixed, required: true },
    officer: { type: mongoose.Schema.Types.Mixed, required: true },
    status: { type: String, required: true },
    step: { type: Number, required: true, min: 0, max: 3, default: 0 },
    submission: { type: mongoose.Schema.Types.Mixed, required: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    dateSubmitted: { type: Number, required: true },
    dateReturned: { type: Number, required: false, default: null },
    dateApproved: { type: Number, required: false, default: null },
    remarks: { type: String, required: false, default: null },
});

UserSchema.pre("updateOne", function (next) {
    const user = this;

    if (!user._update.password) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user._update.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            user._update.password = hash;
            return next();
        });
    });
});

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
}

const User = mongoose.model("users", UserSchema);
const Application = mongoose.model("applications", ApplicationSchema);
export { User, Application };
