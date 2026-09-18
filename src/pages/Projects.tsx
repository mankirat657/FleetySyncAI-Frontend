import { useEffect, useMemo, useState } from "react";
import {
    FiX, FiPlus, FiEdit2, FiTrash2, FiUser, FiUserPlus,
    FiCheck, FiFolder, FiSearch, FiLayers, FiTrendingUp,
    FiCheckCircle, FiActivity,
} from "react-icons/fi";
import { GoProject } from "react-icons/go";
import type { Organization, Project, ProjectMember } from "../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { archiveProject, createProject, fetchProjects, updateProject } from "../store/actions/project.actions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { BiArchive } from "react-icons/bi";

type ProjectStatus = Project["status"];

const C = {
    canvas: "#0a0507", panel: "#120a0d", raised: "#1c1216", card: "#13090d",
    border: "#2a1a1f", borderHi: "#3a2229", text: "#f7f2f3", text2: "#d1c4c8",
    muted: "#96838a", faint: "#5f4d53", primary: "#dc2626", primary2: "#e11d48",
    glow: "rgba(220,38,38,0.45)", soft: "rgba(220,38,38,0.14)",
    danger: "#f43f5e", dangerSoft: "rgba(244,63,94,0.16)",
} as const;

const STATUS_OPTIONS: ProjectStatus[] = ["active", "in-progress", "completed", "archived"];
const ST: Record<ProjectStatus, { label: string; bg: string; color: string; dot: string }> = {
    active: { label: "Active", bg: "rgba(220,38,38,0.14)", color: "#fca5a5", dot: "#ef4444" },
    "in-progress": { label: "In progress", bg: "rgba(251,113,133,0.14)", color: "#fda4af", dot: "#fb7185" },
    completed: { label: "Completed", bg: "rgba(217,119,6,0.14)", color: "#fcd34d", dot: "#f59e0b" },
    archived: { label: "Archived", bg: "rgba(150,131,138,0.12)", color: "#a8a29e", dot: "#78716c" },
};

// `ProjectMember` has no id field, only username/email/avatar — email is the
// only unique key available until a real members endpoint exists.
const MOCK_MEMBERS: ProjectMember[] = [
    { username: "Kirat_Singh", email: "mankirat.matharu@gmail.com", avatar: "https://ik.imagekit.io/n7tjqcvae/practice/3a0603d5-057f-474a-a4a6-99186c7c43be_PctLsGZmu" },
    { username: "rohanKumar", email: "mankirat.edu@gmail.com", avatar: "https://ik.imagekit.io/n7tjqcvae/practice/b4cb2142-bd78-4142-8e5c-11f82e0ac4fd_6tFOIFMD8" },
    { username: "trainingMankirat", email: "trainingmankirat@gmail.com", avatar: "" },
];
const emptyForm = { projectName: "", description: "", status: "active" as ProjectStatus };

const inputStyle: React.CSSProperties = { background: C.raised, borderColor: C.border, color: C.text };
const inputCls = "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-red-500/60";
const gradient = `linear-gradient(135deg, ${C.primary}, ${C.primary2})`;
const primaryBtn: React.CSSProperties = { background: gradient, boxShadow: `0 10px 28px -10px ${C.glow}` };

function AvatarStack({ members }: { members: ProjectMember[] }) {
    const shown = members.slice(0, 4), extra = members.length - shown.length;
    if (!members.length) return <span className="text-[11px]" style={{ color: C.faint }}>No members</span>;
    return (
        <div className="flex items-center">
            {shown.map((m, i) => (
                <div key={m.email} title={m.username}
                    className="h-6 w-6 overflow-hidden rounded-full border-2 transition-transform hover:z-10 hover:scale-110"
                    style={{ borderColor: C.card, background: C.raised, marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}>
                    {m.avatar ? <img src={m.avatar} alt={m.username} className="h-full w-full object-cover" />
                        : <div className="flex h-full w-full items-center justify-center text-[9px] font-semibold" style={{ color: C.muted }}>{m.username?.charAt(0).toUpperCase()}</div>}
                </div>
            ))}
            {extra > 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 text-[9px] font-semibold"
                    style={{ borderColor: C.card, background: C.raised, color: C.muted, marginLeft: -8 }}>+{extra}</div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
    const s = ST[status];
    return (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold tracking-wide"
            style={{ background: s.bg, color: s.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
            {s.label}
        </span>
    );
}

function StatusPicker({ value, onChange }: { value: ProjectStatus; onChange: (s: ProjectStatus) => void }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((status) => {
                const s = ST[status], active = value === status;
                return (
                    <button key={status} onClick={() => onChange(status)}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all"
                        style={{
                            background: active ? s.bg : C.raised, color: active ? s.color : C.muted,
                            opacity: active ? 1 : 0.7, boxShadow: active ? `0 0 0 1px ${s.dot}40` : "none"
                        }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                        {s.label}
                    </button>
                );
            })}
        </div>
    );
}

const Projects = ({ organization }: { organization: Organization }) => {
    const [showCreate, setShowCreate] = useState(false);
    const [createForm, setCreateForm] = useState(emptyForm);
    const [selectedId, setSelectedId] = useState<string>("");
    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState(emptyForm);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [addMemberEmail, setAddMemberEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");


    const { projects: rawProjects, loading } = useSelector((state: RootState) => state.project);

    const projects = useMemo(() => (Array.isArray(rawProjects) ? rawProjects : []), [rawProjects]);
    const dispatch = useDispatch<AppDispatch>();

    const selectedProject = useMemo(
        () => projects.find((p) => p._id === selectedId) ?? null,
        [projects, selectedId]
    );

    const filtered = useMemo(() => projects.filter((p) => {
        const q = searchQuery.toLowerCase();
        const match = !q || p.projectName.toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q);
        return match && ((statusFilter === "all" || p.status === statusFilter) && p.status !== "archived");
    }), [projects, searchQuery, statusFilter]);
    console.log(projects);

    const available = useMemo(() => {
        if (!selectedProject) return [];
        const emails = new Set(selectedProject.members.map((m) => m.email));
        return MOCK_MEMBERS.filter((m) => !emails.has(m.email));
    }, [selectedProject]);

    const stats = useMemo(() => ({
        total: projects.length,
        active: projects.filter((p) => p.status === "active").length,
        inProgress: projects.filter((p) => p.status === "in-progress").length,
        completed: projects.filter((p) => p.status === "completed").length,
    }), [projects]);

    const openDetail = (p: Project) => {
        setSelectedId(p._id); setEditMode(false); setAddMemberEmail("");
        setEditForm({ projectName: p.projectName, description: p.description ?? "", status: p.status });
    };
    const closeDetail = () => { setSelectedId(""); setEditMode(false); setConfirmDeleteId(null); };

    const handleSaveEdit = async () => {
        if (!selectedProject || !editForm.projectName.trim()) return;
        setEditMode(false);
        try {
            const response = await dispatch(updateProject(selectedId, editForm.projectName, editForm.description, editForm.status));

            if (response?.success) {
                toast.success(response?.message || "successfully updated projects");
                await dispatch(fetchProjects(organization._id));
                return;
            } else {
                return toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occured");
        }
    };
    const handleDelete = async (id: string) => {
        setConfirmDeleteId(null); if (selectedId === id) closeDetail();
        try {
            const response = await dispatch(archiveProject(id));
            if (response?.success) {
                toast.success(response?.message || "project has been archived");
                await dispatch(fetchProjects(organization._id));
                return;
            } else {
                return toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Unexpected error occured");
        }
    };
    const handleAddMember = () => {
        if (!selectedProject || !addMemberEmail) return;
        const m = MOCK_MEMBERS.find((x) => x.email === addMemberEmail);
        if (!m) return;
        setAddMemberEmail("");
    };
    const handleRemoveMember = (email: string) => {
        if (!selectedProject) return;
    };

    const statCards = [
        { label: "Total", value: stats.total, color: C.text2, icon: FiLayers },
        { label: "Active", value: stats.active, color: "#fca5a5", icon: FiActivity },
        { label: "In progress", value: stats.inProgress, color: "#fda4af", icon: FiTrendingUp },
        { label: "Completed", value: stats.completed, color: "#fcd34d", icon: FiCheckCircle },
    ];

    const makeProject = async () => {
        try {
            const response = await dispatch(createProject(organization._id, createForm.projectName, createForm.description, createForm.status));
            if (response?.success) {
                toast.success(response?.message || "project created successfully");
                await dispatch(fetchProjects(organization._id));
                setShowCreate(false);
                setCreateForm(emptyForm);
                return;
            } else {
                toast.error(response?.message || "Unexpected error occured");
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occured");
        }
    };

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const response = await dispatch(fetchProjects(organization._id));
                if (!response.sucess) {
                    console.log(response?.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProjectDetails();
    }, [dispatch]);

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: C.canvas }}>
            {/* ambient glows */}
            <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full opacity-25 blur-[120px]" style={{ background: C.primary }} />
            <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full opacity-15 blur-[120px]" style={{ background: C.primary2 }} />

            {/* HEADER */}
            <div className="relative z-10 shrink-0 border-b backdrop-blur-xl" style={{ borderColor: C.border, background: "rgba(10,5,7,0.75)" }}>
                <div className="flex flex-col gap-5 px-6 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: gradient, boxShadow: `0 10px 30px -10px ${C.glow}` }}>
                                <FiFolder size={22} className="text-white" />
                                <span className="absolute -inset-1 rounded-2xl opacity-30 blur-md" style={{ background: gradient }} />
                            </div>
                            <div>
                                <h1 className="text-xl bg-gradient-to-r italic from-red-400 font-bold to-red-300 bg-clip-text text-transparent cursiveFont">Projects</h1>
                                <p className="text-xs" style={{ color: C.muted }}>Manage and track everything your team is building</p>
                            </div>
                        </div>
                        <button onClick={() => setShowCreate(true)}
                            className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-95"
                            style={primaryBtn}>
                            <FiPlus size={16} className="transition-transform group-hover:rotate-90" />
                            New project
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            {statCards.map((s) => (
                                <div key={s.label} className="group flex items-center gap-2.5 rounded-xl border px-3.5 py-2 transition-colors hover:border-red-500/40"
                                    style={{ background: C.card, borderColor: C.border }}>
                                    <s.icon size={14} style={{ color: s.color }} />
                                    <span className="text-base font-bold" style={{ color: s.color }}>{s.value}</span>
                                    <span className="text-[11px] font-medium" style={{ color: C.muted }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors focus-within:border-red-500/60"
                                style={{ background: C.card, borderColor: C.border }}>
                                <FiSearch size={14} style={{ color: C.muted }} />
                                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search projects…"
                                    className="w-40 bg-transparent text-xs outline-none sm:w-52" style={{ color: C.text }} />
                            </div>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "all")}
                                className="rounded-xl border px-3 py-2 text-xs outline-none" style={{ background: C.card, borderColor: C.border, color: C.text2 }}>
                                <option value="all">All statuses</option>
                                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{ST[s].label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
                {projects.length === 0 ? (
                    <EmptyState onCreate={() => setShowCreate(true)} />
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center"
                        style={{ borderColor: C.borderHi, background: C.card }}>
                        <FiSearch size={22} style={{ color: C.faint }} />
                        <p className="text-sm font-semibold" style={{ color: C.text }}>No projects match your filters</p>
                        <button onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                            className="text-xs font-medium underline-offset-2 hover:underline" style={{ color: "#fda4af" }}>Clear filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {[...filtered].reverse().map((project) => {
                            const isConfirming = confirmDeleteId === project._id;
                            const s = ST[project.status];
                            return (
                                <div key={project._id}
                                    className="group relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1"
                                    style={{ background: C.card, borderColor: C.border }}>
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{ background: `radial-gradient(500px circle at 50% 0%, ${s.dot}20, transparent 60%)` }} />
                                    <div className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{ background: `linear-gradient(90deg, transparent, ${s.dot}, transparent)` }} />

                                    <div className="relative flex items-start justify-between gap-2">
                                        <button onClick={() => openDetail(project)} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                                                style={{ background: `linear-gradient(135deg, ${s.bg}, transparent)` }}>
                                                <GoProject size={17} style={{ color: s.color }} />
                                            </div>
                                            <span className="truncate text-sm font-semibold" style={{ color: C.text }}>{project.projectName}</span>
                                        </button>
                                        <StatusBadge status={project.status} />
                                    </div>

                                    <p className="relative line-clamp-2 min-h-[2.5em] text-xs leading-relaxed" style={{ color: C.muted }}>
                                        {project.description || "No description yet."}
                                    </p>

                                    <div className="relative mt-auto flex items-center justify-between border-t pt-3" style={{ borderColor: C.border }}>
                                        <AvatarStack members={project.members} />
                                        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                            <button onClick={() => openDetail(project)}
                                                className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                                                style={{ color: C.muted }} aria-label="Edit"><FiEdit2 size={13} /></button>
                                            {isConfirming ? (
                                                <button onClick={() => handleDelete(project._id)}
                                                    className="rounded-lg px-2 py-1 text-[11px] font-semibold" style={{ background: C.dangerSoft, color: "#fda4af" }}>Confirm?</button>
                                            ) : (
                                                <button onClick={() => setConfirmDeleteId(project._id)}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                                                    style={{ color: C.danger }} aria-label="Delete"><BiArchive size={13} /></button>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="group flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
                                        style={{ background: "linear-gradient(135deg, #dc2626, #e11d48)", boxShadow: "0 10px 28px -10px rgba(220,38,38,0.45)" }}
                                    >
                                        <GoProject size={15} className="transition-transform group-hover:translate-x-0.5" />
                                        Open project
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
          
            {showCreate && (
                <Modal onClose={() => setShowCreate(false)}>
                    <ModalHeader icon={FiPlus} title="New project" subtitle="Set up a new project workspace" onClose={() => setShowCreate(false)} />
                    <div className="flex flex-col gap-4 px-5 py-5">
                        <Field label="Project name">
                            <input value={createForm.projectName} onChange={(e) => setCreateForm((f) => ({ ...f, projectName: e.target.value }))}
                                placeholder="e.g. Mobile app redesign" className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="Description">
                            <textarea value={createForm.description} onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                                placeholder="What is this project about?" rows={3} className={`${inputCls} resize-none`} style={inputStyle} />
                        </Field>
                        <Field label="Status">
                            <StatusPicker value={createForm.status} onChange={(status) => setCreateForm((f) => ({ ...f, status }))} />
                        </Field>
                    </div>
                    <ModalFooter>
                        <button onClick={() => setShowCreate(false)} disabled={loading} className="rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5" style={{ color: C.muted }}>Cancel</button>
                        <button onClick={makeProject} disabled={!createForm.projectName.trim()}
                            className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                            style={primaryBtn}>Create project</button>
                    </ModalFooter>
                </Modal>
            )}

            {selectedProject && (
                <Modal onClose={closeDetail} maxW="max-w-lg">
                    <div className="flex shrink-0 items-start justify-between border-b px-5 py-4"
                        style={{ borderColor: C.border, background: `linear-gradient(135deg, ${C.soft}, transparent)` }}>
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: gradient }}>
                                <GoProject size={18} className="text-white" />
                            </div>
                            {editMode ? (
                                <input value={editForm.projectName} onChange={(e) => setEditForm((f) => ({ ...f, projectName: e.target.value }))}
                                    className="min-w-0 flex-1 rounded-md border px-2 py-1 text-sm font-semibold outline-none focus:border-red-500/60" style={inputStyle} />
                            ) : (
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold" style={{ color: C.text }}>{selectedProject.projectName}</p>
                                    <div className="mt-1"><StatusBadge status={selectedProject.status} /></div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {editMode ? (
                                <>
                                    <button onClick={handleSaveEdit} disabled={!editForm.projectName.trim()}
                                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-50" style={primaryBtn}>
                                        <FiCheck size={13} /> Save</button>
                                    <button onClick={() => {
                                        setEditMode(false);
                                        setEditForm({ projectName: selectedProject.projectName, description: selectedProject.description ?? "", status: selectedProject.status });
                                    }}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color: C.muted }}><FiX size={15} /></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setEditMode(true)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color: C.muted }}><FiEdit2 size={14} /></button>
                                    <button onClick={closeDetail}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color: C.muted }}><FiX size={16} /></button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {editMode ? (
                            <div className="mb-5 flex flex-col gap-3">
                                <textarea value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                                    rows={3} placeholder="Project description" className={`${inputCls} resize-none`} style={inputStyle} />
                                <StatusPicker value={editForm.status} onChange={(status) => setEditForm((f) => ({ ...f, status }))} />
                            </div>
                        ) : (
                            <p className="mb-5 text-sm leading-relaxed" style={{ color: C.text2 }}>{selectedProject.description || "No description yet."}</p>
                        )}

                        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: C.muted }}>
                            Members ({selectedProject.members.length})
                        </p>
                        <div className="mb-3 flex flex-col gap-1">
                            {selectedProject.members.length === 0 && (
                                <p className="rounded-xl px-3 py-3 text-xs" style={{ background: C.raised, color: C.faint }}>No members on this project yet.</p>
                            )}
                            {selectedProject.members.map((member) => (
                                <div key={member.email} className="group/m flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5">
                                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition-all group-hover/m:ring-red-500/50" style={{ background: C.raised }}>
                                        {member.avatar ? <img src={member.avatar} alt={member.username} className="h-full w-full object-cover" />
                                            : <div className="flex h-full w-full items-center justify-center" style={{ color: C.muted }}><FiUser size={14} /></div>}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium" style={{ color: C.text }}>{member.username}</p>
                                        <p className="truncate text-xs" style={{ color: C.muted }}>{member.email}</p>
                                    </div>
                                    <button onClick={() => handleRemoveMember(member.email)}
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-0 transition-all hover:bg-white/5 group-hover/m:opacity-100"
                                        style={{ color: C.danger }}><FiTrash2 size={13} /></button>
                                </div>
                            ))}
                        </div>

                        {available.length > 0 && (
                            <div className="flex items-center gap-2">
                                <select value={addMemberEmail} onChange={(e) => setAddMemberEmail(e.target.value)}
                                    className="min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-red-500/60"
                                    style={{ background: C.raised, borderColor: C.border, color: C.text2 }}>
                                    <option value="">Add a member…</option>
                                    {available.map((m) => <option key={m.email} value={m.email}>{m.username} ({m.email})</option>)}
                                </select>
                                <button onClick={handleAddMember} disabled={!addMemberEmail}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                    style={primaryBtn}><FiUserPlus size={15} /></button>
                            </div>
                        )}
                    </div>

                    <ModalFooter justify="between">
                        <span className="text-[11px]" style={{ color: C.faint }}>ID: {selectedProject._id.slice(-8)}</span>
                        {confirmDeleteId === selectedProject._id ? (
                            <button onClick={() => handleDelete(selectedProject._id)}
                                className="rounded-lg px-3 py-1.5 text-[12px] font-semibold" style={{ background: C.dangerSoft, color: "#fda4af" }}>Confirm delete?</button>
                        ) : (
                            <button onClick={() => setConfirmDeleteId(selectedProject._id)}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors hover:bg-white/5" style={{ color: C.danger }}>
                                <FiTrash2 size={13} /> Delete project</button>
                        )}
                    </ModalFooter>
                </Modal>
            )}
            {loading && <Loader />}
        </div>
    );
};

/* ---------- small helpers to reduce repetition ---------- */

function EmptyState({ onCreate }: { onCreate: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-20 text-center"
            style={{ borderColor: C.borderHi, background: C.card }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: C.soft }}>
                <FiFolder size={26} style={{ color: "#fda4af" }} />
            </div>
            <div>
                <p className="text-base font-semibold" style={{ color: C.text }}>No projects yet</p>
                <p className="mt-1 max-w-xs text-xs" style={{ color: C.muted }}>Create your first project to start assigning tasks to your team.</p>
            </div>
            <button onClick={onCreate} className="mt-2 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95" style={primaryBtn}>
                <FiPlus size={15} /> New project
            </button>
        </div>
    );
}

function Modal({ children, onClose, maxW = "max-w-md" }: { children: React.ReactNode; onClose: () => void; maxW?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md" style={{ background: "rgba(0,0,0,0.78)" }} onClick={onClose}>
            <div className={`flex max-h-[85vh] w-full ${maxW} flex-col overflow-hidden rounded-2xl border`}
                style={{ background: C.panel, borderColor: C.borderHi, boxShadow: `0 30px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px ${C.soft}` }}
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

function ModalHeader({ icon: Icon, title, subtitle, onClose }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; subtitle: string; onClose: () => void }) {
    return (
        <div className="flex items-center justify-between border-b px-5 py-4"
            style={{ borderColor: C.border, background: `linear-gradient(135deg, ${C.soft}, transparent)` }}>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: gradient }}>
                    <Icon size={16} className="text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold" style={{ color: C.text }}>{title}</h2>
                    <p className="text-[11px]" style={{ color: C.muted }}>{subtitle}</p>
                </div>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color: C.muted }}>
                <FiX size={16} />
            </button>
        </div>
    );
}

function ModalFooter({ children, justify = "end" }: { children: React.ReactNode; justify?: "end" | "between" }) {
    return (
        <div className={`flex shrink-0 items-center ${justify === "between" ? "justify-between" : "justify-end"} gap-2 border-t px-5 py-4`}
            style={{ borderColor: C.border }}>
            {children}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: C.muted }}>{label}</label>
            {children}
        </div>
    );
}
export default Projects;