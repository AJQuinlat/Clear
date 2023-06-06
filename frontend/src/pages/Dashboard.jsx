import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from 'react-router-dom';
import './Dashboard.css';
import Applications from "./dashboard/Applications";
import AccountMenu from "../components/account_menu";
import Students from "./dashboard/Students";
import Accounts from "./dashboard/Accounts";

export default function Dashboard() {
    const [isLoggedIn] = useState(useLoaderData());
    const [user, setUserInfo] = useState(undefined);
    const [appListHeight, setApplicationListHeight] = useState([]);
    const [detailsHeight, setDetailsPaneHeight] = useState([]);
    const [currentAccount, setCurrentAccount] = useState([]);
    const [tab, setTab] = useState(0);
    const navigate = useNavigate();

    let appList = React.createRef();
    let detailsPane = React.createRef();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        fetch('http://localhost:3001/api/accounts',
            {
                method: "GET",
                credentials: "include"
            })
            .then(response => response.json())
            .then(body => {
                setUserInfo(body);
            });
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
        setCurrentAccount([]);
    }, [tab]);

    useEffect(() => {
    }, [currentAccount]);

    return (
        <div>
            <div className="h-1" />
            <section className="navbar px-8">
                <div className="flex-1">
                    <button className="btn btn-ghost text-primary normal-case text-xl">Clear</button>
                </div>
                {user !== undefined && user.userInfo !== undefined && user.userInfo.userType === "ADMINISTRATOR" ?
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
                            <AccountMenu user={user} />
                        </ul>
                    </div>
                </div>
            </section>
            <div>
                {tab === 0
                    ? <Applications user={user} sectionRef={appList} sectionHeight={appListHeight} />
                    : null}
                {tab === 1
                    ? <Students user={user} sectionRef={appList} sectionHeight={appListHeight} />
                    : null}
                {tab === 2
                    ? <Accounts user={user} sectionRef={appList} sectionHeight={appListHeight} />
                    : null}
                {/* {tab === 1 ?
                    <section className="flex-row flex">
                        <StudentsList onAccountClick={onClickAccount} currentAccount={currentAccount} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                        <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                            <StudentProfile data={currentAccount} onApproved={onApproved} semester={data.semester} year={data.year} />
                        </section>
                    </section>
                    : null}
                {tab === 2 ?
                    <section className="flex-row flex">
                        <AccountsList onAccountClick={onClickAccount} currentAccount={currentAccount} data={data} elementRef={appList} distanceToBottom={appListHeight} />
                        <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={detailsPane} style={{ "height": detailsHeight + "px" }}>
                            <ManageAccount data={currentAccount} semester={data.semester} year={data.year} />
                        </section>
                    </section>
                    : null} */}
            </div>
        </div>
    )
}
