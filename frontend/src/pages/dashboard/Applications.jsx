/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import ApplicationDetails from "../../components/application_details";
import Application from "../../components/application";
import StudentApplication from "../../components/application_student";
import Search from "../../components/search";
import moment from 'moment';

export default function Applications(properties) {
  const { user, sectionRef, sectionHeight } = properties;
  const [applications, setApplications] = useState([]);

  const [currentApplication, setCurrentApplication] = useState([]);
  const [isNewApplication, setNewApplication] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [paneState, setPaneState] = useState([]);

  function getApplications() {
    console.log("GET");
    fetch('http://localhost:3001/api/applications',
      {
        method: "GET",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        setApplications(body);
      });
  };

  useEffect(() => {
    getApplications();
    const interval = setInterval(() => getApplications(), 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  // query from search
  const [query, setQuery] = useState("")

  // new list of applications to display
  let filteredApps = []

  // filter setting
  const [filter, setFilter] = useState("NAME");
  function filterBy(value) {
    if (filter === value) {
      setFilter("NAME");
    } else {
      setFilter(value);
    }
  }

  // sort setting
  const [sort, setSort] = useState("NONE");
  function sortBy(value) {
    if (sort === value) {
      setSort("NONE");
    } else {
      setSort(value);
    }
  }

  // filtering and sorting functionality
  if (applications !== undefined) {
    switch (filter) {
      case "DATE":
        filteredApps = applications.filter((app) => {
          let date = new Date(app.dateSubmitted);
          return moment(date)
            .format("dddd LL")
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        break;
      case "ADVISER":
        filteredApps = applications.filter((app) => {
          return (
            app.adviser.firstName +
            " " +
            app.adviser.middleName +
            " " +
            app.adviser.lastName
          )
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        break;
      case "STATUS":
        filteredApps = applications.filter((app) => {
          return String(app.status)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        break;
      case "STEP":
        filteredApps = applications.filter((app) => {
          return String(app.step).toLowerCase().includes(query.toLowerCase());
        });
        break;
      case "NAME":
        filteredApps = applications.filter((app) => {
          return (
            app.user.firstName +
            " " +
            app.user.middleName +
            " " +
            app.user.lastName
          )
            .toLowerCase()
            .includes(query.toLowerCase());
        });
    }
    switch (sort) {
      case "SDATE":
        filteredApps = filteredApps.sort(function (a, b) {
          return new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
        });
        break;
      case "SNAME":
        filteredApps = filteredApps.sort((a, b) =>
          a.user.firstName > b.user.firstName ? 1 : -1
        );
        break;
    }
  }

  function btnNewAppClick() {
    setNewApplication(true);
  }

  useEffect(() => {
    setNewApplication(isNewApplication);
    setPaneState(isNewApplication ? "new_app" : "info_app");
    if (!isNewApplication && currentApplication.status === "REJECTED" && isCard) {
      document.getElementById("link").value = currentApplication.submission.link;
      document.getElementById("remarks").value = currentApplication.submission.remarks;
    }
  }, [currentApplication, isNewApplication, isCard]);

  function onSubmitApplication() {
    setNewApplication(false);
    setCurrentApplication([]);
    setPaneState("info_app");
    getApplications();
  }

  function onClickApplication(app, card) {
    setIsCard(card);
    setCurrentApplication(app);
  }

  if (user === undefined) {
    return (<></>);
  }

  function getApplicationsList() {
    if ((user.userInfo.userType === "STUDENT") && (user.userInfo.assignedAdviser === undefined || user.assignedAdviser === null || user.userInfo.assignedOfficer === undefined || user.userInfo.assignedOfficer === null)) {
      return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
            <Application data={({ status: "NO_OFFICER" })} isCard={true} />
          </card>
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          </section>
        </section>
      );
    }

    if ((user.userInfo.userType === "STUDENT") && (applications === undefined || applications.length === 0 || (applications.length === 1 && applications[0].step === 0))) {
      return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
            <Application data={({ status: null })} isCard={true} />
          </card>
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          </section>
          <button onClick={btnNewAppClick}
            className="relative z-90 bottom-6 mx-8 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New application</button>
        </section>
      );
    }

    return (
      <section className="flex flex-col flex-none dashboard-list-section">
        {user.userInfo.userType === "STUDENT" ?
          <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
            <Application onAppClick={onClickApplication} currentApp={currentApplication} data={applications[0]} isCard={true} />
          </card>
          :
          <Search data={applications} query={query} onQuery={setQuery} filter={filter} filterBy={filterBy} sort={sort} sortBy={sortBy} />
        }
        {user.userInfo.userType === "STUDENT" ?
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
            {applications.slice(1).map((data) => {
              return (
                <Application onAppClick={onClickApplication} currentApp={currentApplication} data={data} isCard={false} />
              )
            })}
            <div className="h-4" />
          </section>
          :
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
            {filteredApps.map((app) => {
              return (
                <StudentApplication onAppClick={onClickApplication} currentApp={currentApplication} user={user} data={app} isCard={false} />
              )
            })}
            <div className="h-4" />
          </section>
        }
      </section>
    );
  }

  return (
    <section className="flex-row flex" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
      {getApplicationsList()}
      <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto">
        <ApplicationDetails isFirst={isCard} onSubmitApp={onSubmitApplication} data={currentApplication} state={paneState} semester={user.semester} year={user.year} user={user} assignedAdviser={user.assignedAdviser} assignedOfficer={user.assignedOfficer} />
      </section>
    </section>
  )
}
