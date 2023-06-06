/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Application from "../../components/application";
import Search from "../../components/search";
import StudentProfile from "../../components/student_profile";
import UserTile from "../../components/user_list_tile";

export default function Students(properties) {
  const { user, sectionRef, sectionHeight } = properties;
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState([]);

  function getAccounts() {
    console.log("GET");
    fetch('http://localhost:3001/api/accounts/students',
      {
        method: "GET",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        setAccounts(body);
      });
  };

  useEffect(() => {
    getAccounts();
    const interval = setInterval(() => getAccounts(), 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

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
  if (accounts !== undefined) {
    switch (filter) {
      case "DATE":
        // add if date of account creation is added
        break;
      case "ADVISER":
        filteredStuds = accounts.filter((stud) => {
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
        filteredStuds = accounts.filter((stud) => {
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

  if (user === undefined) {
    return (<></>);
  }

  function onClickAccount(account) {
    setCurrentAccount(account);
  }

  function onApproved() {
    setCurrentAccount([]);
  }

  function getAccountsList() {
    if ((user.userInfo === undefined || user.userInfo.userType === "STUDENT") && (accounts === undefined || accounts.length === 0 || (accounts.length === 1 && accounts[0].step === 0))) {
      return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
            <Application data={({ status: null })} isCard={true} />
          </card>
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          </section>
        </section>
      );
    }

    return (
      <section className="flex flex-col flex-none dashboard-list-section">
        <Search type="A" data={accounts} query={query} onQuery={setQuery} filter={filter} filterBy={filterBy} sort={sort} sortBy={sortBy} />
        <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          {filteredStuds.map((app) => {
            return (
              <UserTile onAccountClick={onClickAccount} currentAccount={currentAccount} data={app} />
            )
          })}
          <div className="h-4" />
        </section>
      </section>
    );
  }

  return (
    <section className="flex-row flex" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
      {getAccountsList()}
      <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto">
        <StudentProfile data={currentAccount} onApproved={onApproved} semester={user.semester} year={user.year} />
      </section>
    </section>
  )
}