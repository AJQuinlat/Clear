import "material-symbols";
import RelativeTime from "@yaireo/relative-time";

function getResources(application) {
  const relativeTime = new RelativeTime();
  let res = {};

  res.color = "text-primary";
  res.icon = "cancel";
  res.header = application.name;
  res.secondLine = (
    <h3 className="text-sm">
      Submitted{" "}
      <span className="font-medium">
        {relativeTime.from(application.dateSubmitted)}
      </span>{" "}
    </h3>
  );
  res.thirdLine = (
    <p className="font-light text-xs mt-1">{application.returnRemarks}</p>
  );
  return res;
}

export default function AdviserView(props) {
  const res = getResources(props.data);

  return (
    <div className="flex flex-row px-14 py-5" style={{ minHeight: "7rem" }}>
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        id="userBtn"
      >
        <div className="w-12 rounded-full">
          <img src="https://placehold.jp/150x150.png" />
        </div>
      </label>
      <div className="justify-center m-auto flex-none">
        <span
          className={res.color + " align-middle material-symbols-rounded"}
          style={{ fontSize: "3rem" }}
        ></span>
      </div>
      <div className="flex flex-col justify-center flex-auto ml-5">
        <h1 className={res.color + " font-semibold text-accent text-xl"}>
          {res.header}
        </h1>
        {res.secondLine}
        {res.thirdLine}
      </div>
    </div>
  );
}
