/* eslint-disable jsx-a11y/alt-text */

import { useState, useEffect } from "react";
import 'material-symbols';
import "./application.css"

export default function UserTile(props) {
    const { currentApp, onAppClick, data } = props;
    const [isInactive, setInactive] = useState(true);

    useEffect(() => {
        if (currentApp !== undefined) setInactive(data._id !== currentApp._id);
    }, [currentApp, data]);

    function onClk() {
        if (onAppClick == null || onAppClick === undefined) return;
        onAppClick(data);
    }

    return (
        <button onClick={onClk} className={(!isInactive ? "app-active" : "") + " app-ghost btn-block text-left"}>
            <div className="flex flex-row px-6 py-5 mx-8" style={{ minHeight: '4rem' }}>
                <label className="my-auto btn btn-ghost btn-circle avatar">
                    <img
                        className="rounded-full"
                        src={"../assets/images/profile-default.webp"}
                    />
                </label>
                <div className="flex flex-col justify-center flex-auto ml-5">
                    <h1 className="font-semibold text-xl">{data.firstName} {data.lastName}</h1>
                    <h3 className="text-sm">{data.studentNumber}</h3>
                </div>
            </div>
        </button>
    )
}