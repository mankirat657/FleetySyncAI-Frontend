import React, { useRef, useState } from 'react'
import { FiX as X, FiUserPlus as UserPlus, FiLoader  , FiMail as Mail } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import Loader from './Loader'
import { sendInvites } from '../store/actions/invitation.actions'
import { toast } from 'react-toastify'

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
    successBorder: 'rgba(22,163,74,0.4)',
    danger: '#dc2626',
    dangerSoft: 'rgba(220,38,38,0.14)',
    dangerBorder: 'rgba(220,38,38,0.4)',
    textInverse: '#ffffff',
} as const

interface EmailChip {
    value: string
    valid: boolean
}

interface Invite {
    id: string
    onClose: () => void
    onInvite?: (emails: string[], role: string) => void | Promise<void>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const InviteMemberModal = ({ id, onClose, onInvite }: Invite) => {
    const [visible, setVisible] = useState(true)
    const [chips, setChips] = useState<EmailChip[]>([])
    const [inputValue, setInputValue] = useState('')
    const [role, setRole] = useState<'member' | 'admin'>('member')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { loading } = useSelector((state : RootState) => state.invite);
    const handleClose = () => {
        setVisible(false)
        setTimeout(onClose, 180)
    }

    const addChip = (raw: string) => {
        const value = raw.trim().replace(/,$/, '')
        if (!value) return
        const exists = chips.some((c) => c.value.toLowerCase() === value.toLowerCase())
        if (exists) return
        setChips((prev) => [...prev, { value, valid: EMAIL_RE.test(value) }])
    }

    const commitInput = () => {
        if (!inputValue.trim()) return
        addChip(inputValue)
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
            e.preventDefault()
            commitInput()
            return
        }
        if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
            setChips((prev) => prev.slice(0, -1))
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData('text')
        if (!text.includes(',') && !text.includes(' ') && !text.includes('\n')) return
        e.preventDefault()
        text
            .split(/[\s,]+/)
            .filter(Boolean)
            .forEach(addChip)
    }

    const removeChip = (value: string) => {
        setChips((prev) => prev.filter((c) => c.value !== value))
    }

    const validCount = chips.filter((c) => c.valid).length
    const invalidCount = chips.length - validCount
    const canSend = validCount > 0 && !isSubmitting
    const dispatch = useDispatch<AppDispatch>();
    const handleSend = async () => {
        commitInput()
        if (invalidCount > 0) {
            setError('Remove or fix the invalid email addresses before sending.')
            return
        }
        if (validCount === 0) {
            setError('Add at least one email address.')
            return
        }
        setError(null)
        setIsSubmitting(true)
        try {
            const emails = chips.filter((c) => c.valid).map((c) => c.value);
            const response = await dispatch(sendInvites(emails,id));
            if(response?.success){
                toast.success(response?.message || "invitation sended successfully");
                handleClose();
            }else{
                toast.error(response?.message || "Unexpected error occured");
                handleClose();
                setIsSubmitting(false)
            }
        } catch {
            toast.error('Something went wrong sending invites. Please try again.')
            setIsSubmitting(false)
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
                className="w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl transition-all duration-200"
                style={{
                    background: palette.panel,
                    borderColor: palette.border,
                    boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
                }}
            >
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <div>
                        <h2 className="text-[15px] font-semibold" style={{ color: palette.text }}>
                            Invite members
                        </h2>
                        <p className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                            Type an email and press Enter — you can add several at once
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
                <div className="flex flex-col gap-4 px-5 py-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium" style={{ color: palette.textSecondary }}>
                            Email addresses
                        </label>

                        <div
                            onClick={() => inputRef.current?.focus()}
                            className="flex min-h-[86px] w-full flex-wrap items-start gap-1.5 rounded-lg px-2.5 py-2.5 transition-shadow focus-within:ring-2"
                            style={{
                                background: palette.surfaceRaised,
                                border: `1px solid ${palette.border}`,
                                ['--tw-ring-color' as string]: palette.primaryGlow,
                            }}
                        >
                            {chips.map((chip) => (
                                <span
                                    key={chip.value}
                                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12.5px] font-medium"
                                    style={{
                                        background: chip.valid ? palette.successSoft : palette.dangerSoft,
                                        color: chip.valid ? '#86efac' : '#fca5a5',
                                        border: `1px solid ${chip.valid ? palette.successBorder : palette.dangerBorder}`,
                                    }}
                                >
                                    {chip.value}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeChip(chip.value)
                                        }}
                                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                                        aria-label={`Remove ${chip.value}`}
                                    >
                                        <X size={10} />
                                    </button>
                                </span>
                            ))}

                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onPaste={handlePaste}
                                onBlur={commitInput}
                                placeholder={chips.length === 0 ? 'name@company.com' : ''}
                                className="min-w-[140px] flex-1 bg-transparent py-1 text-[13px] outline-none"
                                style={{ color: palette.text }}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[11px]" style={{ color: palette.textFaint }}>
                                Press Enter, comma, or space to add
                            </span>
                            {chips.length > 0 && (
                                <span className="text-[11px]" style={{ color: invalidCount > 0 ? '#fca5a5' : palette.textFaint }}>
                                    {validCount} valid{invalidCount > 0 ? ` · ${invalidCount} invalid` : ''}
                                </span>
                            )}
                        </div>
                    </div>

                  
                    {error && (
                        <div
                            className="rounded-lg px-3 py-2 text-xs"
                            style={{ background: palette.dangerSoft, color: '#fca5a5', border: `1px solid ${palette.dangerBorder}` }}
                        >
                            {error}
                        </div>
                    )}
                </div>

                <div
                    className="flex items-center justify-end gap-2 px-5 py-4"
                    style={{ borderTop: `1px solid ${palette.border}`, background: palette.surfaceRaised }}
                >
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5 disabled:opacity-50"
                        style={{ color: palette.textSecondary }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!canSend}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 bg-background-itemsdark text-surface hover:bg-background-items cursor-pointer"
                        
                    >
                        {isSubmitting ? <FiLoader size={14} className="animate-spin" /> : <UserPlus size={14} />}
                        {isSubmitting ? 'Sending…' : `Send invite${validCount > 1 ? 's' : ''}`}
                    </button>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default InviteMemberModal