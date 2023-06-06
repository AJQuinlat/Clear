/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Search from "../../components/search";
import UserTile from "../../components/user_list_tile";
import ManageAccount from "../../components/manage_account";

export default function Accounts(properties) {
  const { user, sectionRef, sectionHeight } = properties;
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState([]);

  function getAccounts() {
    fetch('http://localhost:3001/api/accounts/non-students',
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

  // new list of accounts to display
  let filteredAccs = []

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
        filteredAccs = accounts.filter((acc) => {
          if (acc.userType == "ADVISER") {
            return (
              acc.firstName +
              " " +
              acc.middleName +
              " " +
              acc.lastName
            )
              .toLowerCase()
              .includes(query.toLowerCase());
          }
        });
        break;
      case "STATUS":
        // only applicable to application since no status attribute for account
        break;
      case "STEP":
        // only applicable to application since no step attribute for account
        break;
      case "NAME":
        filteredAccs = accounts.filter((acc) => {
          return (
            acc.firstName +
            " " +
            acc.middleName +
            " " +
            acc.lastName
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
        filteredAccs = filteredAccs.sort((a, b) =>
          a.user.firstName > b.user.firstName ? 1 : -1
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
    if ((user.userInfo === undefined) && (accounts === undefined || accounts.length === 0 || (accounts.length === 1 && accounts[0].step === 0))) {
      return (
        <section className="flex flex-col flex-none dashboard-list-section">
          <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          </section>
        </section>
      );
    }

    return (
      <section className="flex flex-col flex-none dashboard-list-section">
        <Search type="A" data={accounts} query={query} onQuery={setQuery} filter={filter} filterBy={filterBy} sort={sort} sortBy={sortBy} />
        <section className="dashboard-list grow" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
          {filteredAccs.map((acc) => {
            return (
              <UserTile onAccountClick={onClickAccount} currentAccount={currentAccount} data={acc} />
            )
          })}
          <div className="h-4" />
        </section>
        <button onClick={{}}
          className="relative z-90 bottom-6 mx-8 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New account</button>
      </section>
    );
  }

  return (
    <section className="flex-row flex" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
      {getAccountsList()}
      <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto">
        <ManageAccount data={currentAccount} semester={user.semester} year={user.year} />
      </section>
    </section>
  )
}