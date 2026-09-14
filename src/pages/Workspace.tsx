import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchOrganization } from "../store/actions/organization.actions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import Loader from "../components/Loader";
import DashBoard from "../components/DashBoard";
import Projects from "./Projects";

const Workspace = () => {
    const { id } = useParams<{ id: string }>();

    const [activeNav, setActiveNav] = useState("home");

    const dispatch = useDispatch<AppDispatch>();

    const { organization, loading } = useSelector(
        (state: RootState) => state.org
    );
    console.log(organization);

    useEffect(() => {
        if(!id) return;

        const getOrganization = async () => {
            await dispatch(fetchOrganization(id));
        };

        getOrganization();
    }, [dispatch, id]);

    if (loading || !organization) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#0b0b0d]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d]">

            <Sidebar
                data={organization}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
            />

            <main className="min-w-0 flex-1 overflow-y-auto">

                {activeNav === "home" && (
                    <DashBoard name={organization.name} _id={organization._id} description={organization.description} membersCount={organization.membersCount} lastLogin={organization.lastLogin} owner={organization.owner} logo={organization.logo} />

                )}

                {activeNav === "projects" && (
                    <Projects organization={organization} />
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