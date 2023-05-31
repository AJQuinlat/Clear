import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from 'react-router-dom';
import Cookies from "universal-cookie";

export default function AccountMenu(properties) {
    const userInfo = properties.user.userInfo;
    const user = properties.user;
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [isLoggedIn, navigate])

    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");
        localStorage.removeItem("username");
        setIsLoggedIn(false)
    }

    if (userInfo === undefined || userInfo === null) {
        return (
            <section className="flex flex-col m-auto">
                <div className="mb-4 m-auto w-20 avatar">
                    <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                </div>
                <span className="text-lg text-center font-semibold m-auto">John Vincent M. Corcega</span>
                <span className="text-xs text-center opacity-60 m-auto">2021-04240</span>
                <span className="text-xs text-center opacity-60 m-auto">Student - Second Year (2nd Semester)</span>
                <div className="h-8" />
                <span className="text-md text-start font-semibold m-start">Assigned Adviser</span>
                <div className="flex mt-3">
                    <div className="flex-none w-10 avatar">
                        <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                    </div>
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold">Arian J. Jacildo</span>
                        <span className="text-xs text-light">ajjacildo@up.edu.ph</span>
                    </div>
                </div>
                <div className="h-6" />
                <span className="text-md text-start font-semibold m-start">Assigned Clearance Officer</span>
                <div className="flex mt-3">
                    <div className="flex-none w-10 avatar">
                        <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                    </div>
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold">John O-Neil V. Geronimo</span>
                        <span className="text-xs text-light">jvgeronimo@up.edu.ph</span>
                    </div>
                </div>
                <div className="h-8" />
                <button onClick={console.log} className="m-auto text-secondary text-base font-medium">Log out <span className="align-middle material-symbols-rounded" style={{ fontSize: 'unset' }}>arrow_right_alt</span></button>
                <span className="m-auto mt-6 opacity-50 text-xs">Padayon, Isko/Iska!</span>
            </section>
        );
    }

    return (
        <section className="flex flex-col m-auto">
            <div className="mb-4 m-auto w-20 avatar">
                <img className="rounded-full" src="https://placehold.jp/150x150.png" />
            </div>
            <span className="text-lg text-center font-semibold m-auto">{userInfo.firstName} {userInfo.lastName}</span>
            <span className="text-xs text-center opacity-60 m-auto">{userInfo.studentNumber}</span>
            <span className="text-xs text-center opacity-60 m-auto">{userInfo.userType.charAt(0).toUpperCase()}{userInfo.userType.slice(1).toLowerCase()} - {userInfo.course}</span>
            <div className="h-8" />
            <span className="text-md text-start font-semibold m-start">Assigned Adviser</span>
            <div className="flex mt-3">
                <div className="flex-none w-10 avatar">
                    <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                </div>
                {user.assignedAdviser === undefined || user.assignedAdviser === null ?
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold my-auto">Not assigned</span>
                    </div>
                    :
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold my-auto">{user.assignedAdviser.firstName} {user.assignedAdviser.lastName}</span>
                        <span className="text-xs text-light my-auto">{user.assignedAdviser.email}</span>
                    </div>
                }

            </div>
            <div className="h-6" />
            <span className="text-md text-start font-semibold m-start">Assigned Clearance Officer</span>
            <div className="flex mt-3">
                <div className="flex-none w-10 avatar">
                    <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                </div>
                {user.assignedOfficer === undefined || user.assignedOfficer === null ?
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold my-auto">Not assigned</span>
                    </div>
                    :
                    <div className="flex flex-col flex-auto ml-4">
                        <span className="text-md font-semibold my-auto">{user.assignedOfficer.firstName} {user.assignedOfficer.lastName}</span>
                        <span className="text-xs text-light my-auto">{user.assignedOfficer.email}</span>
                    </div>
                }
            </div>
            <div className="h-8" />
            <button onClick={logout} className="m-auto text-secondary text-base font-medium">Log out <span className="align-middle material-symbols-rounded" style={{ fontSize: 'unset' }}>arrow_right_alt</span></button>
            <span className="m-auto mt-6 opacity-50 text-xs">Padayon, Isko/Iska!</span>
        </section>
    );
}