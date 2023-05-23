import React from "react";
import Application from "../components/application";
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.elementRef = React.createRef();

        this.state = {
            data: [
                { "step": 1, "state": "APPROVED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 2, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 2, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 2, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 1, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 1, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
                { "step": 1, "state": "REJECTED", "dateSubmitted": Date.now(), "dateReturned": Date.now(), "dateApproved": Date.now(), "returnRemarks": "Missing commits in your repository." },
            ],
            distanceToBottom: 0,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleScroll);
        this.updateDistanceToBottom();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleScroll);
    }

    handleScroll = () => {
        this.updateDistanceToBottom();
    };

    updateDistanceToBottom = () => {
        const element = this.elementRef.current;
        if (element) {
            const { top } = element.getBoundingClientRect();
            const distanceToBottom = window.innerHeight - top;
            console.log(distanceToBottom);
            this.setState({ distanceToBottom });
        }
    };

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
                    <section className="flex flex-col flex-none dashboard-list-section mx-8">
                        <card className="flex-none card w-full bg-base-100 shadow-md mb-0">
                            <Application data={this.state.data[0]} />
                        </card>
                        <section className="dashboard-list grow" ref={this.elementRef} style={{ "height": this.state.distanceToBottom+"px" }}>
                            {this.state.data.map((data) => {
                                if (data !== this.state.data[0]) {
                                    return (
                                        <Application data={data} />
                                    )
                                }
                                return null;
                            })}
                            <div className="h-4" />
                        </section>
                    </section>
                    <section className="flex-auto"></section>
                </section>
            </page>
        )
    }
}

export default Dashboard;