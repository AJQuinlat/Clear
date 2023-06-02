
import { useState, useEffect } from "react";
import 'material-symbols';
import RelativeTime from '@yaireo/relative-time'
import "./application.css"

export function getResources(application) {
    const relativeTime = new RelativeTime();
    let res = {};

    // eslint-disable-next-line default-case
    switch (application.status) {
        case "REJECTED":
            res.color = "text-primary";
            res.icon = "cancel";
            res.header = "Application Returned";
            res.secondLine = <h3 className="text-sm">Returned by <span className="font-medium">{application.step === 1 ? "Adviser" : "Clearance Officer"}</span> {relativeTime.from(application.dateReturned)}</h3>;
            res.thirdLine = <p className="font-light text-xs mt-2">{ application.remarks }</p>;
            break;
        case "APPROVED":
            res.color = "text-secondary";
            res.icon = "check_circle";
            res.header = "Application Cleared";
            res.secondLine = <h3 className="text-sm">Cleared {relativeTime.from(application.dateApproved)}</h3>;
            res.thirdLine = "";
            break;
        case "PENDING":
            res.color = "text-accent";
            res.icon = "pending";
            res.header = "Pending Application";
            res.secondLine = <h3 className="text-sm">Submitted {relativeTime.from(application.dateSubmitted)}</h3>;
            res.thirdLine = <p className="font-light text-xs mt-2">Being reviewed by <span className="font-medium">{application.step === 1 ? "Adviser" : "Clearance Officer"}</span></p>;
            break;
        case "NO_OFFICER":
            res.color = "text-slate-600";
            res.icon = "circle";
            res.header = "No assigned adviser/clearance officer";
            res.secondLine = "Try again later.";
            res.thirdLine = "";
            break;
        default:
            res.color = "text-slate-600";
            res.icon = "circle";
            res.header = "No application submitted";
            res.secondLine = "";
            res.thirdLine = "";
    }

    return res;
}

export default function Application(props) {
    const { currentApp, isCard, onAppClick, data } = props;
    const [isInactive, setInactive] = useState(true);
    const res = getResources(data);

    useEffect(() => {
        if (currentApp !== undefined) setInactive(data._id !== currentApp._id);
    }, [currentApp, data]);

    function onClk() {
        if (onAppClick == null || onAppClick === undefined) return;
        onAppClick(data);
    }

    return (
        <button onClick={onClk} className={(isCard ? "card " : "") + (!isInactive ? "app-active" : "") + " app-ghost btn-block text-left"}>
            <div className={"flex flex-row px-6 py-5 " + (isCard ? "" : "mx-8")} style={{ minHeight: '7rem' }}>
                <div className="justify-center m-auto flex-none">
                    <span className={res.color + " align-middle material-symbols-rounded"} style={{ fontSize: '3rem' }}>{res.icon}</span>
                </div>
                <div className="flex flex-col justify-center flex-auto ml-5">
                    <h1 className={res.color + " font-semibold text-accent text-xl"}>{res.header}</h1>
                    {res.secondLine}
                    {res.thirdLine}
                </div>
            </div>
        </button>
    )
}