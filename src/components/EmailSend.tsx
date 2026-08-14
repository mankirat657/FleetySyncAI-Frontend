import { FiMail, FiRefreshCw } from "react-icons/fi"
import type { EmailSendProps } from "../types/interfaces"
import { HiOutlineEnvelopeOpen } from "react-icons/hi2"
import { IoClose } from "react-icons/io5"
const EmailSend = ({ setEmailShow } : EmailSendProps) => {
  return (
    <div className="inset-0 bg-black/20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex min-h-screen w-full items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface relative p-8 shadow-sm sm:p-10">
         <div className="absolute top-3 right-3 hover:bg-background-items hover:text-text-inverse rounded-full p-2 transition-all ease-linear cursor-pointer" onClick={() => setEmailShow(false)}>
            <IoClose className="w-5 h-auto" />
        </div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background-items">
          <HiOutlineEnvelopeOpen className="h-8 w-8 text-text-inverse" />
        </div>
        <h1 className="mt-6 text-center text-2xl font-semibold text-text">
          Verify your email
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
          We've sent a verification link to your email address. Open your
          inbox and click the link in that email to verify your account.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-border bg-background-secondary px-4 py-3 text-center text-sm text-text-muted">
          <FiMail className="h-4 w-4 shrink-0 text-background-itemsdark" />
          This page will update automatically once you click the link
        </div>
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-background-items px-4 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-background-itemsdark active:bg-background-itemsdark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <FiRefreshCw className="h-4 w-4" />
          Resend verification email
        </button>
        <p className="mt-4 text-center text-xs text-text-subtle">
          Didn't get it? Check your spam or promotions folder.
        </p>
      </div>
    </div>
  )
}

export default EmailSend