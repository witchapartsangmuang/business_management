export default function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-8">
            <div className="resize overflow-auto border-2 border-green-500 bg-white p-4 shadow-lg" style={{ height: "282px;", width: "258px;" }}>
                <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf" alt="All directions resizing" className="h-64 w-full rounded object-cover" />
                <div className="mt-4 text-gray-700">Feel free to drag the edges of this component in both width and height.</div>
            </div>
        </div>
    )
}