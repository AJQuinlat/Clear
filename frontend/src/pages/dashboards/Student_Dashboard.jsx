import React from "react";
import Application from "../../components/application";
import ApplicationDetails from "../../components/application_details";
import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.detailsRef = React.createRef();

    this.state = {
      data: [
        {
          step: 1,
          state: "APPROVED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 2,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 2,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 2,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 1,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 1,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
        {
          step: 1,
          state: "REJECTED",
          dateSubmitted: Date.now(),
          dateReturned: Date.now(),
          dateApproved: Date.now(),
          returnRemarks: "Missing commits in your repository.",
        },
      ],
      distanceToBottom: 0,
      detailsDistanceToBottom: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleScroll);
    this.updateDistanceToBottom();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScroll);
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
            <button className="btn btn-ghost text-primary normal-case text-xl">
              Clear
            </button>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                id="menuButton"
              >
                <div className="w-12 rounded-full">
                  <img src="https://placehold.jp/150x150.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 pt-10 pb-4 px-8 shadow-lg menu dropdown-content bg-base-100 rounded-box w-80"
              >
                <section className="flex flex-col m-auto">
                  <div className="mb-4 m-auto w-20 avatar">
                    <img
                      className="rounded-full"
                      src="https://placehold.jp/150x150.png"
                    />
                  </div>
                  <span className="text-lg text-center font-semibold m-auto">
                    John Vincent M. Corcega
                  </span>
                  <span className="text-xs text-center opacity-60 m-auto">
                    2021-04240
                  </span>
                  <span className="text-xs text-center opacity-60 m-auto">
                    Student - Second Year (2nd Semester)
                  </span>
                  <div className="h-8" />
                  <span className="text-md text-start font-semibold m-start">
                    Assigned Adviser
                  </span>
                  <div className="flex mt-3">
                    <div className="flex-none w-10 avatar">
                      <img
                        className="rounded-full"
                        src="https://placehold.jp/150x150.png"
                      />
                    </div>
                    <div className="flex flex-col flex-auto ml-4">
                      <span className="text-md font-semibold">
                        Arian J. Jacildo
                      </span>
                      <span className="text-xs text-light">
                        ajjacildo@up.edu.ph
                      </span>
                    </div>
                  </div>
                  <div className="h-6" />
                  <span className="text-md text-start font-semibold m-start">
                    Assigned Clearance Officer
                  </span>
                  <div className="flex mt-3">
                    <div className="flex-none w-10 avatar">
                      <img
                        className="rounded-full"
                        src="https://placehold.jp/150x150.png"
                      />
                    </div>
                    <div className="flex flex-col flex-auto ml-4">
                      <span className="text-md font-semibold">
                        John O-Neil V. Geronimo
                      </span>
                      <span className="text-xs text-light">
                        jvgeronimo@up.edu.ph
                      </span>
                    </div>
                  </div>
                  <div className="h-8" />
                  <button
                    onClick={console.log}
                    className="m-auto text-secondary text-base font-medium"
                  >
                    Log out{" "}
                    <span
                      className="align-middle material-symbols-rounded"
                      style={{ fontSize: "unset" }}
                    >
                      arrow_right_alt
                    </span>
                  </button>
                  <span className="m-auto mt-6 opacity-50 text-xs">
                    Padayon, Isko/Iska!
                  </span>
                </section>
              </ul>
            </div>
          </div>
        </section>
        <section className="flex-row flex">
          <section className="flex flex-col flex-none dashboard-list-section mx-8">
            <card className="flex-none card w-full bg-base-100 shadow-md mb-0">
              <Application data={this.state.data[0]} />
            </card>
            <section
              className="dashboard-list grow"
              ref={this.elementRef}
              style={{ height: this.state.distanceToBottom + "px" }}
            >
              {this.state.data.map((data) => {
                if (data !== this.state.data[0]) {
                  return <Application data={data} />;
                }
                return null;
              })}
              <div className="h-4" />
            </section>
            <button
              onclick="buttonHandler()"
              title="Contact Sale"
              class="relative z-90 bottom-16 mr-5 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"
            >
              <span
                className="align-middle material-symbols-rounded mr-2"
                style={{ fontSize: "20px" }}
              >
                add_circle
              </span>
              New application
            </button>
          </section>
          <section
            className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto"
            ref={this.detailsRef}
            style={{ height: this.state.detailsDistanceToBottom + "px" }}
          >
            <ApplicationDetails state="new_app" />
          </section>
        </section>
      </page>
    );
  }
}

export default Dashboard;
