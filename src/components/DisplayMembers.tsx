import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { changeRoles, fetchMembers, kickMember } from "../store/actions/invitation.actions";
import { FiX, FiTrash2, FiUser, FiSearch, FiCheck } from "react-icons/fi";
import Loader from "./Loader";
import type { Members } from "../types/interfaces";
import { toast } from "react-toastify";

type Role = "member" | "admin" | "owner";

interface MembersProp {
    id: string;
    setMemberShowcase: React.Dispatch<React.SetStateAction<boolean>>;
}

const palette = {
    panel: "#0a0a0c",
    surfaceRaised: "#151517",
    border: "#232326",
    text: "#f4f4f5",
    textSecondary: "#c4c4c8",
    textMuted: "#8b8b93",
    danger: "#dc2626",
    primary: "#4f46e5",
} as const;

const ROLE_OPTIONS: Role[] = ["member", "admin", "owner"];

const DisplayMembers = ({ id, setMemberShowcase }: MembersProp) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, members } = useSelector((state: RootState) => state.invite);
    const { user } = useSelector((state: RootState) => state.auth);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [pendingRoles, setPendingRoles] = useState<Record<string, Role>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getAllMembers = async () => {
            try {
                const response = await dispatch(fetchMembers(id));
                if (!response?.success) {
                    console.log(response?.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllMembers();
    }, [dispatch, id]);

    const handleRoleChange = async (memberId: string, role: Role) => {
        setUpdatingId(memberId);
        try {
        } catch (error) {
            console.log(error);
        } finally {
            setUpdatingId(null);
        }
    };

    const confirmRoleChange = async (memberId: string) => {
        const newRole = pendingRoles[memberId];
        try {
            const response = await dispatch(changeRoles(id,memberId,newRole));
            if(response?.success){
                toast.success(response?.message || "role successfully updated");
                await dispatch(fetchMembers(id));
                return;
            }else{
                toast.error(response?.message || "Unexpected error occured");
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occured");
        }
        
    };

    const cancelRoleChange = (memberId: string) => {
        setPendingRoles((prev) => {
            const next = { ...prev };
            delete next[memberId];
            return next;
        });
    };

    const handleRemove = async (memberId: string) => {
        setRemovingId(memberId);
        try {
            const response = await dispatch(kickMember(id,memberId));
            if(response?.success){
                toast.success(response?.message || "member successfully kickedOut");
                await dispatch(fetchMembers(id));
                return;
            }else{
                return toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            console.log(error);
            toast.error("Unexpected error occured");
        } finally {
            setRemovingId(null);
        }
    };

    const memberList = (members ?? []) as Members[];
    const filteredMemberList = useMemo(() => {
        const withoutSelf = memberList.filter((m) => m._id !== user?.id);
        const term = search.trim().toLowerCase();
        if (!term) return withoutSelf;
        return withoutSelf.filter(
            (m) => m.username.toLowerCase().includes(term) || m.email.toLowerCase().includes(term)
        );
    }, [memberList, user?.id, search]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setMemberShowcase(false)}
        >
            <div
                className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
                style={{ background: palette.panel, borderColor: palette.border }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="flex shrink-0 items-center justify-between border-b px-5 py-4"
                    style={{ borderColor: palette.border }}
                >
                    <div>
                        <h2 className="text-sm bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont font-semibold">
                            Members
                        </h2>
                        <p className="text-xs" style={{ color: palette.textMuted }}>
                            {memberList.length} {memberList.length === 1 ? "member" : "members"}
                        </p>
                    </div>
                    <button
                        onClick={() => setMemberShowcase(false)}
                        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/5"
                        style={{ color: palette.textMuted }}
                        aria-label="Close"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                <div className="shrink-0 border-b px-5 py-3" style={{ borderColor: palette.border }}>
                    <label
                        className="flex items-center gap-2 rounded-lg px-3 py-2"
                        style={{ background: palette.surfaceRaised }}
                    >
                        <FiSearch size={14} style={{ color: palette.textMuted }} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search members…"
                            className="w-full bg-transparent text-[13px] outline-none"
                            style={{ color: palette.text }}
                        />
                    </label>
                </div>

                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-14">
                            <Loader />
                        </div>
                    ) : filteredMemberList.length > 0 ? (
                        <table className="w-full min-w-[560px] text-left">
                            <thead>
                                <tr
                                    className="sticky top-0"
                                    style={{ background: palette.panel, borderBottom: `1px solid ${palette.border}` }}
                                >
                                    <th
                                        className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide"
                                        style={{ color: palette.textMuted }}
                                    >
                                        Member
                                    </th>
                                    <th
                                        className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide"
                                        style={{ color: palette.textMuted }}
                                    >
                                        Role
                                    </th>
                                    <th
                                        className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide"
                                        style={{ color: palette.textMuted }}
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMemberList.map((member) => {
                                    const role = member.organization?.role;
                                    const isBusy = updatingId === member._id || removingId === member._id;
                                    const pendingRole = pendingRoles[member._id];
                                    const hasPendingChange = pendingRole !== undefined && pendingRole !== role;

                                    return (
                                        <tr
                                            key={member._id}
                                            className="transition-colors hover:bg-white/5"
                                            style={{ borderBottom: `1px solid ${palette.border}` }}
                                        >
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-9 w-9 shrink-0 overflow-hidden rounded-full"
                                                        style={{ background: palette.surfaceRaised }}
                                                    >
                                                        {member.avatar ? (
                                                            <img
                                                                src={member.avatar}
                                                                alt={member.username}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="flex h-full w-full items-center justify-center"
                                                                style={{ color: palette.textMuted }}
                                                            >
                                                                <FiUser size={15} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p
                                                            className="truncate text-sm font-medium"
                                                            style={{ color: palette.text }}
                                                        >
                                                            {member.username}
                                                        </p>
                                                        <p
                                                            className="truncate text-xs"
                                                            style={{ color: palette.textMuted }}
                                                        >
                                                            {member.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <select
                                                        value={pendingRole ?? role}
                                                        disabled={isBusy}
                                                        onChange={(e) =>
                                                            setPendingRoles((prev) => ({
                                                                ...prev,
                                                                [member._id]: e.target.value as Role,
                                                            }))
                                                        }
                                                        className="rounded-md border px-2 py-1 text-[12px] font-medium capitalize outline-none disabled:opacity-50"
                                                        style={{
                                                            background: palette.surfaceRaised,
                                                            borderColor: palette.border,
                                                            color: palette.textSecondary,
                                                        }}
                                                    >
                                                        {ROLE_OPTIONS.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {hasPendingChange && (
                                                        <>
                                                            <button
                                                                onClick={() => confirmRoleChange(member._id)}
                                                                disabled={isBusy}
                                                                className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-opacity disabled:opacity-50"
                                                                style={{ background: palette.primary, color: "#ffffff" }}
                                                            >
                                                                <FiCheck size={12} />
                                                                Change role
                                                            </button>
                                                            <button
                                                                onClick={() => cancelRoleChange(member._id)}
                                                                disabled={isBusy}
                                                                aria-label="Cancel role change"
                                                                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/5 disabled:opacity-50"
                                                                style={{ color: palette.textMuted }}
                                                            >
                                                                <FiX size={13} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-5 py-3 w-fit text-right">
                                                <button
                                                    onClick={() => handleRemove(member._id)}
                                                    disabled={isBusy}
                                                    className="ml-auto w-fit flex h-7 w-full bg-background-items items-center justify-center rounded-md transition-colors text-xs hover:bg-background-itemsdark disabled:opacity-50 text-surface cursor-pointer"
                                                    aria-label={`Remove ${member.username}`}
                                                >
                                                    Kick Member
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="px-5 py-10 text-center text-sm" style={{ color: palette.textMuted }}>
                            {search ? "No members match your search." : "No members yet."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayMembers;