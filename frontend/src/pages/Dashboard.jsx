import React from "react";
import { useState, useEffect } from "react";
import ApplicationDetails from "../components/application_details";
import { useNavigate, useLoaderData } from 'react-router-dom';
import './Dashboard.css';
import ApplicationsList from "./dashboard/Applications";
import AccountMenu from "../components/account_menu";
import StudentsList from "./dashboard/Students";
import AccountsList from "./dashboard/Accounts";
import StudentProfile from "../components/student_profile";

export default function Dashboard() {
    const [isLoggedIn] = useState(useLoaderData());
    const [data, setData] = useState([]);
    const [appListHeight, setApplicationListHeight] = useState([]);
    const [detailsHeight, setDetailsPaneHeight] = useState([]);
    const [currentApplication, setCurrentApplication] = useState([]);
    const [currentAccount, setCurrentAccount] = useState([]);
    const [isNewApplication, setNewApplication] = useState(false);
    const [isCard, setIsCard] = useState(false);
    const [paneState, setPaneState] = useState([]);
    const [tab, setTab] = useState(0);
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
        if (!isNewApplication && currentApplication.status === "REJECTED" && isCard) {
            document.getElementById("link").value = currentApplication.submission.link;
            document.getElementById("remarks").value = currentApplication.submission.remarks;
        }
    }, [currentApplication, isNewApplication, isCard, tab]);

    useEffect(() => {
        console.log(currentAccount);
    }, [currentAccount]);

    function onSubmitApplication() {
        setNewApplication(false);
        setCurrentApplication([]);
        setPaneState("info_app");
        heartbeat();
    }

    function onClickApplication(app, card) {
        setIsCard(card);
        setCurrentApplication(app);
    }

    function onClickAccount(account) {
        console.log("CLICK");
        setCurrentAccount(account);
    }

    return (
        <div>
            <div className="h-1" />
            <section className="navbar px-8">
                <div className="flex-1">
                    <button className="btn btn-ghost text-primary normal-case text-xl">Clear</button>
                </div>
                {data.userInfo !== undefined && data.userInfo.userType === "ADMINISTRATOR" ?
                    <div className="tabs tabs-boxed mr-4">
                        <button onClick={(e) => setTab(0)} className={(tab === 0 ? "font-semibold tab-active " : "") + "font-medium tab"}>Applications</button>
                        <button onClick={(e) => setTab(1)} className={(tab === 1 ? "font-semibold tab-active " : "") + "font-medium tab"}>Students</button>
                        <button onClick={(e) => setTab(2)} className={(tab === 2 ? "font-semibold tab-active " : "") + "font-medium tab"}>Manage Accounts</button>
                    </div>
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
            <div>
                {tab === 0 ?
                    <section className="flex-row flex">
                        <ApplicationsList onAppClick={onClickApplication} currentApp={currentApplication} onNewAppClick={setNewApplication} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                        <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                            <ApplicationDetails isFirst={isCard} onSubmitApp={onSubmitApplication} data={currentApplication} state={paneState} semester={data.semester} year={data.year} user={data.userInfo} assignedAdviser={data.assignedAdviser} assignedOfficer={data.assignedOfficer} />
                        </section>
                    </section>
                    : null}
                {tab === 1 ?
                    <section className="flex-row flex">
                        <StudentsList onAccountClick={onClickAccount} currentAccount={currentAccount} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                        <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                            <StudentProfile data={currentAccount} semester={data.semester} year={data.year} />
                        </section>
                    </section>
                    : null}
                {tab === 2 ?
                    <section className="flex-row flex">
                        <AccountsList onAppClick={onClickApplication} currentApp={currentApplication} onNewAppClick={setNewApplication} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                        <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                            <ApplicationDetails isFirst={isCard} onSubmitApp={onSubmitApplication} data={currentApplication} state={paneState} semester={data.semester} year={data.year} user={data.userInfo} assignedAdviser={data.assignedAdviser} assignedOfficer={data.assignedOfficer} />
                        </section>
                    </section>
                    : null}
            </div>
        </div>
    )
}
