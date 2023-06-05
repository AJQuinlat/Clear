/* eslint-disable default-case */
import { React, useState } from "react";
import Application from "../../components/application";
import StudentApplication from "../../components/application_student";
import Search from "../../components/search";
import moment from 'moment';
import UserTile from "../../components/user_list_tile";

export default function StudentsList(properties) {
    const { currentAccount, onAccountClick, elementRef, distanceToBottom, data } = properties;
    const students = data.students;

    // query from search
    const [query, setQuery] = useState("")

    // new list of students to display
    let filteredStuds = []

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
    if (students !== undefined) {
      switch (filter) {
        case "DATE":
          // add if date of account creation is added
          break;
        case "ADVISER":
          filteredStuds = students.filter((stud) => {
            return (
              stud.assignedAdviser.firstName +
              " " +
              stud.assignedAdviser.middleName +
              " " +
              stud.assignedAdviser.lastName
            )
              .toLowerCase()
              .includes(query.toLowerCase());
          });
          break;
        case "STATUS":
          // only applicable to application since no status attribute for student
          break;
        case "STEP":
          // only applicable to application since no step attribute for student
          break;
        case "NAME":
          filteredStuds = students.filter((stud) => {
            return (
              stud.firstName +
              " " +
              stud.middleName +
              " " +
              stud.lastName
            )
              .toLowerCase()
              .includes(query.toLowerCase());
          });
      }
      switch (sort) {
        case "SDATE":
          // add if date of account creation is added
          break;
        case "SNAME":
          filteredStuds = filteredStuds.sort((a, b) =>
            a.firstName > b.firstName ? 1 : -1
          );
          break;
      }
    }

    function btnNewAppClick() {
      onAccountClick(true);
    }

    if ((data.userInfo === undefined || data.userInfo.userType === "STUDENT") && (data.assignedAdviser === undefined || data.assignedAdviser === null || data.assignedOfficer === undefined || data.assignedOfficer === null)) {
        return (
            <section className="flex flex-col flex-none dashboard-list-section">
                <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
                    <Application data={({ status: "NO_OFFICER" })} isCard={true} />
                </card>
                <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                </section>
            </section>
        );
    }

  if ((data.userInfo === undefined || data.userInfo.userType === "STUDENT") && (students === undefined || students.length === 0 || (students.length === 1 && students[0].step === 0))) {
        return (
            <section className="flex flex-col flex-none dashboard-list-section">
                <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
                    <Application data={({ status: null })} isCard={true} />
                </card>
                <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                </section>
                <button onClick={btnNewAppClick}
                    className="relative z-90 bottom-16 mx-8 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New application</button>
            </section>
        );
    }

    return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <Search data={students} query={query} onQuery={setQuery} filter={filter} filterBy={filterBy} sort={sort} sortBy={sortBy} />
          <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
            {filteredStuds.map((app) => {
              return (
                <UserTile onAccountClick={onAccountClick} currentAccount={currentAccount} data={app} />
              )
            })}
            <div className="h-4" />
          </section>
        </section>
    );
}