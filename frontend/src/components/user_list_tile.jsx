/* eslint-disable jsx-a11y/alt-text */

import { useState, useEffect } from "react";
import 'material-symbols';
import "./application.css"

export default function UserTile(props) {
    const { dialog, currentAccount, onAccountClick, data } = props;
    const [isInactive, setInactive] = useState(true);

    useEffect(() => {
        if (currentAccount !== undefined) setInactive(data._id !== currentAccount._id);
    }, [currentAccount, data]);

    function onClk() {
        if (onAccountClick == null || onAccountClick === undefined) return;
        onAccountClick(data);
    }

    return (
        <button onClick={onClk} className={(!isInactive ? "app-active" : "") + " app-ghost btn-block text-left"}>
            <div className={(dialog === undefined ? "mx-8" : "") + " flex flex-row px-6 py-5"} style={{ minHeight: '4rem' }}>
                <label className="my-auto btn btn-ghost btn-circle avatar">
                    <img
                        className="rounded-full"
                        src={"../assets/images/profile-default.webp"}
                    />
                </label>
                <div className={((data.userType === null) ? "opacity-50 " : "") + "flex flex-col justify-center flex-auto ml-5"}>
                    <h1 className="font-semibold text-xl">{data.firstName} {data.lastName}</h1>
                    <h3 className="text-sm">{data.studentNumber}</h3>
                </div>
            </div>
        </button>
    )
}