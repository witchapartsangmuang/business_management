export default function TestComponent() {
    return (
        <>
            <input
                type="text"
                placeholder="Enter text"
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 focus:outline-none"
            />
            <select
                className="block w-72 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 shadow-sm text-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 focus:outline-none
                appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:14px]"
                style="background-image: url(&quot;data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e&quot;);"
            >
                <option selected>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
            </select>
            <select
                className="block w-72 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 shadow-sm text-sm
         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 focus:outline-none
         appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:14px]
         bg-[url(data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2016%2016%27%3E%3Cpath%20fill%3D%27none%27%20stroke%3D%27%23343a40%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%272%27%20d%3D%27M2%205l6%206%206-6%27/%3E%3C/svg%3E)]"
            >
                <option selected>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
            </select>
        </>
    )
}