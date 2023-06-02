
import { useState, useEffect } from "react";
import 'material-symbols';
import RelativeTime from '@yaireo/relative-time'
import "./application.css"

function getResources(application) {
    const relativeTime = new RelativeTime();
    let res = {};
    res.header = application.user.firstName + " " + application.user.lastName;
    res.thirdLine = <p className="font-light text-xs mt-2">{application.submission.remarks}</p>;

    // eslint-disable-next-line default-case
    switch (application.status) {
        case "REJECTED":
            res.color = "text-primary";
            res.icon = "cancel";
            res.secondLine = <h3 className="text-sm text-primary">Returned {relativeTime.from(application.dateReturned)}</h3>;
            break;
        case "APPROVED":
            res.color = "text-secondary";
            res.icon = "check_circle";
            res.secondLine = <h3 className="text-sm">Cleared {relativeTime.from(application.dateApproved)}</h3>;
            break;
        case "PENDING":
            res.color = "text-accent";
            res.icon = "pending";
            res.secondLine = <h3 className="text-sm">Submitted {relativeTime.from(application.dateSubmitted)}</h3>;
            break;
    }

    return res;
}

export default function StudentApplication(props) {
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
            <div className={"flex flex-row px-6 py-5 " + (isCard ? " " : "mx-8 ") + (data.status === "REJECTED" ? "opacity-75" : "")} style={{ minHeight: '7rem' }}>
                <label className="my-auto btn btn-ghost btn-circle avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://placehold.jp/150x150.png" />
                    </div>
                </label>
                <div className="flex flex-col justify-center flex-auto ml-5">
                    <h1 className="font-semibold text-xl">{res.header}</h1>
                    {res.secondLine}
                    {res.thirdLine}
                </div>
            </div>
        </button>
    )
}