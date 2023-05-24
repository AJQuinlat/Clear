import React from "react";
import './Signup.css';

class Signup extends React.Component {
    render() {
        return (
            <div className="signup-page flex h-screen overflow-y-scroll">
                <form>
                    <img className="max-h-12 px-10 my-4" src={"../assets/images/UPLB-VIG-HR-White-1.webp"} alt="UPLB Logo" />
                    <div className="px-12 justify-self-center">
                        <h1 className="text-3xl text-primary font-bold">Sign up for a Clear account</h1>
                        <text class="mb-12 text-left text-xs font-medium leading-0.5">By signing up, you agree to Clear's terms and conditions and privacy policy</text>
                            

                        <h2 className="mb-2 mt-10 text-xl text-primary font-bold leading-snug">Student Information</h2>

                        <h3 className="text-base text-primary font-bold leading-snug">Name</h3>
                        <div class="grid gap-2 mb-6 md:grid-cols-3">
                            <input type="text" class="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="First Name" required/>
                            <input type="text" class="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="Middle Name" required/>
                            <input type="text" class="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" placeholder="Last Name" required/>
                        </div>
                            
                        <h3 className="mb-2 text-base text-primary font-bold leading-snug">Course and College</h3>
                        <div class="grid gap-2 mb-6 md:grid-cols-2">
                            <div className="">
                                <input type="text" placeholder="Course/Program" className="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full mb-4" />
                                <input type="text" placeholder="Student ID/number" className="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" />
                            </div>

                            <select className="input input-bordered h-8 bg-gray-300 border border-gray-300 text-sm rounded block w-full valid:text-black">
                                <option value="" disabled selected>College</option>
                                <option value="CAS">CAS</option>
                                <option value="CEAT">CEAT</option>
                                <option value="CFNR">CFNR</option>
                                <option value="CAFS">CAFS</option>
                            </select>
                        </div>

                        <h2 className="mb-2 text-xl text-primary font-bold leading-snug">Acccount Information</h2>
                        <text class="text-left text-xs">Ensure the e-mail you are using to sign-up is your UP Mail account</text>

                        <div class="grid gap-2 mb-6 md:grid-cols-3">
                            <input type="text" placeholder="Email" className="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" />
                            <input type="password" placeholder="Password" className="input input-bordered h-8 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded w-full" />
                        </div>

                        <button className="mb-2 text-base-300 btn btn-primary rounded-2xl h-10 w-full">Sign-up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;
