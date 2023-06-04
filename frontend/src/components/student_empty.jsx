import "material-symbols";

export default function EmptyProfile() {
  return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
      <span className="material-symbols-rounded" style={{ fontSize: "9rem" }}>
      account_circle
      </span>
      <span>Click on an account to view their details</span>
    </div>
  );
}