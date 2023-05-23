import React from "react";
import Application from "../components/application";
import ApplicationDetails from "../components/application_details";
import './Dashboard.css';

class Dashboard extends React.Component {
    render() {
        return (
            <page>

                <section className="navbar">
                    <div className="flex-1">
                        <button className="btn btn-ghost text-primary normal-case text-xl">Clear</button>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://placehold.jp/150x150.png" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 py-12 px-12 shadow menu dropdown-content bg-base-100 rounded-box w-80">
                                <section className="m-auto">
                                    <div className="w-20 avatar">
                                        <img className="rounded-full" src="https://placehold.jp/150x150.png" />
                                    </div>
                                </section>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="flex-row flex my-6">
                    <section className="flex flex-col flex-none dashboard-list-section mx-8 ">
                        <card className="flex-none card w-full bg-base-100 shadow-md mb-0">
                            <Application state="pending" />
                        </card>
                        <section className="max-h-screen overflow-y-auto grow">
                            <Application state="rejected" reviewBy="Clearance Officer" />
                            <Application state="rejected" reviewBy="Adviser" />
                            <Application state="rejected" reviewBy="Adviser" />
                            <Application state="rejected" reviewBy="Adviser" />
                            <Application state="rejected" reviewBy="Adviser" />
                            <Application state="rejected" reviewBy="Adviser" />
                        </section>
                    </section>
                    <section className="flex-auto bg-base-100 w-full rounded-l-lg">
                        <ApplicationDetails state="new_app"/>
                    </section>
                </section>
            </page>
        )
    }
}

export default Dashboard;