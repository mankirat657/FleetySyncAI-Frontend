'use client'

import { useState } from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword
  const hasMinLength = password.length >= 8

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle reset logic here
  }

  return (
    <div className="bg-background-items relative flex min-h-screen w-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
        
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background-items">
          <HiOutlineLockClosed className="h-8 w-8 text-text-inverse" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-2xl font-semibold text-text">
          Reset your password
        </h1>

        {/* Body copy */}
        <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
          Choose a new password for your account. Make it something you
          haven't used before.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* New password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 pr-11 text-sm text-text placeholder:text-input-placeholder transition-colors hover:border-border-hover focus:border-background-items focus:bg-input-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p
              className={`mt-1.5 flex items-center gap-1 text-xs ${
                hasMinLength ? 'text-success-text' : 'text-text-muted'
              }`}
            >
              {hasMinLength && <FiCheck className="h-3 w-3" />}
              At least 8 characters
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 pr-11 text-sm text-text placeholder:text-input-placeholder transition-colors hover:border-border-hover focus:border-background-items focus:bg-input-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1.5 text-xs text-danger-text">
                Passwords don't match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!hasMinLength || !passwordsMatch}
            className="mt-2 w-full rounded-xl bg-background-items px-4 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-background-itemsdark active:bg-background-itemsdark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:bg-text-disabled"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword