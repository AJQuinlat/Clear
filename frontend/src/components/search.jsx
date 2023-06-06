/* eslint-disable default-case */
import { useEffect } from "react";

export default function Search(props) {
  const { type } = props;

  useEffect(() => {
    if (type !== "A") {
      let filterButtons = ["DATE", "ADVISER", "STATUS", "STEP"];
      for (let i = 0; i < filterButtons.length; i++) {
        if (document.getElementById(filterButtons[i]).id == props.filter) {
          document.getElementById(filterButtons[i]).className =
            "btn-sm btn-secondary btn mb-2 text-white text-xs shadow-md border-none bg-secondary rounded-full hover:text-white";
        } else {
          document.getElementById(filterButtons[i]).className =
            "btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white";
        }
      }
    }

    let sortButtons = ["SDATE", "SNAME"];
    for (let i = 0; i < sortButtons.length; i++) {
      if (document.getElementById(sortButtons[i]).id == props.sort) {
        document.getElementById(sortButtons[i]).className =
          "btn-sm btn-secondary btn mb-2 text-white text-xs shadow-md border-none bg-secondary rounded-full hover:text-white";
      } else {
        document.getElementById(sortButtons[i]).className =
          "btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white";
      }
    }
  }, [props.filter, props.sort]);

  function handleFilter(value) {
    switch (value) {
      case "DATE":
        props.filterBy(value);
        break;
      case "ADVISER":
        props.filterBy(value);
        break;
      case "STATUS":
        props.filterBy(value);
        break;
      case "STEP":
        props.filterBy(value);
        break;
    }
  }

  function handleSort(value) {
    switch (value) {
      case "SDATE":
        props.sortBy(value);
        break;
      case "SNAME":
        props.sortBy(value);
        break;
    }
  }

  return (
    <div className="mx-8">
      <label className="relative block mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          value={props.query}
          onChange={(e) => props.onQuery(e.target.value)}
          className="w-full bg-white placeholder:font-italitc border border-slate-300 rounded-lg py-4 pl-16 pr-4 focus:outline-primary/50 shadow-md"
          placeholder={"Search for " + (type === "A" ? "accounts" : "applications")}
          type="search"
        />
      </label>

      {/* filter by */}
      {type === "A" ? null :
      <div className="grid gap-3 mb-2 md:grid-cols-5">
        <span className="font-semibold ml-2 align-middle my-auto">Filter by</span>
        <button
          id={"DATE"}
          onClick={(e) => handleFilter(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white"
        >
          Date
        </button>
        <button
          id={"ADVISER"}
          onClick={(e) => handleFilter(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">
          Adviser
        </button>
        <button
          id={"STATUS"}
          onClick={(e) => handleFilter(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white"
        >
          Status
        </button>
        <button
          id={"STEP"}
          onClick={(e) => handleFilter(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white"
        >
          Step
        </button>
      </div>
        }
      {/* sort by */}
      <div className="grid gap-3 mb-6 md:grid-cols-5">
        <span className="font-semibold ml-2 align-middle my-auto">Sort by</span>
        <button
          id={"SDATE"}
          onClick={(e) => handleSort(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white"
        >
          Date
        </button>
        <button
          id={"SNAME"}
          onClick={(e) => handleSort(e.target.id)}
          className="btn-sm btn-secondary btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white"
        >
          Name
        </button>
      </div>
    </div>
  );
}
