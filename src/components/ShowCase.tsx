import React from 'react';

const ShowCase = () => {
  return (
    <div className="hidden lg:block lg:w-[54%] relative overflow-hidden bg-background-items">
     
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="blob-1 absolute top-[15%] left-[12%] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="blob-2 absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-[45%] left-[45%] w-96 h-96 rounded-full bg-background-itemsdark/30 blur-3xl" />

      <div className="relative h-full flex items-center justify-center p-12">
        <div className="grid grid-cols-2 gap-5 max-w-lg w-full">
          <div className="card-main relative col-span-2 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-white/40 rounded-3xl p-7 overflow-hidden group hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)] transition-shadow duration-500">
            <div className="shine-sweep absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div className="relative flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-background-items blur-md opacity-50" />
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-background-items to-background-itemsdark ring-1 ring-white/40">
                  <span className="text-white text-2xl font-bold tracking-tight">AI</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-text tracking-tight">OrgSync AI</h2>
                <p className="text-sm text-text-muted">Smart organization management</p>
              </div>
            </div>

            <div className="relative flex gap-1.5 mt-4">
              <div className="w-2 h-2 rounded-full animate-pulse bg-background-items" />
              <div className="w-2 h-2 rounded-full animate-pulse delay-100 bg-background-items/60" />
              <div className="w-2 h-2 rounded-full animate-pulse delay-200 bg-background-items" />
            </div>
          </div>

          <div className="card-a bg-white/90 backdrop-blur-sm shadow-[0_15px_40px_-12px_rgba(0,0,0,0.3)] border border-white/40 rounded-3xl p-6 hover:scale-[1.03] hover:rotate-1 transition-all duration-500">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-2xl bg-success blur-md opacity-40" />
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-success to-success-hover ring-1 ring-white/40">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-text">Quick start</h3>
            <p className="text-xs mt-1 text-text-muted">AI-powered org setup</p>
            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full font-semibold bg-success/10 text-success-text ring-1 ring-success/20">
              New
            </span>
          </div>

          <div className="card-b bg-white/90 backdrop-blur-sm shadow-[0_15px_40px_-12px_rgba(0,0,0,0.3)] border border-white/40 rounded-3xl p-6 hover:scale-[1.03] hover:-rotate-1 transition-all duration-500">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-2xl bg-info blur-md opacity-40" />
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-info to-info-hover ring-1 ring-white/40">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-text">Tasks</h3>
            <p className="text-xs mt-1 text-text-muted">AI task breakdowns</p>
            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full font-semibold bg-info/10 text-info-text ring-1 ring-info/20">
              Live
            </span>
          </div>
        </div>

        <div className="absolute top-[12%] left-[8%] animate-[float_5s_ease-in-out_infinite]">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl px-4 py-2 border border-white/40 ring-1 ring-black/5">
            <span className="text-sm font-medium flex items-center gap-2 text-text-secondary">
              <span className="w-2 h-2 rounded-full animate-ping bg-success" />
              AI powered
            </span>
          </div>
        </div>

        <div className="absolute bottom-[10%] right-[8%] animate-[floatSlow_6s_ease-in-out_infinite]">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl px-4 py-2 border border-white/40 ring-1 ring-black/5">
            <span className="text-sm font-medium flex items-center gap-2 text-text-secondary">
              ⚡ Smart system
            </span>
          </div>
        </div>

        <div className="absolute top-[8%] right-[6%] bg-gradient-to-r from-background-items to-background-itemsdark rounded-full px-4 py-1.5 border border-white/40 shadow-lg">
          <span className="text-xs font-medium text-white tracking-wide">✦ v1.0 ✦</span>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;