import { React } from "react";
import Application from "../../components/application";

export default function ApplicationsList(properties) {
    const elementRef = properties.elementRef;
    const distanceToBottom = properties.distanceToBottom;
    const data = properties.data;

    if (data === undefined || data.length === 0) {
        return (
            <section className="flex flex-col flex-none dashboard-list-section mx-8">
                <card className="flex-none card w-full bg-base-100 shadow-md mb-0">
                    <Application data={({ state: null })} />
                </card>
                <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                </section>
                <button onclick="buttonHandler()" title="Contact Sale"
                    class="relative z-90 bottom-16 mr-0 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New application</button>
            </section>
        );
    }

    return (
        <section className="flex flex-col flex-none dashboard-list-section mx-8">
            <card className="flex-none card w-full bg-base-100 shadow-md mb-0">
                <Application data={data[0]} />
            </card>
            <section className="dashboard-list grow" ref={elementRef} style={{ "height": distanceToBottom + "px" }}>
                {data.slice(1).map((data) => {
                    return (
                        <Application data={data} />
                    )
                })}
                <div className="h-4" />
            </section>
            <button onclick="buttonHandler()" title="Contact Sale"
                class="relative z-90 bottom-16 mr-0 ml-auto btn btn-secondary w-max h-12 px-3 rounded-lg drop-shadow-md justify-center items-center text-white text-sm normal-case shadow-lg"><span className="align-middle material-symbols-rounded mr-2" style={{ fontSize: '20px' }}>add_circle</span>New application</button>
        </section>
    );
}