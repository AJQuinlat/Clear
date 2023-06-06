import React from "react";
import { Navigate } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closeSignUp: false,
        }

        this.onSignUp = this.onSignUp.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    goToLogin() {
        this.setState({ closeSignUp: true });
    }

    onSignUp(event) {
        event.preventDefault();

        // Get the data from form
        const formData = new FormData(event.target);

        // Construct the object based on form
        let data = {};
        data.firstName = formData.get("first-name");
        data.middleName = formData.get("middle-name");
        data.lastName = formData.get("last-name");
        data.studentNumber = formData.get("student-number");
        data.course = formData.get("course");
        data.college = formData.get("college");
        data.email = formData.get("email");
        data.password = formData.get("password");

        fetch('http://localhost:3001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(body => {
                if (body.success) {
                    document.getElementById('success-modal').checked = true;
                } else {
                    document.getElementById('error-modal').checked = true;
                    alert("An error has occured. Please try again.");
                }
            });
    }

    render() {
        return (
            <div className="signup-page flex h-screen overflow-y-scroll">
                <form className="my-auto" onSubmit={this.onSignUp}>
                    <img className="max-h-20 px-10 my-4" src={"../assets/images/UPLB-VIG-HR-White-1.webp"} alt="UPLB Logo" />
                    <div className="px-12 justify-self-center">
                        <h1 className="text-5xl text-primary font-bold mb-2">Sign up for a Clear account</h1>
                        <text class="mb-12 text-left text-sm font-medium leading-1">By signing up, you agree to Clear&#39;s terms and conditions and privacy policy</text>
                        <h2 className="mb-8 mt-10 text-2xl text-primary font-bold leading-snug">Student Information</h2>
                        <h3 className="mb-2 text-primary text-xl font-bold leading-snug">Name</h3>
                        <div class="grid gap-2 mb-6 md:grid-cols-3">
                            <input name="first-name" type="text" class="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="First Name" required />
                            <input name="middle-name" type="text" class="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="Middle Name" />
                            <input name="last-name" type="text" class="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="Last Name" required />
                        </div>

                        <h3 className="mb-2 mt-12 text-xl text-primary font-bold leading-snug">Course and College</h3>
                        <div class="grid gap-8 mb-6 md:grid-cols-2">
                            <div className="">
                                <input name="course" type="text" placeholder="Course/Program" className="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full mb-4" required />
                                <input name="student-number" type="text" placeholder="Student ID/number" className="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" required />
                            </div>

                            <select name="college" className="select select-bordered bg-gray-300 border border-gray-300 text-sm rounded block w-full">
                                <option value="" disabled selected>College</option>
                                <option value="CAFS">College of Agriculture and Food Science</option>
                                <option value="CAS">College of Arts and Sciences</option>
                                <option value="CDC">College of Development Communication</option>
                                <option value="CEM">College of Economics and Management</option>
                                <option value="CEAT">College of Engineering and Agro-Industrial Technology</option>
                                <option value="SESAM">School of Environmental Science and Management</option>
                                <option value="CFNR">College of Forestry and Natural Resources</option>
                                <option value="GS">Graduate School</option>
                                <option value="CHE">College of Human Ecology</option>
                                <option value="CPAF">College of Public Affairs and Development</option>
                                <option value="CVM">College of Veterinary Medicine</option>
                            </select>
                        </div>

                        <h2 className="mt-12 text-2xl text-primary font-bold leading-snug">Account Information</h2>
                        <text class="text-left text-sm">Ensure the e-mail you are using to sign-up is your UP Mail account</text>

                        <div class="grid gap-2 mb-6 mt-4 md:grid-cols-3">
                            <input pattern="[a-z0-9._%+-]+@up.edu.ph" type="email" name="email" placeholder="Email" className="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" required />
                            <input name="password" type="password" placeholder="Password" className="input input-bordered bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" required />
                        </div>

                        <button type="submit" className="mb-2 text-base-300 btn btn-primary rounded-xl h-10 w-full">Sign-up</button>
                        <div className="h-20" />
                    </div>
                </form>
                <input type="checkbox" id="success-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Signed up successfully</h3>
                        <p className="py-4">Your account has been successfully added. Please wait for an administrator to approve your account. Welcome to Clear!</p>
                        <div className="modal-action">
                            <label htmlFor="success-modal" onClick={this.goToLogin} className="btn">OK</label>
                        </div>
                    </div>
                </div>
                <input type="checkbox" id="error-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">An error has occured</h3>
                        <p className="py-4">Please try again later.</p>
                        <div className="modal-action">
                            <label htmlFor="error-modal" className="btn">OK</label>
                        </div>
                    </div>
                </div>
                {this.state.closeSignUp &&
                    <Navigate to="/login" />
                }
            </div>
        )
    }
}

export default Signup;
