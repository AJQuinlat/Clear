import React from "react";
import ApplicationDetails from "../components/application_details";
import './Dashboard.css';
import ApplicationsList from "./dashboard/Applications";
import AccountMenu from "../components/account_menu";

class Dashboard extends React.Component {
    beatOnce = false;

    constructor(props) {
        super(props)
        this.elementRef = React.createRef();
        this.detailsRef = React.createRef();

        this.state = {
            data: {},
            distanceToBottom: 0,
            detailsDistanceToBottom: 0,
        }
    }

    heartbeat() {
        fetch('http://localhost:3001/api/heartbeat',
            {
                method: "GET",
                credentials: "include"
            })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    data: body,
                });
            });
    }

    setHeartbeat() {
        const interval = setInterval(() => this.heartbeat(), 3000);
        return () => {
            clearInterval(interval);
        }
    }

    componentDidMount() {
        if (!this.beatOnce) {
            console.log(this.beatOnce);
            this.heartbeat();
            this.setHeartbeat();
            this.beatOnce = true;
        }

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
        const details = this.detailsRef.current;
        if (element) {
            const { top } = element.getBoundingClientRect();
            const distanceToBottom = window.innerHeight - top;
            this.setState({ distanceToBottom });
        }
        
        if (details) {
            const { top } = details.getBoundingClientRect();
            const detailsDistanceToBottom = window.innerHeight - top;
            this.setState({ detailsDistanceToBottom });
        }
    };

    render() {
        return (
            <page>
                <div className="h-1" />
                <section className="navbar px-8">
                    <div className="flex-1">
                        <button className="btn btn-ghost text-primary normal-case text-xl">Clear</button>
                    </div>  
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar" id="menuButton">
                                <div className="w-12 rounded-full">
                                    <img src="https://placehold.jp/150x150.png" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 pt-10 pb-4 px-8 shadow-lg menu dropdown-content bg-base-100 rounded-box w-80">
                                <AccountMenu user={this.state.data} />
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="flex-row flex">
                    <ApplicationsList data={this.state.data.applications} elementRef={this.state.elementRef} distanceToBottom={this.state.distanceToBottom} /> 
                    <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto" ref={this.detailsRef} style={{ "height": this.state.detailsDistanceToBottom+"px" }}>
                        <ApplicationDetails state="new_app"/>
                    </section>
                </section>
            </page>
        )
    }
}

export default Dashboard;