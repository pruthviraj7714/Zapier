export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen bg-white dark:bg-black text-black dark:text-white">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <div className="text-5xl">Loading...</div>
            </div>
        </div>
    )
}