export default function Search(props) {

    return (
        <div>
            <label className="relative block mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>
                <input
                    className="w-full bg-white placeholder:font-italitc border border-slate-300 rounded-lg py-2 pl-12 pr-4 focus:outline-none shadow-md"
                    placeholder="Search for applications" type="text" />
            </label>

            {/* filter by */}
            <div class="grid gap-2 mb-1 md:grid-cols-5 pr-16">
                <span className="ml-8 mt-2">Filter by</span>
                <button className="btn mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Date</button>
                <button className="btn h-2 mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Adviser</button>
                <button className="btn h-2 mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Status</button>
                <button className="btn h-2 mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Step</button>
            </div>
             {/* sort by */}
            <div class="grid gap-2 mb-6 md:grid-cols-5 pr-16">
                <span className="ml-8 mt-2">Sort by</span>
                <button className="btn h-2 mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Date</button>
                <button className="btn h-2 mb-2 text-black text-xs shadow-md border-none bg-white rounded-full hover:text-white">Name</button>
            </div>
        </div>
    )
}