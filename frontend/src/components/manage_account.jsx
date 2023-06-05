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
        { approver ? 
            <button 
                onclick={()=>{}} 
                class="mt-5 btn btn-primary rounded-lg drop-shadow justify-center items-center text-white text-sm normal-case shadow-lg">
                <span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>remove</span>
                Remove as approver
            </button> 
        : 
            <div>
                <button 
                onclick={()=>{}} 
                class="mt-5 btn btn-secondary rounded-lg drop-shadow justify-center items-center text-white text-sm normal-case shadow-lg">
                    <span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>
                    Add as approver
                </button>
          </div>
        }
    </div>
  );
}