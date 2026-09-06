import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Workspace = () => {
    const location = useLocation();
    const org = location.state || {};
    const [activeNav, setActiveNav] = useState("home");
    useEffect(()=>{

    },[])

    return (
        <div className="w-screen h-screen flex overflow-hidden bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d]">

            <Sidebar
                data={org}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
            />

            <main className="min-w-0 flex-1 overflow-y-auto">
                
                {activeNav === "home" && (
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-white">
                            Welcome to {org.name}
                        </h1>

                        <p className="mt-2 text-zinc-400">
                            Organization overview
                        </p>
                    </div>
                )}

                {activeNav === "projects" && (
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-white">
                            Projects
                        </h1>

                        <p className="mt-2 text-zinc-400">
                            Manage your organization projects here.
                        </p>
                    </div>
                )}

                {activeNav === "activity" && (
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-white">
                            Activity
                        </h1>

                        <p className="mt-2 text-zinc-400">
                            Organization activity will appear here.
                        </p>
                    </div>
                )}

                {activeNav === "tasks" && (
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-white">
                            My Tasks
                        </h1>

                        <p className="mt-2 text-zinc-400">
                            Your assigned tasks will appear here.
                        </p>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Workspace;