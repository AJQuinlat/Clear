import "material-symbols";
import React, { useState, useEffect } from "react";
import { showToast } from "./toast";
import EmptyProfile from "./student_empty";

export default function ManageAccount(props) {
    const { onSuccess, user, data } = props;
    const [currentType, setCurrentType] = useState(data.userType);

    useEffect(() => {
        setCurrentType(data.userType);
    }, [data]);

    if (((data == null || data === undefined || data.length === 0))) {
        return <EmptyProfile />;
    }

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
        </div>
    );
}