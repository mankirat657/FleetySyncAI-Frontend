import React from 'react';

const ShowCase = () => {
  return (
    <div className="hidden lg:block lg:w-[54%] relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Glow effects */}
      <div className="blob-1 absolute top-[15%] left-[12%] w-72 h-72 rounded-full bg-white/20 blur-3xl animate-pulse" />
      <div className="blob-2 absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-white/20 blur-3xl animate-pulse delay-500" />
      <div className="absolute top-[45%] left-[45%] w-96 h-96 rounded-full bg-black/30 blur-3xl" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white/20 rounded-full animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[60%] left-[80%] w-3 h-3 bg-white/10 rounded-full animate-[float_10s_ease-in-out_infinite_delay-1s]" />
        <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-white/15 rounded-full animate-[float_6s_ease-in-out_infinite_delay-2s]" />
        <div className="absolute top-[70%] left-[20%] w-2.5 h-2.5 bg-white/10 rounded-full animate-[float_9s_ease-in-out_infinite_delay-0.5s]" />
      </div>

      <div className="relative h-full flex items-center justify-center p-8 lg:p-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-lg w-full">
          {/* Main Card */}
          <div className="card-main relative col-span-2 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/40 rounded-3xl p-6 sm:p-7 overflow-hidden group hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.02]">
            <div className="shine-sweep absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none group-hover:left-[150%] transition-all duration-1000" />

            <div className="relative flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-red-500 blur-md opacity-50" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-red-500 to-red-600 ring-1 ring-white/40">
                  <span className="text-white text-xl sm:text-2xl font-bold tracking-tight">AI</span>
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">OrgSync AI</h2>
                <p className="text-xs sm:text-sm text-gray-600">Smart organization management</p>
              </div>
            </div>

            <div className="relative flex gap-1.5 mt-4">
              <div className="w-2 h-2 rounded-full animate-pulse bg-red-500" />
              <div className="w-2 h-2 rounded-full animate-pulse delay-100 bg-red-400/60" />
              <div className="w-2 h-2 rounded-full animate-pulse delay-200 bg-red-500" />
            </div>

            {/* Stats bar */}
            <div className="relative mt-4 flex items-center justify-between gap-2 pt-3 border-t border-gray-100/50">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Active</span>
                <span className="text-xs font-bold text-gray-900">24/7</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Users</span>
                <span className="text-xs font-bold text-gray-900">10K+</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Tasks</span>
                <span className="text-xs font-bold text-gray-900">50M+</span>
              </div>
            </div>
          </div>

          {/* Card A */}
          <div className="card-a bg-white/90 backdrop-blur-sm shadow-[0_15px_40px_-12px_rgba(0,0,0,0.35)] border border-white/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:scale-[1.05] hover:rotate-1 transition-all duration-500 hover:shadow-xl">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4">
              <div className="absolute inset-0 rounded-2xl bg-green-500 blur-md opacity-40" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-green-400 to-green-500 ring-1 ring-white/40">
                <span className="text-xl sm:text-2xl">🚀</span>
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Quick start</h3>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-600">AI-powered org setup</p>
            <span className="inline-block mt-2 sm:mt-3 text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold bg-green-100 text-green-700 ring-1 ring-green-200">
              New
            </span>
          </div>

          {/* Card B */}
          <div className="card-b bg-white/90 backdrop-blur-sm shadow-[0_15px_40px_-12px_rgba(0,0,0,0.35)] border border-white/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:scale-[1.05] hover:-rotate-1 transition-all duration-500 hover:shadow-xl">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4">
              <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-md opacity-40" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-400 to-blue-500 ring-1 ring-white/40">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Tasks</h3>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-600">AI task breakdowns</p>
            <span className="inline-block mt-2 sm:mt-3 text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold bg-blue-100 text-blue-700 ring-1 ring-blue-200">
              Live
            </span>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute top-[10%] left-[6%] animate-[float_5s_ease-in-out_infinite]">
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 border border-white/60 ring-1 ring-black/5 hover:scale-105 transition-transform duration-300">
            <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 text-gray-700">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-ping bg-green-500" />
              AI powered
            </span>
          </div>
        </div>

        <div className="absolute bottom-[8%] right-[6%] animate-[floatSlow_6s_ease-in-out_infinite]">
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 border border-white/60 ring-1 ring-black/5 hover:scale-105 transition-transform duration-300">
            <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 text-gray-700">
              ⚡ Smart system
            </span>
          </div>
        </div>

        <div className="absolute top-[6%] right-[5%] bg-gradient-to-r from-red-500 to-red-600 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border border-white/40 shadow-lg hover:scale-105 transition-transform duration-300">
          <span className="text-[10px] sm:text-xs font-medium text-white tracking-wide">✦ v2.0 ✦</span>
        </div>

        <div className="absolute bottom-[15%] left-[5%] animate-[float_7s_ease-in-out_infinite_delay-1s]">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm shadow-lg rounded-full px-3 py-1.5 border border-white/60">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-500"></div>
              <div className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-500"></div>
              <div className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-500"></div>
            </div>
            <span className="text-[10px] font-medium text-gray-700 ml-1">+12 teams</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;