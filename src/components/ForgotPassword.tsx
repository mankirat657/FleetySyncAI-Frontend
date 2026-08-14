import { useState, type FormEvent } from 'react'
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import type { EmailSendProps } from '../types/interfaces'

const ForgotPassword = ({ setEmailShow }: EmailSendProps) => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidEmail) return
    // trigger reset email here
    setSent(true)
  }

  return (
    <div className="fixed inset-0 flex min-h-screen w-full items-center justify-center bg-black/20 px-4 py-10">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
        
        {/* Close */}
        <div
          className="absolute top-3 right-3 cursor-pointer rounded-full p-2 transition-all ease-linear hover:bg-background-items hover:text-text-inverse"
          onClick={() => setEmailShow(false)}
        >
          <IoClose className="h-5 w-auto" />
        </div>

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background-items">
          <HiOutlineEnvelopeOpen className="h-8 w-8 text-text-inverse" />
        </div>

        {sent ? (
          <>
            {/* Confirmation state */}
            <h1 className="mt-6 text-center text-2xl font-semibold text-text">
              Check your inbox
            </h1>
            <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
              We've sent a password reset link to{' '}
              <span className="font-medium text-text">{email}</span>. Open
              it to choose a new password.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-border bg-background-secondary px-4 py-3 text-center text-sm text-text-muted">
              <FiCheck className="h-4 w-4 shrink-0 text-success-text" />
              Didn't get it? Check your spam or promotions folder.
            </div>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-surface-hover active:bg-surface-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Use a different email
            </button>
          </>
        ) : (
          <>
            {/* Request state */}
            <h1 className="mt-6 text-center text-2xl font-semibold text-text">
              Forgot your password?
            </h1>
            <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
              Enter the email linked to your account and we'll send you a
              link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-text placeholder:text-input-placeholder transition-colors hover:border-border-hover focus:border-background-items focus:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-background-input"
              />

              <button
                type="submit"
                disabled={!isValidEmail}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-background-items px-4 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-background-itemsdark active:bg-background-itemsdark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:bg-text-disabled"
              >
                Send reset link
              </button>
            </form>

            <button
              type="button"
              onClick={() => setEmailShow(false)}
              className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-secondary"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword