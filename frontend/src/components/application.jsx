import 'material-symbols';

function getIcon(state) {
    // eslint-disable-next-line default-case
    switch (state) {
        case "rejected":
            return "cancel";
        case "approved":
            return "check_circle";
        case "pending":
            return "pending";
    }
}

function getColor(state) {
    // eslint-disable-next-line default-case
    switch (state) {
        case "rejected":
            return "text-primary";
        case "approved":
            return "text-secondary";
        case "pending":
            return "text-accent";
    }
}

function getStateHeader(state) {
    // eslint-disable-next-line default-case
    switch (state) {
        case "rejected":
            return "Application Returned";
        case "approved":
            return "Application Cleared";
        case "pending":
            return "Pending Application";
    }
}

function getRelativeStart(state, reviewBy) {
    // eslint-disable-next-line default-case
    switch (state) {
        case "rejected":
            return "Returned by " + reviewBy;
        case "approved":
            return "Cleared";
        case "pending":
            return "Submitted";
    }
}

export default function Application(props) {
    const state = props.state;
    const reviewBy = props.reviewBy;

    return (
        <div className="flex flex-row px-6 py-5">
            <div className="justify-center m-auto flex-none">
                <span className={ getColor(state)+" align-middle material-symbols-rounded" } style={{ fontSize: '3rem' }}>{ getIcon(state) }</span>
            </div>
            <div className="flex flex-col justify-start flex-auto ml-5">
                <h1 className={getColor(state) + " font-semibold text-accent text-2xl"}>{getStateHeader(state)}</h1>
                <h3 className="text-md">{getRelativeStart(state, reviewBy) + " just now"}</h3>
                <p className="font-light text-xs mt-2">Being reviewed by <span className="font-medium">adviser</span></p>
            </div>
        </div>
    )
}