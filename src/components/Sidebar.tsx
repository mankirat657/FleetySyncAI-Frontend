import React, { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import {
    FiHome as Home,
    FiBell as Bell,
    FiSettings as Settings,
    FiPlus as Plus,
    FiMoon as Moon,
    FiSearch as Search,
    FiUserPlus as UserPlus,
    FiHeadphones as Headphones,
    FiUsers as Contact,
    FiStar as Star,
    FiMenu as Menu,
    FiX as X,
    FiArrowUp as ArrowUp,
    FiArrowLeft as ArrowLeft,
    FiArrowRight as ArrowRight,
    FiClock as History,
    FiChevronRight as ChevronRight,
    FiUserCheck as UserCheck,
    FiLink,
    FiPieChart as PieChart,
    FiEdit as Edit,
    FiUser as User,
    FiSliders as Sliders,
    FiLogOut as LogOut,
    FiArchive as Archive,
} from 'react-icons/fi'
import { PiSparkleFill as Sparkles } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { GoProject } from 'react-icons/go'
import { BiTask } from 'react-icons/bi'
import { FaLink } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CgAdd } from 'react-icons/cg'
import EditOrganizationModal from './EditOrganizationModal'
import { userLogout } from '../store/actions/auth.actions'
import { toast } from 'react-toastify'
import InviteMemberModa from './InviteMemberModa'

const palette = {
    canvas: '#000000',
    rail: '#0c0c0e',
    panel: '#0a0a0c',
    surfaceRaised: '#151517',
    border: '#232326',
    borderStrong: '#2f2f33',
    text: '#f4f4f5',
    textSecondary: '#c4c4c8',
    textMuted: '#8b8b93',
    textFaint: '#5a5a62',
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    primaryActive: '#3730a3',
    primaryGlow: 'rgba(79,70,229,0.35)',
    primarySoft: 'rgba(79,70,229,0.14)',
    danger: '#dc2626',
    success: '#16a34a',
    textInverse: '#ffffff',
} as const

// Mirrors project.model.ts — a project belongs to an organization and holds tasks.
interface Project {
    id: string
    name: string
    openTasks: number
    archived?: boolean
}

interface NavItem {
    id: string
    label: string
    icon: IconType
}

interface Org {
    logo: string
    description: string
    _id: string
    lastLogin : Date;
    membersCount: number
    name: string
    owner: {
        _id : string;
        avatar : string;
        email : string;
        username: string;
    }
}

interface User {
    username: string
    email: string
    avatar?: string
}

interface SidebarProps {
    data: Org
    projects?: Project[]
    user?: User
    activeNav: string
    setActiveNav: React.Dispatch<React.SetStateAction<string>>
}

const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: GoProject },
    { id: 'activity', label: 'Activity', icon: Bell },
    { id: 'tasks', label: 'My Tasks', icon: BiTask },
]

const DEFAULT_PROJECTS: Project[] = [
    { id: 'onboarding', name: 'Client onboarding', openTasks: 5 },
    { id: 'mobile-app', name: 'Mobile app v2', openTasks: 12 },
    { id: 'q3-roadmap', name: 'Q3 roadmap', openTasks: 0 },
]

export default function Sidebar({
    data,
    projects = DEFAULT_PROJECTS,
    activeNav,
    setActiveNav,
}: SidebarProps): React.ReactElement {
    const [activeProject, setActiveProject] = useState<string>(projects[0]?.id ?? '')
    const [query, setQuery] = useState<string>('')
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [bannerOpen, setBannerOpen] = useState<boolean>(true)
    const [doNotDisturb, setDoNotDisturb] = useState<boolean>(false)
    const [workspaceOpen, setWorkspaceOpen] = useState<boolean>(false)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false)
    const [createMenuOpen, setCreateMenuOpen] = useState<boolean>(false)
    const [editOrganizationModal, setEditOrganizationModal] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false)
    const [invitationModalOpen,setInvitationModalOpen] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.auth)
    const anyMenuOpen = workspaceOpen || settingsMenuOpen || createMenuOpen || profileOpen
    console.log(data)
    const dispatch = useDispatch<AppDispatch>();

    const closeAllMenus = () => {
        setWorkspaceOpen(false)
        setSettingsMenuOpen(false)
        setCreateMenuOpen(false)
        setProfileOpen(false)
    }

    const filteredProjects = useMemo<Project[]>(
        () => projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
        [projects, query]
    )
    const org = user?.organization.find(f => f.id === data._id)
    const logout = async () => {
        try {
          const response = await dispatch(userLogout());
          if (response?.success) {
            toast.success(response?.message || "user logout successfully")
          } else {
            toast.error(response?.message || "Unexpected error occurred");
          }
        } catch (error) {
          console.error(error);
          toast.error("unexpected error occured");
        }
      }
    return (
        <div
            className="flex h-screen shrink-0 overflow-hidden font-sans"
            style={{ background: palette.canvas }}
        >
            {anyMenuOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={closeAllMenus}
                    aria-hidden="true"
                />
            )}

            {/* Rail — organization switcher, primary nav, admin/create/profile */}
            <aside
                className="relative z-30 flex h-full w-[64px] shrink-0 flex-col items-center justify-between py-3 sm:w-[72px]"
                style={{ background: palette.rail, borderRight: `1px solid ${palette.border}` }}
            >
                <div className="flex w-full flex-col items-center gap-4">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setWorkspaceOpen((prev) => !prev)
                                setSettingsMenuOpen(false)
                                setCreateMenuOpen(false)
                                setProfileOpen(false)
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer sm:h-11 sm:w-11"
                            style={{ background: palette.surfaceRaised }}
                            aria-label="Organization"
                            aria-expanded={workspaceOpen}
                        >
                            {data.logo ? (
                                <img
                                    src={data.logo}
                                    alt={data.name ?? "Organization"}
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            ) : (
                                <span style={{ color: palette.text }}>
                                    {data?.name?.charAt(0).toUpperCase() ?? "O"}
                                </span>
                            )}
                        </button>

                        {workspaceOpen && (
                            <div
                                className="absolute left-full top-0 z-50 ml-2 w-[min(85vw,16rem)] overflow-hidden rounded-xl border shadow-2xl"
                                style={{ background: palette.surfaceRaised, borderColor: palette.border, boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}
                            >
                                <div className="px-3 py-2" style={{ borderColor: palette.border }}>
                                    <div className="flex items-center gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold" style={{ color: palette.text }}>
                                                {data.name}
                                            </p>
                                            <p className="text-xs capitalize" style={{ color: palette.textMuted }}>
                                              {data.membersCount} members
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div
                                        className="h-px mb-1"
                                        style={{ background: palette.border }}
                                    />

                                    <Link
                                        to="/organization-setup"
                                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                                        style={{ color: palette.textMuted }}
                                        onClick={() => {
                                            console.log("Create organization clicked");
                                            setWorkspaceOpen(false);
                                        }}
                                    >
                                        <Plus size={16} />
                                        <span className="text-sm font-medium">
                                            Create organization
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
                        style={{ color: palette.textMuted }}
                        aria-label="Toggle projects panel"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <div className="h-px w-8" style={{ background: palette.border }} />

                    <nav className="flex w-full flex-col items-center gap-1">
                        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                            const active = activeNav === id
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveNav(id)}
                                    className="relative cursor-pointer flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 transition-colors sm:px-2"
                                    style={{
                                        color: active ? '#dc2626' : '#ffc3c37f',
                                        background: active ? '#e5464624' : 'transparent',
                                    }}
                                >
                                    {active && (
                                        <span
                                            className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full"
                                            style={{ background: '#dc2626' }}
                                        />
                                    )}
                                    <Icon size={19} />
                                    <span className="text-[9px] font-medium leading-none sm:text-[10px]">{label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex w-full flex-col items-center gap-3">
                    {/* Admin — mirrors organization.routes.ts + member.routes.ts */}
                    <div className="relative">
                        <button
                            className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                            style={{ color: settingsMenuOpen ? palette.primary : palette.textMuted }}
                            aria-label="Admin"
                            onClick={() => {
                                setSettingsMenuOpen((prev) => !prev)
                                setCreateMenuOpen(false)
                                setWorkspaceOpen(false)
                                setProfileOpen(false)
                            }}
                        >
                            <Settings size={18} />
                            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: palette.success }} />
                        </button>

                        {settingsMenuOpen && (
                            <div
                                className="absolute bottom-0 left-full z-50 ml-2 w-[min(85vw,280px)] overflow-hidden rounded-xl border shadow-2xl"
                                style={{ background: palette.panel, borderColor: palette.border, boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}
                            >
                                <div className="max-h-[min(70vh,500px)] overflow-y-auto py-1">
                                    <div className="border-b px-4 py-3" style={{ borderColor: palette.border }}>
                                        <p className="text-xs font-medium" style={{ color: palette.textMuted }}>Admin</p>
                                    </div>

                                    <div className="py-1" onClick={() => setEditOrganizationModal(true)}>
                                        <SettingsMenuItem icon={Settings} label="Organization settings" />
                                        <div className="flex cursor-pointer items-center gap-3 py-1.5 pl-9 pr-3 transition-colors hover:bg-white/5" style={{ color: palette.textMuted }}>
                                            <Edit size={14} />
                                            <span className="text-sm">Edit organization</span>
                                        </div>
                                    </div>

                                    <div className="h-px" style={{ background: palette.border }} />

                                    <div className="py-1">
                                        <SettingsMenuItem icon={UserCheck} label="Manage members" />
                                        <SettingsMenuItem icon={UserPlus} label="Manage roles" />
                                        <SettingsMenuItem icon={FaLink} label="Pending invitations" />
                                        <SettingsMenuItem icon={PieChart} label="Organization analytics" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Create — mirrors project/task/invitation routes + ai.routes generateTaskBreakDown */}
                    <div className="relative">
                        <button
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed transition-colors hover:border-solid hover:bg-white/5"
                            style={{ borderColor: palette.borderStrong, color: palette.textMuted }}
                            aria-label="Create"
                            onClick={() => {
                                setCreateMenuOpen((prev) => !prev)
                                setSettingsMenuOpen(false)
                                setWorkspaceOpen(false)
                                setProfileOpen(false)
                            }}
                        >
                            <Plus size={16} />
                        </button>

                        {createMenuOpen && (
                            <div
                                className="absolute bottom-0 left-full z-50 ml-2 w-[min(85vw,260px)] overflow-hidden rounded-xl border shadow-2xl"
                                style={{ background: palette.panel, borderColor: palette.border, boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}
                            >
                                <div className="max-h-[min(70vh,420px)] overflow-y-auto py-2">
                                    <div className="px-3 py-2">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: palette.textMuted }}>Create</p>
                                    </div>

                                    <CreateMenuItem icon={GoProject} label="Project" description="Start a new project in this organization" />
                                    <CreateMenuItem icon={BiTask} label="Task" description="Add a task and assign it to a member" />
                                    <CreateMenuItem icon={Sparkles} label="AI task breakdown" description="Split a task into subtasks automatically" />

                                    <div className="my-1 h-px" style={{ background: palette.border }} />

                                    <CreateMenuItem icon={UserPlus} label="Invite member" description="Add someone to this organization" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile — mirrors auth.routes.ts getMe / logoutUser */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setProfileOpen((prev) => !prev)
                                setSettingsMenuOpen(false)
                                setCreateMenuOpen(false)
                                setWorkspaceOpen(false)
                            }}
                            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                            style={{ background: palette.primarySoft, color: '#c7d2fe' }}
                            aria-label="Profile menu"
                            aria-expanded={profileOpen}
                        >
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-sm font-semibold">{user?.username?.charAt(0).toUpperCase() ?? 'U'}</span>
                            )}
                            <span
                                className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                                style={{ background: doNotDisturb ? palette.rail : palette.success, border: `2px solid ${palette.rail}` }}
                            >
                                {doNotDisturb && <Moon size={7} color={palette.textMuted} />}
                            </span>
                        </button>

                        {profileOpen && (
                            <div
                                className="absolute bottom-0 left-full z-50 ml-2 w-[min(90vw,280px)] overflow-hidden rounded-xl border shadow-2xl"
                                style={{ background: palette.panel, borderColor: palette.border, boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}
                            >
                                <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${palette.border}` }}>
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full" style={{ background: palette.surfaceRaised }}>
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold" style={{ color: palette.text }}>
                                                {user?.username?.charAt(0).toUpperCase() ?? 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold" style={{ color: palette.text }}>
                                            {user?.username ?? 'Guest'}
                                        </p>
                                        <p className="truncate text-xs" style={{ color: palette.textMuted }}>
                                            {user?.email ?? 'Not signed in'}
                                        </p>
                                        <p className='bg-[#e5464624] my-1 w-fit px-2 py-1 text-xs rounded-md font-semibold text-background-itemsdark'>
                                            {org?.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="py-1">
                                    <ProfileMenuItem icon={User} label="Profile" />
                                    <ProfileMenuItem icon={Sliders} label="Preferences" />
                                    <ProfileMenuItem icon={Settings} label="Account settings" />
                                </div>

                                <div className="h-px" style={{ background: palette.border }} />

                                <div className="py-1" onClick={logout}>
                                    <ProfileMenuItem icon={LogOut} label="Sign out" tone="danger" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {mobileOpen && (
                <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-20 md:hidden" style={{ background: 'rgba(0,0,0,0.6)' }} />
            )}

            <section
                className={`fixed left-16 z-20 flex h-full w-[min(85vw,280px)] flex-col transition-transform duration-300 sm:left-[72px] sm:w-[min(80vw,300px)] md:static md:left-0 md:z-auto md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ background: palette.panel, borderRight: `1px solid ${palette.border}` }}
            >


                <div className="flex shrink-0 items-center justify-between px-4 py-3">
                    <button className="flex items-center gap-1 text-[15px] font-bold" style={{ color: palette.text }}>
                        {data.name}
                    </button>
                    <div className="flex items-center gap-1">
                        <IconGhost icon={Settings} color={palette.textMuted} label="Organization settings" />
                        <IconGhost icon={UserPlus} color={palette.textMuted} label="Invite member" />
                        <IconGhost icon={Plus} color={palette.textMuted} label="New project" />
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
                    {bannerOpen && (
                        <div
                            className="mb-3 flex items-center gap-2 rounded-xl bg-[#e5464624] px-3 py-2.5"
                        >
                            <Sparkles size={15} className='text-background-itemsdark' />
                            <span className="flex-1 text-[13px] text-background-itemsdark font-semibold" >
                                Try AI task breakdown
                            </span>
                            <button onClick={() => setBannerOpen(false)} className="rounded-full p-1" aria-label="Dismiss">
                                <span className="block h-2 w-2 rounded-full bg-background-items" />
                            </button>
                        </div>
                    )}

                    <label
                        className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 transition-shadow focus-within:ring-2"
                        style={{ background: palette.surfaceRaised, ['--tw-ring-color' as string]: "#dc2626" }}
                    >
                        <Search size={15} style={{ color: palette.textMuted }} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a project…"
                            className="w-full bg-transparent text-[13px] outline-none"
                            style={{ color: palette.text }}
                        />
                    </label>

                    <div className="mb-4 flex flex-col gap-0.5">
                        <QuickLink icon={Contact} label="Members" color={palette.textSecondary} />
                        <QuickLink icon={Headphones} label="Support" color={palette.textSecondary} />
                    </div>

                    <div className="mb-4 h-px" style={{ background: palette.border }} />

                    <SectionLabel color={palette.textMuted}>Starred</SectionLabel>
                    <div className="mb-4 flex items-center gap-2 rounded-lg px-2.5 py-3" style={{ color: palette.textFaint }}>
                        <Star size={14} />
                        <span className="text-[12.5px]">Drag and drop important projects here</span>
                    </div>

                    <SectionLabel color={palette.textMuted}>Projects</SectionLabel>
                    <div className="flex flex-col gap-0.5">
                        {filteredProjects.map((p) => {
                            const active = p.id === activeProject
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setActiveProject(p.id)}
                                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors"
                                    style={{ background: active ? "#e5464624" : 'transparent', color: active ? '#dc2626' : palette.textSecondary }}
                                >
                                    <GoProject size={15} />
                                    <span className={`flex-1 truncate text-[13.5px] ${p.openTasks ? 'font-semibold' : 'font-medium'}`}>{p.name}</span>
                                    {p.openTasks > 0 && (
                                        <span
                                            className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
                                            style={{ background: palette.danger, color: palette.textInverse }}
                                        >
                                            {p.openTasks}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                        <button className="mt-1 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors" style={{ color: palette.textMuted }}>
                            <Plus size={15} />
                            <span className="text-[13.5px] font-medium">New project</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors" style={{ color: palette.textFaint }}>
                            <Archive size={15} />
                            <span className="text-[13.5px] font-medium">Archived tasks</span>
                        </button>
                    </div>
                </div>

                <div className="shrink-0 px-3 pb-3">
                    <p className="mb-2 px-1 text-[11.5px] leading-snug" style={{ color: palette.textFaint }}>
                        OrgSyncAi works better with your whole team in it.
                    </p>
                    <button
                        onClick={() => setInvitationModalOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[12.5px] font-semibold transition-colors bg-background-itemsdark text-surface hover:bg-background-items cursor-pointer"
                    >
                        <CgAdd size={13} />
                        Invite member
                    </button>
                </div>
            </section>

            {editOrganizationModal && <EditOrganizationModal  id={data._id} name={data.name} logo={data.logo} description={data.description} logoUrl={data.logo} onClose={() => setEditOrganizationModal(false)} />}
            {invitationModalOpen && <InviteMemberModa id={data._id} onClose={() => setInvitationModalOpen(false)} />}
        </div>
    )
}

interface SettingsMenuItemProps {
    icon: IconType
    label: string
    badge?: string
    hasChevron?: boolean
}

function SettingsMenuItem({ icon: Icon, label, badge, hasChevron }: SettingsMenuItemProps): React.ReactElement {
    const palette = {
        text: '#f4f4f5',
        textSecondary: '#c4c4c8',
        textMuted: '#8b8b93',
        border: '#232326',
        surfaceRaised: '#151517',
        primary: '#4f46e5',
    }

    return (
        <div className="flex cursor-pointer items-center justify-between px-3 py-2 transition-colors hover:bg-white/5">
            <div className="flex items-center gap-3">
                <Icon size={16} style={{ color: palette.textMuted }} />
                <span className="text-sm font-medium" style={{ color: palette.textSecondary }}>{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {badge && (
                    <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: palette.surfaceRaised, color: palette.textMuted, border: `1px solid ${palette.border}` }}>
                        {badge}
                    </span>
                )}
                {hasChevron && <ChevronRight size={14} style={{ color: palette.textMuted }} />}
            </div>
        </div>
    )
}

interface CreateMenuItemProps {
    icon: IconType
    label: string
    description?: string
}

function CreateMenuItem({ icon: Icon, label, description }: CreateMenuItemProps): React.ReactElement {
    const palette = {
        text: '#f4f4f5',
        textSecondary: '#c4c4c8',
        textMuted: '#8b8b93',
    }

    return (
        <div className="flex cursor-pointer items-start gap-3 px-3 py-2 transition-colors hover:bg-white/5">
            <div className="mt-0.5">
                <Icon size={16} style={{ color: palette.textMuted }} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>{label}</p>
                {description && (
                    <p className="truncate text-xs" style={{ color: palette.textMuted }}>{description}</p>
                )}
            </div>
        </div>
    )
}

interface ProfileMenuItemProps {
    icon: IconType
    label: string
    tone?: 'default' | 'danger'
}

function ProfileMenuItem({ icon: Icon, label, tone = 'default' }: ProfileMenuItemProps): React.ReactElement {
    const palette = {
        textSecondary: '#c4c4c8',
        textMuted: '#8b8b93',
        danger: '#f87171',
    }
    const color = tone === 'danger' ? palette.danger : palette.textSecondary

    return (
        <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-white/5"
            style={{ color }}
        >
            <Icon size={15} style={{ color: tone === 'danger' ? palette.danger : palette.textMuted }} />
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

interface IconGhostProps {
    icon: IconType
    color: string
    label: string
}

function IconGhost({ icon: Icon, color, label }: IconGhostProps): React.ReactElement {
    return (
        <button className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/5" style={{ color }} aria-label={label}>
            <Icon size={15} />
        </button>
    )
}

interface QuickLinkProps {
    icon: IconType
    label: string
    color: string
}

function QuickLink({ icon: Icon, label, color }: QuickLinkProps): React.ReactElement {
    return (
        <button className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left" style={{ color }}>
            <Icon size={16} />
            <span className="text-[13.5px] font-medium">{label}</span>
        </button>
    )
}

interface SectionLabelProps {
    children: React.ReactNode
    color: string
}

function SectionLabel({ children, color }: SectionLabelProps): React.ReactElement {
    return (
        <div className="mb-1 flex items-center gap-1 px-2.5 py-1 text-[12px] font-semibold" style={{ color }}>
            {children}
        </div>
    )
}