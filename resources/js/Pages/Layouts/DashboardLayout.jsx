import Sidebar from "./constants/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <div className="min-w-[280px] max-w-[290px] h-screen overflow-y-scroll border-r border-lightgray">
                <Sidebar />
            </div>
            <main className="w-full p-5">{children}</main>
        </div>
    );
}
