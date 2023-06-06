import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import "material-symbols";
import { showToast } from "./toast";
import EmptyApplication from "./application_empty";
import { getResources } from "./application";

function getIcon(state) {
  // eslint-disable-next-line default-case
  switch (state) {
    case "new_app":
      return "add_circle_outline";
    case "info_app":
      return "info";
    case "submit":
      return "send";
  }
}

function getColor(state) {
  // eslint-disable-next-line default-case
  switch (state) {
    case "new_app":
      return "text-secondary";
    case "info_app":
      return "text-accent";
  }
}

function getStateHeader(state) {
  // eslint-disable-next-line default-case
  switch (state) {
    case "new_app":
      return "New Application";
    case "info_app":
      return "Application Details";
  }
}

function isDisabled(application, state, user, first) {
  if (state === "info_app" && (application.status !== "REJECTED" || !first)) return true;
  switch (user.userInfo.userType) {
    case "STUDENT":
      return false;
    default:
      return true;
  }
}

export default function ApplicationDetails(props) {
  const { onSubmitApp, data, state, user, year, semester, isFirst } = props;
  let assignedAdviser = props.assignedAdviser;
  let assignedOfficer = props.assignedOfficer;

  if (data.length === 0) {
    return <EmptyApplication />;
  }

  if ((state === "info_app" && (data == null || data === undefined || data.length === 0)) || user === undefined) {
    return <EmptyApplication />;
  }

  // Pull assigned adviser/officer from data if prop is undefined
  if (assignedAdviser === undefined) assignedAdviser = data.adviser;
  if (assignedOfficer === undefined) assignedOfficer = data.officer;

  function printApplication() {
    const doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const fullName = data.user.firstName + " " + data.user.middleName + " " + data.user.lastName;
    const adviserName = data.adviser.firstName + " " + data.adviser.middleName + " " + data.adviser.lastName;
    const officerName = data.officer.firstName + " " + data.officer.middleName + " " + data.officer.lastName;

    // Header
    doc.setFontSize(16);
    doc.text('University of the Philippines Los Baños', 105, 30, null, null, "center");
    doc.setFontSize(12);
    doc.text('College of Arts and Sciences', 105, 37, null, null, "center");
    doc.setFontSize(11);
    doc.text('Institute of Computer Science', 105, 43, null, null, "center");
    doc.line(0, 60, doc.internal.pageSize.getWidth(), 60);

    doc.setFontSize(11);
    doc.text(today.toLocaleDateString(), 20, 80);
    var split = doc.splitTextToSize("This document certifies that " + fullName + ", " + data.user.studentNumber + " has satisfied the clearance requirements of the institute.", 180);
    doc.text(split, 20, 90);


    doc.setFontSize(13);
    doc.text('Verified:', 20, 160);

    doc.setFontSize(11);
    var adviser = doc.splitTextToSize("Academic Adviser: " + adviserName, 180);
    doc.text(adviser, 20, 170);
    var officer = doc.splitTextToSize("Clearance Officer: " + officerName, 180);
    doc.text(officer, 20, 180);

    // generate the PDF document with the type of datauristring/dataurlstring
    doc.autoPrint();

    //This is a key for printing
    doc.output('dataurlnewwindow');
  }

  function submitApplication(event) {
    event.preventDefault();

    // Get the data from form
    const formData = new FormData(event.target);

    // Construct the object based on form
    let dta = {};
    dta.uid = user._id;
    dta.user = user;
    dta.adviserUid = assignedAdviser._id;
    dta.officerUid = assignedOfficer._id;
    dta.adviser = assignedAdviser;
    dta.officer = assignedOfficer;
    dta.year = year;
    dta.semester = semester;
    dta.step = (state === "new_app" ? 1 : data.step);
    dta.submission = { link: formData.get("link"), remarks: formData.get("remarks") };
    dta.dateSubmitted = Date.now();
    dta.dateApproved = state === "new_app" ? null : data.dateApproved;
    dta.dateReturned = state === "new_app" ? null : data.dateReturned;

    fetch("http://localhost:3001/api/application",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          showToast("Application success", "Application submitted successfully.", "success", "left");
          onSubmitApp();
        } else {
          showToast("Application error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  function returnApplication(event) {
    event.preventDefault();

    // Construct the object based on form
    let dta = {};
    dta.id = data._id;
    dta.remarks = document.getElementById("officerRemarks").value;
    dta.dateReturned = Date.now();

    fetch("http://localhost:3001/api/application/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.success) {
          showToast("Application success", "Application returned successfully.", "success", "left");
          onSubmitApp();
        } else {
          showToast("Application error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  function approveApplication(event) {
    event.preventDefault();

    // Construct the object based on form
    let dta = {};
    dta.id = data._id;
    dta.step = (data.step + 1);
    dta.remarks = document.getElementById("officerRemarks").value;
    dta.dateApproved = Date.now();

    fetch("http://localhost:3001/api/application/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.success) {
          showToast("Application success", "Application approved successfully.", "success", "left");
          onSubmitApp();
        } else {
          showToast("Application error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  let res;
  if (state === "info_app" && (user.userInfo.userType !== "ADVISER" && user.userInfo.userType !== "CLEARANCE_OFFICER")) {
    res = getResources(data);
  }

  return (
    <form className="px-14" onSubmit={submitApplication}>
      {/* Header */}
      <div className="flex flex-row py-14">
        <div className="justify-center m-auto flex-none">
          <span
            className={getColor(state) + " align-middle material-symbols-rounded"}
            style={{ fontSize: "3rem" }}
          >
            {getIcon(state)}
          </span>
        </div>
        <div className="flex flex-col justify-center flex-auto ml-5">
          <h1
            className={getColor(state) + " font-semibold text-accent text-3xl"}
          >
            {getStateHeader(state)}
          </h1>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-full">
          <h2
            className={getColor(state) + " font-semibold text-accent text-2xl"}
          >
            Assigned Adviser
          </h2>
          <div className="flex flex-row mt-3">
            <div className="m-auto flex-none">
              <div className="w-10 avatar pt-2">
                <img
                  className="rounded-full"
                  src={"../assets/images/profile-default.webp"}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-auto ml-4">
              {assignedAdviser === undefined || assignedAdviser === null ?
                <div>
                  <h3 className="text-base font-bold">Not assigned</h3>
                </div>
                :
                <div>
                  <h3 className="text-base font-bold">{assignedAdviser.firstName} {assignedAdviser.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedAdviser.email}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="w-full pr-40">
          <h2
            className={getColor(state) + " font-semibold text-accent text-2xl"}
          >
            Assigned Clearance Officer
          </h2>
          <div className="flex flex-row mt-3">
            <div className="m-auto flex-none">
              <div className="w-10 avatar pt-2">
                <img
                  className="rounded-full"
                  src={"../assets/images/profile-default.webp"}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center flex-auto ml-4">
              {assignedOfficer === undefined || assignedOfficer === null ?
                <div>
                  <h3 className="text-base font-bold">Not assigned</h3>
                </div>
                :
                <div>
                  <h3 className="text-base font-bold">{assignedOfficer.firstName} {assignedOfficer.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedOfficer.email}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      {state === "info_app" && (user.userInfo.userType !== "ADVISER" && user.userInfo.userType !== "CLEARANCE_OFFICER") ?
        <div className="mt-12">
          <h2 className={getColor(state) + " font-semibold text-accent text-2xl"}>
            Application Status
          </h2>
          <div className="flex flex-row py-5" style={{ minHeight: '7rem' }}>
            <div className="justify-center m-auto flex-none">
              <span className={res.color + " align-middle material-symbols-rounded"} style={{ fontSize: '3rem' }}>{res.icon}</span>
            </div>
            <div className="flex flex-col justify-center flex-auto ml-5">
              <h1 className={res.color + " font-semibold text-accent text-xl"}>{res.header}</h1>
              {res.secondLine}
            </div>
          </div>
          {data.status === "REJECTED" ? 
            <div className="mt-4 mb-12">
              <h3 className="mb-2 text-2xl font-bold">Remarks</h3>
              <p className="text-md">
                {data.remarks}
              </p>
            </div>
            :
            <div />
          }
        </div>
        : 
        <div></div>
      }

      {/* Details */}
      <div className="mt-8">
        <h2 className={getColor(state) + " font-semibold text-accent text-2xl"}>
          Application Details
        </h2>
        <section className="mt-8">
          <div className="flex items-end">
            <h3 className="text-lg font-bold">Link to application resources</h3>
            <p className="text-xs text-primary font-bold pl-2">required</p>
          </div>
          <div className="mt-2">
            {user.userInfo.userType === "STUDENT" ?
              <div>
                <p className="text-sm">
                  Enter the Drive, GitHub, or folder link associated with your
                  application’s resources(e.g. pictures, code, documents, etc.).
                </p>
                <p className="text-sm font-semibold">
                  Ensure the link is accessible before submitting your application.
                </p>
            </div> : null
            }
            <input
              className="mt-5 appearance-none block input input-bordered w-full"
              name="link"
              id="link"
              type="text"
              value={state === "info_app" && (data.status !== "REJECTED" || !isFirst) ? data.submission.link : null}
              placeholder={state === "info_app" && data.status === "REJECTED" && isFirst ? data.submission.link : null}
              disabled={isDisabled(data, state, user, isFirst)}
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end">
            <h3 className="text-lg font-bold">Additional Remarks</h3>
          </div>
          <div className="mt-2">
            {user.userInfo.userType === "STUDENT" ?
              <p className="text-sm">
                Add additional remarks to be seen by your clearance adviser
              </p> : null
            }
            <textarea
              className="mt-5 block w-full p-3 textarea textarea-bordered"
              name="remarks"
              rows="8"
              id="remarks"
              value={state === "info_app" && (data.status !== "REJECTED" || !isFirst) ? data.submission.remarks : null}
              onChange={state === "info_app" ? (e) => (e) => e.preventDefault() : null}
              placeholder={isDisabled(data, state, user, isFirst) ? "No remarks" : "Write a remark"}
              style={{resize: "none"}}
              disabled={isDisabled(data, state, user, isFirst)} />
          </div>
        </section>
      </div>

      {state === "new_app" && user.userInfo.userType === "STUDENT" ?
        <button type="submit" className="btn btn-accent mt-10 mb-4 flex bg-transparent text-accent font-semibold hover:text-white py-2 px-4 border border-text-accent hover:border-transparent rounded">
          <div className="material-symbols-rounded align-middle">
            {getIcon("submit")}
          </div>
          <p className="px-2">Submit application for review</p>
        </button> : null}

      {state === "info_app" && isFirst && data.status === "APPROVED" && user.userInfo.userType === "STUDENT" ?
        <button type="button" onClick={printApplication} className="btn btn-secondary mt-10 mb-4 flex bg-transparent text-secondary font-semibold hover:text-white py-2 px-4 border border-text-secondary hover:border-transparent rounded">
          <div className="material-symbols-rounded align-middle">
            print
          </div>
          <p className="px-2">Print Clearance Certificate</p>
        </button> : null}

      {state === "info_app" && isFirst && data.status === "REJECTED" && user.userInfo.userType === "STUDENT" ?
        <button type="submit" className="btn btn-accent mt-10 mb-4 flex bg-transparent text-accent font-semibold hover:text-white py-2 px-4 border border-text-accent hover:border-transparent rounded">
          <div className="material-symbols-rounded align-middle">
            {getIcon("submit")}
          </div>
          <p className="px-2">Re-submit application for review</p>
        </button> : null}

      {state === "info_app" && data.status === "PENDING" && (user.userInfo.userType === "ADVISER" || user.userInfo.userType === "CLEARANCE_OFFICER") ?
        <div>
          {/* Remarks */}
          <div className="mt-12">
            <h2 className={getColor(state) + " font-semibold text-accent text-2xl"}>
              Respond to Application
            </h2>
            <section className="mt-4">
              <div className="flex items-end">
                <h3 className="text-lg font-bold">Additional Remarks</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  Add additional remarks to be seen by the student.
                </p>
                <textarea
                  className="mt-5 block w-full p-3 textarea textarea-bordered"
                  id="officerRemarks"
                  rows="8"
                  placeholder="Write a remark"
                  style={{ resize: "none" }}
                />
              </div>
            </section>
          </div>
          <div className="flex">
            <button type="button" onClick={approveApplication} className="mr-4 btn btn-secondary mt-10 mb-4 flex font-semibold hover:text-white py-2 px-4 border border-text-accent hover:border-transparent rounded">
              <div className="material-symbols-rounded align-middle">
                done
              </div>
              <p className="px-2">Approve application</p>
            </button>
            <button type="button" onClick={returnApplication} className="btn btn-primary mt-10 mb-4 flex bg-transparent text-primary font-semibold hover:text-white py-2 px-4 border border-text-accent hover:border-transparent rounded">
              <div className="material-symbols-rounded align-middle">
                close
              </div>
              <p className="px-2">Return application</p>
            </button>
          </div>
        </div>: null}

      <div className="h-12" />
    </form>
  );
}
