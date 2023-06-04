import "material-symbols";
import EmptyProfile from "./student_empty";

export default function StudentProfile(props) {
    const { semester, year, data, user } = props;
    let assignedAdviser = props.assignedAdviser;
    let assignedOfficer = props.assignedOfficer;

    // if (((data == null || data === undefined || data.length === 0)) || user === undefined) {
    //     return <EmptyProfile />;
    // }

    // if (assignedAdviser === undefined) assignedAdviser = null;
    // if (assignedOfficer === undefined) assignedOfficer = null;

    if (assignedAdviser === undefined) assignedAdviser = {firstName: "Prince Raeginald", lastName: "Lucario", email: "lucarraeginald@gmail.com"};
    if (assignedOfficer === undefined) assignedOfficer = {firstName: "Perrito", lastName: "Joemissyou", email: "joemissyou@gmail.com"};

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
        <span className="font-semibold text-primary text-3xl">Ariezel Bautista</span>
        <span className="font-semibold text-base">2021-09165</span>
        <span className="text-base mb-10">{year} ({semester})</span>
        <div className="flex flex-row">
          <div className="pr-20 w-max">
            <h2 className={" font-semibold text-black text-2xl"}>
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
                  <button className="text-secondary font-bold break-normal"><span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> Assign adviser </button>
                </div>
                :
                <div className="w-40">
                  <h3 className="text-base font-bold">{assignedAdviser.firstName} {assignedAdviser.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedAdviser.email}
                  </p>
                  <button className="text-secondary font-bold">
                    <span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> 
                    Re-assign adviser 
                    </button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="">
          <h2 className={" font-semibold text-black text-2xl"}>
            Clearance Officer
          </h2>
          <div className="flex flex-row mt-3 w-max">
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
                <div className="w-40">
                  <h3 className="text-base font-bold break-normal">{assignedOfficer.firstName} {assignedOfficer.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedOfficer.email}
                  </p>
                  <button className="text-secondary font-bold"><span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> Re-assign officer </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}