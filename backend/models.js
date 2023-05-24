import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    studentNumber: { type: String, required: true },
    course: { type: String, required: true },
    college: { type: String, required: true },
    userType: { type: String, required: true, default: "STUDENT" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    applications: { type: String, required: false },
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
export { User };
