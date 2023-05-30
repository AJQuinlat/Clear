import "material-symbols";

export default function EmptyApplication(props) {
  return (
    <div className="flex flex-col items-center">
    <span
        className=" material-symbols-rounded"
        style={{ fontSize: "9rem" }}
    >
        description
    </span>
    <span className="">Click on an application to view its details</span>
    </div>
  );
}
