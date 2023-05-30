import "material-symbols";

export default function EmptyApplication(props) {
  return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
      <span className="material-symbols-rounded" style={{ fontSize: "9rem" }}>
        description
      </span>
      <span>Click on an application to view its details</span>
    </div>
  );
}
