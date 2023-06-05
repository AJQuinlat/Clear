
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';
import './Login.css';

export default function Login() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // redirect when login is successful
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    function signUp() {
        if (!isLoggedIn) {
            navigate("/sign-up")
        }
    }

    function logIn(event) {
        event.preventDefault();

        // Get the data from form
        const formData = new FormData(event.target);

        // Construct the object based on form
        let data = {};
        data.email = formData.get("email");
        data.password = formData.get("password");

        fetch("http://localhost:3001/api/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) {
                    setIsLoggedIn(true)
                    // successful log in. store the token as a cookie
                    const cookies = new Cookies()
                    cookies.set(
                        "authToken",
                        body.token,
                        {
                            path: "localhost:3001/",
                            age: 60 * 60,
                            sameSite: false
                        });

                    localStorage.setItem("username", body.username);
                }
                else {
                    switch (body.reason) {
                        case "account-not-exist":
                            document.getElementById('not-exist-modal').checked = true;
                            break;
                        case "wrong-email-password":
                            document.getElementById('account-error-modal').checked = true;
                            break;
                        case "not-approved":
                            document.getElementById('not-approved-modal').checked = true;
                            break;
                        default:
                            document.getElementById('error-modal').checked = true;
                            break;
                    }
                }
            })
    }

    return (
        <div className="login-page flex h-screen">
            <section className="login-section flex-auto m-auto">
                <img className="max-h-16 my-8 m-auto" src={"../assets/images/UPLB-VIG-HR-White-1.webp"} alt="UPLB Logo" />
                <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-75 card w-96 bg-base-100 shadow-xl m-auto">
                    <form onSubmit={logIn}>
                        <div className="card-body px-12 py-14 justify-self-center">
                            <h1 className="mb-2 text-4xl text-primary font-bold leading-snug">Login to your account</h1>
                            <input type="text" name="email" placeholder="Email" className="input input-bordered my-0.5 w-full max-w-xs" required />
                            <input type="password" name="password" placeholder="Password" className="input input-bordered my-0.5 w-full max-w-xs" required />

                            <text class="mt-4 text-center text-xs font-medium leading-0.5">Forgotten your password?</text>
                            <text class="text-center text-xs leading-none">Contact an administrator to reset your password.</text>

                            <button type="submit" className="mt-6 mb-2 text-base-300 btn btn-primary">Log in</button>
                            <button className="text-secondary m-auto font-semibold" onClick={signUp}>Don’t have an account? Sign up.</button>
                        </div>
                    </form>
                </div>
                <div className="h-20" />
                <input type="checkbox" id="not-approved-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Account not approved</h3>
                        <p className="py-4">Please wait for an administrator to approve your account and try logging in later.</p>
                        <div className="modal-action">
                            <label htmlFor="not-approved-modal" className="btn">OK</label>
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
                <input type="checkbox" id="account-error-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Wrong email/password</h3>
                        <p className="py-4">Please carefully insert your email and password and try again.</p>
                        <div className="modal-action">
                            <label htmlFor="account-error-modal"className="btn">OK</label>
                        </div>
                    </div>
                </div>
                <input type="checkbox" id="not-exist-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Account does not exist</h3>
                        <p className="py-4">Please carefully insert your email and password and try again.</p>
                        <div className="modal-action">
                            <label htmlFor="not-exist-modal" className="btn">OK</label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
