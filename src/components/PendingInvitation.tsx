import React, { useEffect, useMemo, useState } from 'react'
import {
    FiX as X,
    FiMail as Mail,
    FiClock as Clock,
    FiTrash2 as Trash2,
    FiRefreshCw as RefreshCw,
    FiLoader,
    FiInbox as Inbox,
} from 'react-icons/fi'
import { deleteInvitation, viewInvitations } from '../store/actions/invitation.actions'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { fetchOrganization } from '../store/actions/organization.actions'

const palette = {
    overlay: 'rgba(0,0,0,0.6)',
    panel: '#0a0a0c',
    surfaceRaised: '#151517',
    border: '#232326',
    borderStrong: '#2f2f33',
    text: '#f4f4f5',
    textSecondary: '#c4c4c8',
    textMuted: '#8b8b93',
    textFaint: '#5a5a62',
    primary: '#4f46e5',
    primaryGlow: 'rgba(79,70,229,0.35)',
    success: '#16a34a',
    successSoft: 'rgba(22,163,74,0.14)',
    warning: '#d97706',
    warningSoft: 'rgba(217,119,6,0.14)',
    danger: '#dc2626',
    dangerSoft: 'rgba(220,38,38,0.14)',
    dangerBorder: 'rgba(220,38,38,0.35)',
    textInverse: '#ffffff',
} as const

type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

interface Invitation {
    _id: string
    organization: string
    invitedBy: {
        avatar: string;
        email: string;
        username: string;
        _id: string
    }
    invitedByName?: string
    email: string
    role: string
    status: InvitationStatus
    token?: string
    expiresAt: string
    createdAt: string
    updatedAt: string
    __v?: number
}

interface View {
    onClose: () => void
    id: string
    onDelete?: (invitationId: string) => void | Promise<void>
    onResend?: (invitationId: string) => void | Promise<void>
}

function timeAgo(iso: string): string {
    const diffMs = Date.now() - new Date(iso).getTime()
    const mins = Math.round(diffMs / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.round(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.round(hours / 24)
    return `${days}d ago`
}

function expiryInfo(iso: string): { label: string; expired: boolean } {
    const diffMs = new Date(iso).getTime() - Date.now()
    if (diffMs <= 0) return { label: 'Expired', expired: true }
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (days >= 1) return { label: `Expires in ${days}d`, expired: false }
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    return { label: `Expires in ${hours}h`, expired: false }
}

const STATUS_STYLES: Record<InvitationStatus, { bg: string; color: string; label: string }> = {
    pending: { bg: palette.warningSoft, color: '#fbbf24', label: 'Pending' },
    accepted: { bg: palette.successSoft, color: '#86efac', label: 'Accepted' },
    rejected: { bg: palette.dangerSoft, color: '#fca5a5', label: 'Rejected' },
    expired: { bg: 'rgba(139,139,147,0.14)', color: palette.textMuted, label: 'Expired' },
}

const PendingInvitation = ({ id, onClose, onDelete, onResend }: View) => {
    const [visible, setVisible] = useState(true)
    const [pendingAction, setPendingAction] = useState<{ invitationId: string; type: 'delete' | 'resend' } | null>(null)
    const [confirmId, setConfirmId] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [removedIds, setRemovedIds] = useState<string[]>([])

    const dispatch = useDispatch<AppDispatch>()
    const { invitation, loading } = useSelector((state: RootState) => state.invite)
    const invitations = (invitation ?? []) as Invitation[]
    console.log(invitations);
    const handleClose = () => {
        setVisible(false)
        setTimeout(onClose, 180)
    }

    useEffect(() => {
        const getInvitation = async () => {
            setIsFetching(true)
            try {
                await dispatch(viewInvitations(id))
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        getInvitation()
    }, [dispatch, id])

    const sorted = useMemo(
        () =>
            [...invitations]
                .filter((inv) => !removedIds.includes(inv._id))
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [invitations, removedIds]
    )
    console.log(sorted);

    const handleDelete = async (invitationId: string) => {
        setPendingAction({ invitationId, type: 'delete' })
        try {
            const response = await dispatch(deleteInvitation(invitationId));
            if (response?.success) {
                toast.success(response?.message || "invitation successfully deleted");
                await dispatch(fetchOrganization(invitationId));
                return;
            } else {
                return toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            console.log(error);
            return toast.error("Unexpected error occured")
        } finally {
            setPendingAction(null)
            setConfirmId(null)
        }
    }

    const handleResend = async (invitationId: string) => {
        setPendingAction({ invitationId, type: 'resend' })
        try {
            await onResend?.(invitationId)
        } finally {
            setPendingAction(null)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200"
            style={{ background: palette.overlay, opacity: visible ? 1 : 0 }}
            onClick={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-200"
                style={{
                    background: palette.panel,
                    borderColor: palette.border,
                    boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7)',
                    maxHeight: '85vh',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
                }}
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <div>
                        <h2 className="text-sm bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont font-semibold">
                            Pending invitations
                        </h2>
                        <p className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                            {sorted.length} invitation{sorted.length !== 1 ? 's' : ''} sent
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                        style={{ color: palette.textMuted }}
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
                    {isFetching ? (
                        <div className="flex flex-col items-center gap-2 py-12" style={{ color: palette.textMuted }}>
                            <FiLoader size={18} className="animate-spin" />
                            <span className="text-xs">Loading invitations…</span>
                        </div>
                    ) : sorted.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-14 text-center" style={{ color: palette.textFaint }}>
                            <Inbox size={22} />
                            <p className="text-sm font-medium" style={{ color: palette.textMuted }}>No pending invitations</p>
                            <p className="max-w-[220px] text-xs">Invites you send will show up here until they're accepted or removed.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            {sorted.map((inv) => {
                                const status = STATUS_STYLES[inv.status]
                                const expiry = expiryInfo(inv.expiresAt)
                                const isDeleting = pendingAction?.invitationId === inv._id && pendingAction.type === 'delete'
                                const isResending = pendingAction?.invitationId === inv._id && pendingAction.type === 'resend'

                                return (
                                    <div
                                        key={inv._id}
                                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
                                        style={{ background: palette.surfaceRaised, border: `1px solid ${palette.border}` }}
                                    >
                                        <div
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                            style={{ background: 'rgba(79,70,229,0.14)', color: '#a5b4fc' }}
                                        >
                                            <Mail size={15} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate text-xs font-medium" style={{ color: palette.text }}>
                                                    invited To :- {inv.email}
                                                </p>
                                                <span
                                                    className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                                                    style={{ background: status.bg, color: status.color }}
                                                >
                                                    {status.label}
                                                </span>
                                            </div>
                                            <div className="">
                                                <p className='text-surface flex items-center gap-2 text-xs'>Invited By :- <div className='w-5 h-5 rounded-full'><img src={inv.invitedBy.avatar} className='w-full h-full object-cover rounded-full' alt="" /></div>{inv.invitedBy?.username}<p>({inv.invitedBy.email})</p></p>
                                            </div>
                                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px]" style={{ color: palette.textMuted }}>
                                                <span className="capitalize">{inv.role}</span>
                                                <span style={{ color: palette.textFaint }}>·</span>
                                                {inv.invitedByName && (
                                                    <>
                                                        <span>Invited by {inv.invitedByName}</span>
                                                        <span style={{ color: palette.textFaint }}>·</span>
                                                    </>
                                                )}
                                                <span>{timeAgo(inv.createdAt)}</span>
                                                <span style={{ color: palette.textFaint }}>·</span>
                                                <span className="flex items-center gap-1" style={{ color: expiry.expired ? '#fca5a5' : palette.textMuted }}>
                                                    <Clock size={11} />
                                                    {expiry.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1">
                                            {inv.status === 'pending' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleResend(inv._id)}
                                                    disabled={!!pendingAction}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/5 disabled:opacity-40"
                                                    style={{ color: palette.textMuted }}
                                                    aria-label="Resend invitation"
                                                    title="Resend invitation"
                                                >
                                                    {isResending ? <FiLoader size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                                                </button>
                                            )}

                                            {confirmId === inv._id ? (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(inv._id)}
                                                        disabled={!!pendingAction}
                                                        className="flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-semibold transition-colors disabled:opacity-50"
                                                        style={{ background: palette.danger, color: palette.textInverse }}
                                                    >
                                                        {isDeleting ? <FiLoader size={12} className="animate-spin" /> : 'Confirm'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmId(null)}
                                                        disabled={!!pendingAction}
                                                        className="flex h-7 items-center rounded-lg px-2 text-[11px] font-medium transition-colors hover:bg-white/5 disabled:opacity-50"
                                                        style={{ color: palette.textMuted }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmId(inv._id)}
                                                    disabled={!!pendingAction}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/5 disabled:opacity-40"
                                                    style={{ color: palette.danger }}
                                                    aria-label="Delete invitation"
                                                    title="Delete invitation"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-end px-5 py-3.5" style={{ borderTop: `1px solid ${palette.border}`, background: palette.surfaceRaised }}>
                    <button
                        onClick={handleClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                        style={{ color: palette.textSecondary }}
                    >
                        Close
                    </button>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default PendingInvitation