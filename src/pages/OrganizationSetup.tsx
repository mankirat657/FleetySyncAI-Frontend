import { FiPlus, FiArrowRight, FiUsers, FiClock } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Logo } from '../assets'

const OrganizationSetup = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const organizations = Array.isArray(user?.organization) ? user.organization : []

  const totalMembers = organizations.reduce(
    (sum: number, org: any) => sum + (org.membersCount ?? 0),
    0
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 py-12">
      
     <div className="blur-[880rem] pointer-events-none w-[25vh] h-[25vh] bg-background-items absolute"></div>
     <div className="blur-[880rem] pointer-events-none w-[25vh] h-[25vh] top-0 right-0 bg-background-items absolute"></div>

      <div className="relative mx-auto w-full max-w-xl">
        
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-xs font-medium text-text-secondary">
            Workspace access
          </span>
        </div>

        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-background-items shadow-sm">
          <img src={Logo} className="h-7 w-7" alt="Logo" />
        </div>

        <h1 className="mt-6 text-center text-4xl font-semibold text-text">
          Welcome <span className='cursiveFont text-background-items'>back</span>
        </h1>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Create a new organization or continue with one you're already a
          part of.
        </p>

        {organizations.length > 0 && (
          <div className="mt-7 grid grid-cols-3 divide-x divide-border gap-3 rounded-2xl border border-border bg-surface py-4 shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-semibold text-text">{organizations.length}</p>
              <p className="mt-0.5 text-xs text-text-muted">
                {organizations.length === 1 ? 'Organization' : 'Organizations'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-text">{totalMembers}</p>
              <p className="mt-0.5 text-xs text-text-muted">Total members</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-text">{user?.email?.split('@')[0]}</p>
              <p className="mt-0.5 text-xs text-text-muted">Signed in as</p>
            </div>
          </div>
        )}

        <button
          type="button"
          className="group mt-6 flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition-all hover:border-background-items hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background-items transition-transform duration-200 group-hover:rotate-90">
            <FiPlus className="h-5 w-5 text-text-inverse" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-text">
              Create a new organization
            </p>
            <p className="mt-0.2 text-xs text-text-muted">
              Set up a fresh workspace for your team
            </p>
          </div>
          <FiArrowRight className="h-4 w-4 shrink-0 text-text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-background-items" />
        </button>

        {/* Terms */}
        <p className="mt-4 text-center text-xs leading-relaxed text-text-subtle">
          By continuing, you agree to our{' '}
          <a href="#" className="text-text-secondary underline underline-offset-2 hover:text-text">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-text-secondary underline underline-offset-2 hover:text-text">
            Privacy Policy
          </a>
          .
        </p>

        <div className="mt-8s flex items-center gap-3">
          <div className="h-px flex-1 bg-divider" />
          <span className="text-xs font-medium tracking-wider text-text-muted">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-divider" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center text-text-inverse rounded-full text-sm bg-green-500">{organizations.length || "0"}</div>
          <p className="text-sm font-medium text-text">Your organizations</p>
          </div>
          <p className="text-xs text-text-muted">{user?.email}</p>
        </div>

        {organizations.length > 0 ? (
          <div className="mt-3 divide-y divide-divider overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            {organizations.map((org: any) => (
              <button
                key={org?.id}
                type="button"
                className="group relative flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset"
              >
                <span className="absolute inset-y-0 left-0 w-1 -translate-x-1 bg-background-items transition-transform duration-200 group-hover:translate-x-0" />

                <div className="relative shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl  border border-border-active text-sm font-semibold text-text-inverse">
                    <img src={org?.avatar} className="h-full w-full rounded-full object-cover" alt="" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-success" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-lg font-semibold text-text">
                      {org.name}
                    </p>
                    {org.role && (
                      <span className="shrink-0 rounded-full bg-background-input px-2 py-0.5 text-[10px] font-medium text-background-itemsdark">
                        {org.role}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {org.memberAvatars?.slice(0, 4).map((avatarUrl: string, i: number) => (
                        <div
                          key={i}
                          className="h-5 w-5  overflow-hidden rounded-full border border-border-active"
                        >
                          <img src={avatarUrl} className="h-full w-full rounded-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <FiUsers className="h-3 w-3" />
                      {org.membersCount} member's
                    </span>
                    <span className="text-xs text-text-subtle">•</span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <FiClock className="h-3 w-3" />
                      {org.lastLogin} last Signed In
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-background-items">
                  <FiArrowRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-text-inverse" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-text">No organizations yet</p>
            <p className="mt-1 text-sm text-text-muted">
              Create one above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrganizationSetup