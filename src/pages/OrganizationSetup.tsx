import { FiPlus, FiArrowRight, FiUsers, FiClock } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Logo } from '../assets'
import { Link } from 'react-router-dom'

const OrganizationSetup = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const organizations = Array.isArray(user?.organization) ? user.organization : []
  console.log(user);
  
  const totalMembers = organizations.reduce(
    (sum: number, org: any) => sum + (org.membersCount ?? 0),
    0
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d] px-3 sm:px-4 py-8 sm:py-12">
      
      {/* Decorative glows */}
      <div className="blur-[880rem] pointer-events-none w-[15vh] sm:w-[20vh] md:w-[25vh] h-[15vh] sm:h-[20vh] md:h-[25vh] bg-red-500/20 absolute"></div>
      <div className="blur-[880rem] pointer-events-none w-[15vh] sm:w-[20vh] md:w-[25vh] h-[15vh] sm:h-[20vh] md:h-[25vh] top-0 right-0 bg-red-500/20 absolute"></div>
      <div className="absolute -top-40 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-xl px-2 sm:px-0">
        
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium text-red-400">
            Workspace access
          </span>
        </div>

        <div className="mx-auto mt-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
          <img src={Logo} className="h-6 w-6 sm:h-7 sm:w-7 filter brightness-0 invert" alt="Logo" />
        </div>

        <h1 className="mt-6 text-center text-3xl sm:text-4xl font-semibold text-white">
          Welcome <span className='cursiveFont bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent'>back</span>
        </h1>
        <p className="mt-2 text-center text-sm text-white/50">
          Create a new organization or continue with one you're already a
          part of.
        </p>

        {organizations.length > 0 && (
          <div className="mt-7 grid grid-cols-3 divide-x divide-white/10 gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm py-4 shadow-lg shadow-red-500/5">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-semibold text-white">{organizations.length}</p>
              <p className="mt-0.5 text-xs text-white/40">
                {organizations.length === 1 ? 'Organization' : 'Organizations'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-semibold text-white">{totalMembers}</p>
              <p className="mt-0.5 text-xs text-white/40">Total members</p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-semibold text-white truncate px-1">{user?.email?.split('@')[0]}</p>
              <p className="mt-0.5 text-xs text-white/40">Signed in as</p>
            </div>
          </div>
        )}

        <Link
          to={"/organization-details"}
          className="group mt-6 flex w-full items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-left shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:shadow-lg hover:shadow-red-500/5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 transition-transform duration-200 group-hover:rotate-90 shadow-lg shadow-red-500/30">
            <FiPlus className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-base sm:text-lg font-semibold text-white">
              Create a new organization
            </p>
            <p className="mt-0.5 text-xs text-white/40">
              Set up a fresh workspace for your team
            </p>
          </div>
          <FiArrowRight className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-red-400" />
        </Link>

        {/* Terms */}
        <p className="mt-4 text-center text-xs leading-relaxed text-white/30">
          By continuing, you agree to our{' '}
          <a href="#" className="text-white/50 underline underline-offset-2 hover:text-red-400 transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-white/50 underline underline-offset-2 hover:text-red-400 transition-colors">
            Privacy Policy
          </a>
          .
        </p>

        <div className="mt-6 sm:mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          <span className="text-[10px] sm:text-xs font-medium tracking-wider text-white/30">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center text-white rounded-full text-xs sm:text-sm bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
              {organizations.length || "0"}
            </div>
            <p className="text-sm font-medium text-white">Your organizations</p>
          </div>
          <p className="text-xs text-white/40 truncate">{user?.email}</p>
        </div>

        {organizations.length > 0 ? (
          <div className="mt-3 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-red-500/5">
            {organizations.map((org: any) => (
              <button
                key={org?.id}
                type="button"
                className="group relative flex w-full items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left transition-colors hover:bg-red-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
              >
                <span className="absolute inset-y-0 left-0 w-1 -translate-x-1 bg-gradient-to-b from-red-500 to-red-600 transition-transform duration-200 group-hover:translate-x-0" />

                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 text-sm font-semibold text-white">
                    <img src={org?.avatar} className="h-full w-full object-cover" alt="" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b0b0d] bg-green-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-base sm:text-lg font-semibold text-white">
                      {org.name}
                    </p>
                    {org.role && (
                      <span className="shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400 border border-red-500/20">
                        {org.role}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {org.memberAvatars?.slice(0, 4).map((avatarUrl: string, i: number) => (
                        <div
                          key={i}
                          className="h-5 w-5 overflow-hidden rounded-full border border-white/20"
                        >
                          <img src={avatarUrl} className="h-full w-full object-cover" alt="" />
                        </div>
                      ))}
                      {org.memberAvatars?.length > 4 && (
                        <div className="h-5 w-5 rounded-full bg-red-500/20 border border-white/20 flex items-center justify-center text-[8px] text-white font-bold">
                          +{org.memberAvatars.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <FiUsers className="h-3 w-3" />
                      {org.membersCount} member's
                    </span>
                    <span className="text-xs text-white/20 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-xs text-white/40 hidden sm:flex">
                      <FiClock className="h-3 w-3" />
                      {org.lastLogin}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-red-600 group-hover:shadow-lg group-hover:shadow-red-500/30">
                  <FiArrowRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-col items-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-8 sm:py-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-white">No organizations yet</p>
            <p className="mt-1 text-sm text-white/40">
              Create one above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrganizationSetup