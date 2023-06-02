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

function isDisabled(state, user) {
  if (state === "info_app") return true;
  switch (user.userType) {
    case "STUDENT":
      return false;
    default:
      return true;
  }
}

export default function ApplicationDetails(props) {
  const { onSubmitApp, data, state, user } = props;
  let assignedAdviser = props.assignedAdviser;
  let assignedOfficer = props.assignedOfficer;

  if ((state === "info_app" && (data == null || data === undefined || data.length === 0)) || user === undefined) {
    return <EmptyApplication />;
  }

  // Pull assigned adviser/officer from data if prop is undefined
  if (assignedAdviser === undefined) assignedAdviser = data.adviser;
  if (assignedOfficer === undefined) assignedOfficer = data.officer;

  function submitApplication(event) {
    event.preventDefault();

    // Get the data from form
    const formData = new FormData(event.target);

    // Construct the object based on form
    let data = {};
    data.uid = user._id;
    data.user = user;
    data.adviserUid = assignedAdviser._id;
    data.officerUid = assignedOfficer._id;
    data.adviser = assignedAdviser;
    data.officer = assignedOfficer;
    data.step = (state === "new_app" ? 1 : data.step);
    data.submission = { link: formData.get("link"), remarks: formData.get("remarks") };
    data.dateSubmitted = Date.now();

    fetch("http://localhost:3001/api/application",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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

  let res;
  if (state === "info_app" && user.userType === "STUDENT") {
    res = getResources(data);
  }

  return (
    <form className="px-14" onSubmit={submitApplication}>
      {/* Header */}
      <div className="flex flex-row py-14">
        <div className="justify-center m-auto flex-none">
          <span
            className={
              getColor(state) + " align-middle material-symbols-rounded"
            }
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
        <div>
          <h2
            className={getColor(state) + " font-semibold text-accent text-2xl"}
          >
            Assigned Officer
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
        <div className="pl-20">
          <h2
            className={getColor(state) + " font-semibold text-accent text-2xl"}
          >
            Clearance Officer
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
      {state === "info_app" && user.userType === "STUDENT" ?
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
            <p className="text-sm">
              Enter the Drive, GitHub, or folder link associated with your
              application’s resources(e.g. pictures, code, documents, etc.).
            </p>
            <p className="text-sm font-semibold">
              Ensure the link is accessible before submitting your application.
            </p>
            <input
              class="mt-5 appearance-none block input input-bordered w-full"
              name="link"
              type="text"
              value={state === "info_app" ? data.submission.link : null}
              disabled={isDisabled(state, user)}
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end">
            <h3 className="text-lg font-bold">Additional Remarks</h3>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              Add additional remarks to be seen by your clearance adviser
            </p>
            <textarea
              className="mt-5 block w-full p-3 textarea textarea-bordered"
              name="remarks"
              value={state === "info_app" ? data.submission.remarks : null}
              rows="8"
              placeholder={isDisabled(state, user) ? "No remarks" : "Write a remark"}
              style={{resize: "none"}}
              disabled={isDisabled(state, user)}
              />
          </div>
        </section>
      </div>
      {state === "new_app" && user.userType === "STUDENT" ?
      <button type="submit" class="btn btn-accent mt-10 mb-4 flex bg-transparent text-accent font-semibold hover:text-white py-2 px-4 border border-text-accent hover:border-transparent rounded">
        <div className="material-symbols-rounded align-middle">
          {getIcon("submit")}
        </div>
        <p className="px-2">Submit application for review</p>
      </button> : null}
      <div className="h-12" />
    </form>
  );
}
