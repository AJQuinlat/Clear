import React from "react";
import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <div className="login-page flex h-screen">
                <section className="login-section flex-auto m-auto">
                    <img className="max-h-16 my-8 m-auto" src={"../assets/images/UPLB-VIG-HR-White-1.webp"} alt="UPLB Logo" />
                    <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-75 card w-96 bg-base-100 shadow-xl m-auto">
                        <div className="card-body px-12 py-14 justify-self-center">
                            <h1 className="mb-2 text-4xl text-primary font-bold leading-snug">Login to your account</h1>
                            <input type="text" placeholder="Email" className="input input-bordered my-0.5 w-full max-w-xs" />
                            <input type="password" placeholder="Password" className="input input-bordered my-0.5 w-full max-w-xs" />

                            <text class="mt-4 text-center text-xs font-medium leading-0.5">Forgotten your password?</text>
                            <text class="text-center text-xs leading-none">Contact an administrator to reset your password.</text>

                            <button className="mt-6 mb-2 text-base-300 btn btn-primary">Log in</button>
                            <a className="text-secondary m-auto font-semibold" href="/">Don’t have an account? Sign up.</a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login;