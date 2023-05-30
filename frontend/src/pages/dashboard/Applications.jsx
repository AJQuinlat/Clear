import { React } from "react";
import Application from "../../components/application";

export default function ApplicationsList(properties) {
    const { currentApp, onNewAppClick, onAppClick, elementRef, distanceToBottom, data } = properties;

    function btnNewAppClick() {
        onNewAppClick(true);
    }

    if (data === undefined || data.length === 0 || (data.length === 1 && data[0].step === 0)) {
        return (
            <section className="flex flex-col flex-none dashboard-list-section">
                <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
                    <Application data={({ state: null })} isCard={true} />
                </card>
                <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                </section>
                <button onClick={btnNewAppClick}
                    class="relative z-90 bottom-16 mr-0 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New application</button>
            </section>
        );
    }

    return (
        <section className="flex flex-col flex-none dashboard-list-section">
            <card className="mx-8 flex-none card w-auto bg-base-100 shadow-md mb-0">
                <Application onAppClick={onAppClick} currentApp={currentApp} data={data[0]} isCard={true} />
            </card>
            <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                {data.slice(1).map((data) => {
                    return (
                        <Application onAppClick={onAppClick} currentApp={currentApp} data={data} isCard={false} />
                    )
                })}
                <div className="h-4" />
            </section>
        </section>
    );
}