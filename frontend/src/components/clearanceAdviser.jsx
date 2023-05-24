import "material-symbols";

export default function AdviserView(props) {
  return (
    <div className="flex flex-row px-14 py-5" style={{ minHeight: "7rem" }}>
      <div className="justify-center m-auto flex-none">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              id="menuButton"
            >
              <div className="w-12 rounded-full">
                <img src="https://placehold.jp/150x150.png" />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center flex-auto ml-5"></div>
    </div>
  );
}
