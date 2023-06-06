import "material-symbols";
import React, { useState, useEffect } from "react";
import { showToast } from "./toast";
import EmptyProfile from "./student_empty";

let success;

function fillData(account) {
  console.log(account);
  document.getElementsByName("first-name")[0].value = account.firstName;
  document.getElementsByName("middle-name")[0].value = account.middleName;
  document.getElementsByName("last-name")[0].value = account.lastName;
  document.getElementsByName("id-number")[0].value = account.studentNumber;
  document.getElementById("college").value = account.college;
  document.getElementsByName("email")[0].value = account.email;
  document.getElementsByName("password")[0].value = "********";
}

function editAccount(account, event) {
  event.preventDefault();

  // Get the data from form
  const formData = new FormData(event.target);

  // Construct the object based on form
  let data = {};
  data.id = account._id;
  data.firstName = formData.get("first-name");
  data.middleName = formData.get("middle-name");
  data.lastName = formData.get("last-name");
  data.studentNumber = formData.get("id-number");
  data.college = formData.get("college");
  data.email = formData.get("email");
  if (formData.get("password") !== "********") data.password = formData.get("password");

  fetch('http://localhost:3001/api/accounts/edit', {
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
        showToast("Account editing success", "Account edited successfully.", "success", "left");
        document.getElementById('edit-account-modal').checked = false;
        event.target.reset();
        success();
      } else {
        showToast("Account editing error", "An error has occured. Try again later.", "error", "left");
      }
    });
}

function deleteAccount(account) {
  // Construct the object based on form
  let data = {};
  data.id = account._id;

  fetch('http://localhost:3001/api/accounts/delete', {
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
        showToast("Account deletion success", "Account deleted successfully.", "success", "left");
        document.getElementById('delete-account-modal').checked = false;
        success();
      } else {
        showToast("Account deletion error", "An error has occured. Try again later.", "error", "left");
      }
    });
}

// Modal component
function DeleteModal({ account, id, title }) {
  return (
    <>
      <button onClick={() => (document.getElementById(id).checked = true)} className="text-primary font-bold">
        <span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>delete</span> {title}
      </button>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="pt-6">
            <h3 className="font-bold text-primary text-3xl mx-8 mb-6">{title}</h3>
            <div className="overflow-auto px-8 text-base-content">
              <p>Are you sure you want to delete this account?</p>
            </div>
            <div className="modal-action">
              <label onClick={() => (document.getElementById(id).checked = false)} className="btn-ghost btn">Cancel</label>
              <label onClick={() => (deleteAccount(account))} className="text-primary btn-ghost btn">Delete</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EditModal({ account, id, title }) {
  return (
    <>
      <button onClick={() => {fillData(account); document.getElementById(id).checked = true}} className="text-accent font-bold">
        <span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> {title}
      </button>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form id="editAccount" onSubmit={(event) => (editAccount(account, event))} className="pt-6">
            <h3 className="font-bold text-accent text-3xl px-8 mb-6">{title}</h3>
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
                <select id="college" name="college" className="select select-bordered w-full my-1">
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

                <div className="h-4" />

                <input pattern="[a-z0-9._%+-]+@up.edu.ph" type="email" name="email" placeholder="Email" className="input input-bordered w-full my-1" required />
                <input pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$" name="password" type="password" placeholder="Password" className="input input-bordered w-full my-1" required />

              </div>
            </div>
            <div className="modal-action">
              <label onClick={() => (document.getElementById(id).checked = false)} className="btn-ghost btn">Cancel</label>
              <button type="submit" className="text-accent btn-ghost btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function ManageAccount(props) {
  const { onSuccess, user, data } = props;
  const [currentType, setCurrentType] = useState(data.userType);

  useEffect(() => {
    setCurrentType(data.userType);
  }, [data]);

  if (((data == null || data === undefined || data.length === 0))) {
    return <EmptyProfile />;
  }

  success = onSuccess;

  function changeAccountType(newType) {
    let dta = {};
    dta.id = data._id;
    dta.userType = newType;
    setCurrentType(newType);

    fetch("http://localhost:3001/api/accounts/set-type",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          showToast("Changed suucessfully", "Successfully set new account type.", "success", "left");
          onSuccess();
        } else {
          showToast("Changing error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
      <div className="">
        <div className="w-28 avatar pt-2 mb-6">
          <img
            className="rounded-full"
            src={"../assets/images/profile-default.webp"}
          />
        </div>
      </div>
      <span className="font-semibold text-primary text-3xl mb-2">{data.firstName} {data.middleName} {data.lastName}</span>
      <span className="font-semibold text-lg mb-2">{data.email}</span>
      <span className="text-sm mb-12">{data.studentNumber} ({data.college})</span>
      <select onChange={(e) => changeAccountType(e.target.value)} name="college" className="select select-bordered bg-gray-300 border border-gray-300 text-sm rounded block w-72" value={currentType} disabled={data._id === user._id}>
        <option value="" disabled selected>Change user type</option>
        <option value="ADVISER">Adviser</option>
        <option value="CLEARANCE_OFFICER">Clearance Officer</option>
        <option value="ADMINISTRATOR">Administrator</option>
      </select>
      <div className="h-8" />
      {
        data._id === user._id ? null :
        <div className="flex">
          <EditModal account={data} id="edit-account-modal" title="Edit Account" />
          <div className="w-8" />
          <DeleteModal account={data} id="delete-account-modal" title="Delete Account" />
        </div>
      }
    </div>
  );
}