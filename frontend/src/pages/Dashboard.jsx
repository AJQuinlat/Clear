import React from "react";
import { useState, useEffect } from "react";
import ApplicationDetails from "../components/application_details";
import { useNavigate, useLoaderData } from 'react-router-dom';
import './Dashboard.css';
import ApplicationsList from "./dashboard/Applications";
import AccountMenu from "../components/account_menu";

export default function Dashboard() {
    const [isLoggedIn] = useState(useLoaderData());
    const [data, setData] = useState([]);
    const [appListHeight, setApplicationListHeight] = useState([]);
    const [detailsHeight, setDetailsPaneHeight] = useState([]);
    const [currentApplication, setCurrentApplication] = useState([]);
    const [isNewApplication, setNewApplication] = useState(false);
    const [paneState, setPaneState] = useState([]);
    const navigate = useNavigate();

    let appList = React.createRef();
    let detailsPane = React.createRef();

    function heartbeat() {
        fetch('http://localhost:3001/api/heartbeat',
            {
                method: "GET",
                credentials: "include"
            })
            .then(response => response.json())
            .then(body => {
                setData(body);
            });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        heartbeat();
        const interval = setInterval(() => heartbeat(), 3000);
        return () => {
            clearInterval(interval);
        }
    }, [isLoggedIn, navigate]);


    useEffect(() => {
        function onResize() {
            const element = appList.current;
            const details = detailsPane.current;

            if (element) {
                const { top } = element.getBoundingClientRect();
                setApplicationListHeight(window.innerHeight - top);
            }

            if (details) {
                const { top } = details.getBoundingClientRect();
                setDetailsPaneHeight(window.innerHeight - top);
            }
        }

        onResize();
        window.addEventListener('resize', onResize);
    });

    useEffect(() => {
        setNewApplication(isNewApplication);
        setPaneState(isNewApplication ? "new_app" : "info_app");
    }, [currentApplication, isNewApplication]);

    function onSubmitApplication() {
        setNewApplication(false);
        setCurrentApplication([]);
        setPaneState("info_app");
        heartbeat();
    }

    return (
        <div>
            <div className="h-1" />
            <section className="navbar px-8">
                <div className="flex-1">
                    <button className="btn btn-ghost text-primary normal-case text-xl">Clear</button>
                </div>
                {data.userInfo !== undefined && data.userInfo.userType === "ADMINISTRATOR" ?
                    <ul className="text-primary px-10 space-x-5">
                        <li><button className="font-semibold underline" href="/admin/applications">Applications</button></li>
                        <li><button href="/admin/students">Students</button></li>
                        <li><button href="/admin/accounts">Manage Accounts</button></li>
                    </ul>
                    :
                    null
                }
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" id="menuButton">
                            <div className="w-12 rounded-full">
                                <img src={"../assets/images/profile-default.webp"} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 pt-10 pb-4 px-8 shadow-lg menu dropdown-content bg-base-100 rounded-box w-80">
                            <AccountMenu user={data} />
                        </ul>
                    </div>
                </div>
            </section>
            <section className="flex-row flex">
                <ApplicationsList onAppClick={setCurrentApplication} currentApp={currentApplication} onNewAppClick={setNewApplication} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                    <ApplicationDetails onSubmitApp={onSubmitApplication} data={currentApplication} state={paneState} semester={data.semester} year={data.year} user={data.userInfo} assignedAdviser={data.assignedAdviser} assignedOfficer={data.assignedOfficer} />
                </section>
            </section>
        </div>
    )
}
