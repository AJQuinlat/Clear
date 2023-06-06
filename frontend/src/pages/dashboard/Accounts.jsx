/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Search from "../../components/search";
import UserTile from "../../components/user_list_tile";
import ManageAccount from "../../components/manage_account";
import { showToast } from "../../components/toast";

function createAccount(event) {
  event.preventDefault();

  // Get the data from form
  const formData = new FormData(event.target);

  // Construct the object based on form
  let data = {};
  data.firstName = formData.get("first-name");
  data.middleName = formData.get("middle-name");
  data.lastName = formData.get("last-name");
  data.studentNumber = formData.get("id-number");
  data.college = formData.get("college");
  data.userType = formData.get("type");
  data.email = formData.get("email");
  data.password = formData.get("password");

  fetch('http://localhost:3001/api/accounts/add', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        showToast("Account creation success", "Account created successfully.", "success", "left");
        document.getElementById('add-account-modal').checked = false;
        event.target.reset();
      } else {
        showToast("Account creation error", "An error has occured. Try again later.", "error", "left");
      }
    });
}

// Modal component
function NewAccountModal({ id, title }) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={createAccount} className="pt-6">
            <h3 className="font-bold text-primary text-3xl px-8 mb-6">{title}</h3>
            <div className="overflow-auto px-8 text-base-content">
              <div>
                <div className="w-16 avatar pt-2 mb-4">
                  <img
                    className="rounded-full"
                    src={"../assets/images/profile-default.webp"}
                  />
                </div>
                <input name="first-name" type="text" className="input input-bordered w-full my-1" placeholder="First Name" required />
                <input name="middle-name" type="text" className="input input-bordered w-full my-1" placeholder="Middle Name" />
                <input name="last-name" type="text" className="input input-bordered w-full my-1" placeholder="Last Name" required />

                <div className="h-4" />

                <input name="id-number" type="text" className="input input-bordered w-full my-1" placeholder="ID number" required />
                <select name="college" className="select select-bordered w-full my-1">
                  <option value="" disabled selected>College</option>
                  <option value="CAFS">College of Agriculture and Food Science</option>
                  <option value="CAS">College of Arts and Sciences</option>
                  <option value="CDC">College of Development Communication</option>
                  <option value="CEM">College of Economics and Management</option>
                  <option value="CEAT">College of Engineering and Agro-Industrial Technology</option>
                  <option value="SESAM">School of Environmental Science and Management</option>
                  <option value="CFNR">College of Forestry and Natural Resources</option>
                  <option value="GS">Graduate School</option>
                  <option value="CHE">College of Human Ecology</option>
                  <option value="CPAF">College of Public Affairs and Development</option>
                  <option value="CVM">College of Veterinary Medicine</option>
                </select>
                <select name="type" className="select select-bordered w-full my-1">
                  <option value="" disabled selected>User type</option>
                  <option value="ADVISER">Adviser</option>
                  <option value="CLEARANCE_OFFICER">Clearance Officer</option>
                  <option value="ADMINISTRATOR">Administrator</option>
                </select>

                <div className="h-4" />

                <input name="email" type="text" placeholder="Email" className="input input-bordered w-full my-1" required />
                <input name="password" type="password" placeholder="Password" className="input input-bordered w-full my-1" required />

              </div>
            </div>
            <div className="modal-action">
              <label onClick={() => (document.getElementById(id).checked = false)} className="btn-ghost btn">Cancel</label>
              <button type="submit" className="btn-ghost btn">Add account</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

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
        <button onClick={() => (document.getElementById("add-account-modal").checked = true)}
          className="relative z-90 bottom-6 mx-8 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New account</button>
      </section>
    );
  }

  return (
    <section className="flex-row flex" ref={sectionRef} style={{ "height": sectionHeight + "px" }}>
      {getAccountsList()}
      <section className="flex-auto bg-base-100 w-full rounded-3xl overflow-y-auto">
        <ManageAccount onSuccess={getAccounts} data={currentAccount} user={user.userInfo} semester={user.semester} year={user.year} />
      </section>
      <NewAccountModal id="add-account-modal" title="Add new account" />
    </section>
  )
}