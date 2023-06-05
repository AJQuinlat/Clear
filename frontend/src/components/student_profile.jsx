import "material-symbols";
import EmptyProfile from "./student_empty";
import { useState } from "react";
import Search from "./search";

// Modal component
function Modal({ id, title, children }) {
  return (
    <>
      <button onClick={() => (document.getElementById(id).checked = true)} className="text-secondary font-bold">
        <span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> {title}
      </button>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="pl-2 pr-2 pt-3 pb-3">
            <h3 className="font-bold text-primary text-3xl pl-8 pb-4">{title}</h3>
            {children}
            <div className="modal-action">
              <label onClick={() => (document.getElementById(id).checked = false)} className="btn">Close</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function StudentProfile(props) {
  const { semester, year, data, user } = props;
  let assignedAdviser = props.assignedAdviser;
  let assignedOfficer = props.assignedOfficer;

  function onAssignOfficer(bool) {
    document.getElementById('assign-officer-modal').checked = bool;
  }

  function onAssignAdviser(bool) {
    document.getElementById('assign-adviser-modal').checked = bool;
  }

  if (assignedAdviser === undefined) assignedAdviser = { firstName: "Prince Raeginald", lastName: "Lucario", email: "lucarraeginald@gmail.com" };
  if (assignedOfficer === undefined) assignedOfficer = { firstName: "Perrito", lastName: "Joemissyou", email: "joemissyou@gmail.com" };

  // if (data == null || data === undefined || data.length === 0 || user === undefined) {
  //   return <EmptyProfile />;
  // }

  return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
      <div className="w-28 avatar pt-2 mb-4">
        <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
      </div>
      <span className="font-semibold text-primary text-3xl">Ariezel Bautista</span>
      <span className="font-semibold text-base">2021-09165</span>
      <span className="text-base mb-10">{year} ({semester})</span>
      <div className="flex flex-row">
        <div className="pr-20 w-max">
          <h2 className={" font-semibold text-black text-2xl"}> Assigned Adviser </h2>
          <div className="flex flex-row mt-3">
            <div className="m-auto flex-none">
              <div className="w-10 avatar pt-2">
                <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-auto ml-4">
              {assignedAdviser === undefined || assignedAdviser === null ?
                <div>
                  <Modal id="assign-adviser-modal" title="Assign Adviser">
                    <Search />
                    <div className="overflow-auto h-48">
                      <div className="py-1 pl-8 flex flex-row items-center">
                        <div className="w-8 avatar pt-2">
                          <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                        </div>
                        <p className="pl-3 text-black text-lg">Administrator Adviser</p>
                      </div>
                    </div>
                  </Modal>
                </div>
                :
                <div className="w-40">
                  <h3 className="text-base font-bold">{assignedAdviser.firstName} {assignedAdviser.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedAdviser.email}
                  </p>
                  <Modal id="assign-adviser-modal" title="Re-assign adviser">
                    <Search />
                    <div className="overflow-auto h-48">
                      <div className="py-1 pl-8 flex flex-row items-center">
                        <div className="w-8 avatar pt-2">
                          <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                        </div>
                        <p className="pl-3 text-black text-lg">Administrator Adviser</p>
                      </div>
                    </div>
                  </Modal>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className={" font-semibold text-black text-2xl"}>Clearance Officer</h2>
          <div className="flex flex-row mt-3 w-max">
            <div className="m-auto flex-none">
              <div className="w-10 avatar pt-2">
                <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-auto ml-4">
              {assignedOfficer === undefined || assignedOfficer === null ?
                <div>
                  <Modal id="assign-officer-modal" title="Assign Clearance Officer">
                    <Search />
                    <div className="overflow-auto h-48">
                      <div className="py-1 pl-8 flex flex-row items-center">
                        <div className="w-8 avatar pt-2">
                          <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                        </div>
                        <p className="pl-3 text-black text-lg">Administrator Officer</p>
                      </div>
                    </div>
                  </Modal>
                </div>
                :
                <div className="w-40">
                  <h3 className="text-base font-bold break-normal">{assignedOfficer.firstName} {assignedOfficer.lastName}</h3>
                  <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                    {assignedOfficer.email}
                  </p>
                  <Modal id="assign-officer-modal" title="Re-assign officer">
                    <Search />
                    <div className="overflow-auto h-48">
                      <div className="py-1 pl-8 flex flex-row items-center">
                        <div className="w-8 avatar pt-2">
                          <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                        </div>
                        <p className="pl-3 text-black text-lg">Administrator officer</p>
                      </div>
                    </div>
                  </Modal>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
