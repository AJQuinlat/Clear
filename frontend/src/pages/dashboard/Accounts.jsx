/* eslint-disable default-case */
import { React, useState } from "react";
import Application from "../../components/application";
import StudentApplication from "../../components/application_student";
import Search from "../../components/search";
import moment from 'moment';
import UserTile from "../../components/user_list_tile";

export default function AccountsList(properties) {
    const { currentAccount, onAccountClick, elementRef, distanceToBottom, data } = properties;
    const accounts = data.accounts;

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
    if (accounts !== undefined) {
      switch (filter) {
        case "DATE":
          filteredApps = accounts.filter((app) => {
            let date = new Date(app.dateSubmitted);
            return moment(date)
              .format("dddd LL")
              .toLowerCase()
              .includes(query.toLowerCase());
          });
          break;
        case "ADVISER":
          filteredApps = accounts.filter((app) => {
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
          filteredApps = accounts.filter((app) => {
            return String(app.status)
              .toLowerCase()
              .includes(query.toLowerCase());
          });
          break;
        case "STEP":
          filteredApps = accounts.filter((app) => {
            return String(app.step).toLowerCase().includes(query.toLowerCase());
          });
          break;
        case "NAME":
          filteredApps = accounts.filter((app) => {
            return (
              app.firstName +
              " " +
              app.middleName +
              " " +
              app.lastName
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

  if ((data.userInfo === undefined) && (accounts === undefined || accounts.length === 0 || (accounts.length === 1 && accounts[0].step === 0))) {
        return (
            <section className="flex flex-col flex-none dashboard-list-section">
                <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                </section>
            </section>
        );
    }

    return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <Search data={accounts} query={query} onQuery={setQuery} filter={filter} filterBy={filterBy} sort={sort} sortBy={sortBy} />
          <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
            {accounts.map((app) => {
              return (
                <UserTile onAccountClick={onAccountClick} currentAccount={currentAccount} data={app} />
              )
            })}
            <div className="h-4" />
        </section>
        <button onClick={{}}
          className="relative z-90 bottom-16 mx-8 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New account</button>
        </section>
    );
}