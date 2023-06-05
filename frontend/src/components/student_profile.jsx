import "material-symbols";
import { showToast } from "./toast";
import EmptyProfile from "./student_empty";

function getSemesterName(semester) {
  switch (semester) {
    case 1:
      return "1st Semester";
    case 2:
      return "2nd Semester";
    default:
      return "Mid-semester";
  }
}

export default function StudentProfile(props) {
  const { onApproved, semester, year, data } = props;
  let assignedAdviser = data.assignedAdviser;
  let assignedOfficer = data.assignedOfficer;

  function approveApplication(event) {
    event.preventDefault();

    // Construct the object based on form
    let dta = {};
    dta.id = data._id;

    fetch("http://localhost:3001/api/accounts/approve",
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
          showToast("Approval success", "Account approved successfully.", "success", "left");
          onApproved();
        } else {
          showToast("Approval error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

    if (data == null || data === undefined || data.length === 0) {
        return <EmptyProfile />;
    }

    if (assignedAdviser === undefined) assignedAdviser = null;
    if (assignedOfficer === undefined) assignedOfficer = null;

    return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
       <div className="">
            <div className="w-28 avatar pt-2 mb-4">
            <img
                className="rounded-full"
                src={"../assets/images/profile-default.webp"}
            />
            </div>
        </div>
        <span className="font-semibold text-primary text-3xl">{data.firstName} {data.middleName} {data.lastName}</span>
        <span className="font-semibold text-base">{data.studentNumber}</span>
        <span className="text-base mb-10">A.Y. {year}-{year+1} ({getSemesterName(semester)})</span>
        

        {data.userType === null ?
          <button onClick={approveApplication} className="btn btn-primary font-bold">
            <span class="material-symbols-outlined align-middle mr-2">check</span>
            Approve account
            </button>
            : null
        }

        <div className="flex flex-row mt-8">
          <div className="pr-20 w-max">
            <h2 className={" font-semibold text-black text-2xl"}>
              Assigned Adviser
            </h2>
          <div className="flex flex-row mt-6">
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
                  <button className="text-secondary font-bold break-normal"><span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> Assign adviser </button>
                </div>
                :
                <div>
                  <h3 className="font-bold">{assignedAdviser.firstName} {assignedAdviser.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedAdviser.email}
                  </p>
                    <button className="text-secondary font-bold">
                      <span className="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span>
                      <span className="ml-2">Re-assign adviser</span>
                    </button>
                </div>
              }
            </div>
          </div>
        </div>
        <div>
          <h2 className={" font-semibold text-black text-2xl"}>
            Clearance Officer
          </h2>
          <div className="flex flex-row mt-6 w-max">
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
                  <button className="text-secondary font-bold"><span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> Assign officer </button>
                </div>
                :
                <div>
                  <h3 className="text-base font-bold break-normal">{assignedOfficer.firstName} {assignedOfficer.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedOfficer.email}
                  </p>
                  <button className="text-secondary font-bold">
                    <span class="material-symbols-outlined align-middle mr-2" style={{ fontSize: '15px' }}>edit</span>
                    Re-assign officer
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}