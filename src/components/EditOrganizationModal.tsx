import React, { useEffect, useRef, useState } from 'react'
import {
    FiX as X,
    FiImage as ImageIcon,
    FiUploadCloud as UploadCloud,
    FiTrash2 as Trash2,
    FiLoader,
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import Loader from './Loader'
import { RemoveOrganization, updateOrganization } from '../store/actions/organization.actions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
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
    primaryHover: '#4338ca',
    primaryGlow: 'rgba(79,70,229,0.35)',
    primarySoft: 'rgba(79,70,229,0.14)',
    danger: '#dc2626',
    dangerSoft: 'rgba(220,38,38,0.12)',
    textInverse: '#ffffff',
} as const

interface EditOrgData {
    name: string
    description: string
    logo: File | null
}

interface EditOrg {
    id: string,
    onClose: () => void
    onSave?: (data: EditOrgData) => void | Promise<void>
    name?: string
    description?: string
    /** A newly picked File, an existing logo URL string, or nothing yet. */
    logo?: File | string | null
    /** Existing logo URL, for orgs that already have a saved logo (separate from a newly picked File). */
    logoUrl?: string
}

const MAX_NAME_LEN = 60
const MAX_DESC_LEN = 200
const MAX_FILE_MB = 5

const EditOrganizationModal = ({ id, onClose, onSave, name = '', description = '', logo, logoUrl }: EditOrg) => {
    const initialLogoFile = logo instanceof File ? logo : null
    const initialLogoUrl = logoUrl ?? (typeof logo === 'string' ? logo : null)
    const [visible, setVisible] = useState(false)
    const [orgName, setOrgName] = useState(name)
    const [orgDescription, setOrgDescription] = useState(description)
    const [logoFile, setLogoFile] = useState<File | null>(initialLogoFile)
    const [preview, setPreview] = useState<string | null>(initialLogoUrl)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { loading } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(raf)
    }, [])

    useEffect(() => {
        if (!logoFile) return
        const url = URL.createObjectURL(logoFile)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [logoFile])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
        setVisible(false)
        setTimeout(onClose, 180)
    }

    const validateAndSetFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Logo must be an image file.')
            return
        }
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
            setError(`Logo must be under ${MAX_FILE_MB}MB.`)
            return
        }
        setError(null)
        setLogoFile(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) validateAndSetFile(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) validateAndSetFile(file)
    }

    const removeLogo = () => {
        setLogoFile(null)
        setPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }
    const { user } = useSelector((state : RootState) => state.auth);
    const role = user?.organization.find((f) => f.id === id)?.role;
    console.log(role);
    
    const canSave = orgName.trim().length > 0 && !isSubmitting
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const handleDelete = async() => {
        if(role !== "owner") return toast.warning("U don't have any rights to take this action")
        try {
            const response = await dispatch(RemoveOrganization(id));
            if(response?.success){
                toast.success(response?.message || "Organization deleted successfully");
                navigate('/',{ replace : true });
            }else{
                toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            toast.error("Unexpected error occured");
        }
    }
    const handleSave = async () => {
        if (!canSave) return
        if(role !== "owner") return toast.warning("U don't have any rights to take this action");
        setIsSubmitting(true)
        console.log(orgName, orgDescription, logoFile)
        try {
            const response = await dispatch(updateOrganization(id, orgName, orgDescription, logoFile));

            console.log("UPDATE RESPONSE:", response);
            console.log("UPDATED ORGANIZATION:", response?.organization);

            if (response?.success) {
                toast.success(response?.message || "organization updated successfully");
                   onClose();
            }
            else {
                toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occured");
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
                <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: `1px solid ${palette.border}` }}
                >
                    <div>
                        <h2 className="text-[15px] font-semibold" style={{ color: palette.text }}>
                            Edit organization
                        </h2>
                        <p className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                            Update how your organization appears to members
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

                <div className="flex flex-col gap-5 px-5 py-5">
                    <div className="flex items-center gap-4">
                        <div
                            onDragOver={(e) => {
                                e.preventDefault()
                                setIsDragging(true)
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border transition-colors"
                            style={{
                                background: palette.surfaceRaised,
                                borderColor: isDragging ? palette.primary : palette.border,
                                borderStyle: preview ? 'solid' : 'dashed',
                            }}
                        >
                            {preview ? (
                                <img src={preview} alt="Organization logo" className="h-full w-full object-cover" />
                            ) : (
                                <ImageIcon size={20} style={{ color: palette.textFaint }} />
                            )}
                        </div>

                        <div className="flex flex-1 flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/5"
                                    style={{ border: `1px solid ${palette.borderStrong}`, color: palette.textSecondary }}
                                >
                                    <UploadCloud size={13} />
                                    {preview ? 'Replace logo' : 'Upload logo'}
                                </button>
                                {preview && (
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-white/5"
                                        style={{ color: palette.danger }}
                                    >
                                        <Trash2 size={13} />
                                        Remove
                                    </button>
                                )}
                            </div>
                            <p className="text-[11px]" style={{ color: palette.textFaint }}>
                                PNG or JPG, up to {MAX_FILE_MB}MB. Drag &amp; drop onto the tile too.
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium" style={{ color: palette.textSecondary }}>
                            Organization name
                        </label>
                        <input
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value.slice(0, MAX_NAME_LEN))}
                            placeholder="e.g. Acme Robotics"
                            className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                            style={{
                                background: palette.surfaceRaised,
                                color: palette.text,
                                border: `1px solid ${palette.border}`,
                                ['--tw-ring-color' as string]: palette.primaryGlow,
                            }}
                        />
                        <div className="flex justify-end">
                            <span className="text-[10.5px]" style={{ color: palette.textFaint }}>
                                {orgName.length}/{MAX_NAME_LEN}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium" style={{ color: palette.textSecondary }}>
                            Description
                        </label>
                        <textarea
                            value={orgDescription}
                            onChange={(e) => setOrgDescription(e.target.value.slice(0, MAX_DESC_LEN))}
                            placeholder="What does this organization do?"
                            rows={3}
                            className="w-full resize-none rounded-lg px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                            style={{
                                background: palette.surfaceRaised,
                                color: palette.text,
                                border: `1px solid ${palette.border}`,
                                ['--tw-ring-color' as string]: palette.primaryGlow,
                            }}
                        />
                        <div className="flex justify-end">
                            <span className="text-[10.5px]" style={{ color: palette.textFaint }}>
                                {orgDescription.length}/{MAX_DESC_LEN}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div
                            className="rounded-lg px-3 py-2 text-xs"
                            style={{ background: palette.dangerSoft, color: '#fca5a5', border: '1px solid rgba(220,38,38,0.3)' }}
                        >
                            {error}
                        </div>
                    )}
                </div>

                <div
                    className="flex items-center justify-between gap-2 px-5 py-4"
                    style={{ borderTop: `1px solid ${palette.border}`, background: palette.surfaceRaised }}
                >
                    <div className="w-full">
                       <button
                        onClick={handleDelete}
                        disabled={!canSave}
                        className="flex items-center bg-background-itemsdark text-surface hover:bg-background-items cursor-pointer gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"

                    >
                        {loading && <FiLoader size={14} className="animate-spin" />}
                        {loading ? 'Deleting....' : 'Delete Organization'}
                    </button>
                    </div>
                    <div className="flex items-center gap-2 justify-end w-full">

                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="rounded-lg px-4 py-2 text-xs cursor-pointer font-medium transition-colors hover:bg-white/5 disabled:opacity-50"
                        style={{ color: palette.textSecondary }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!canSave}
                        className="flex items-center bg-[#46e55624] text-[#46e556] hover:text-surface hover:bg-[#46e556] cursor-pointer gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"

                    >
                        {isSubmitting && <FiLoader size={14} className="animate-spin" />}
                        {isSubmitting ? 'Saving…' : 'Save changes'}
                    </button>
                    </div>

                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default EditOrganizationModal