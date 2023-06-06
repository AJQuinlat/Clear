import "material-symbols";
import EmptyProfile from "./student_empty";

export default function ManageAccount(props) {
    const { data } = props;

    if (((data == null || data === undefined || data.length === 0))) {
        return <EmptyProfile />;
    }

    let approver = false;

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
        <span className="font-semibold text-base mb-12">{data.email}</span>
        <select name="college" className="select select-bordered bg-gray-300 border border-gray-300 text-sm rounded block w-72">
            <option value="" disabled selected>Change user type</option>
            <option value="Adviser">Adviser</option>
            <option value="Officer">Clearance Officer</option>
            <option value="Administrator">Administrator</option>
        </select>
    </div>
  );
}