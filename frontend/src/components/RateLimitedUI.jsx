import React from 'react'
import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="card bg-base-100 shadow-xl border border-error/50 max-w-md w-full text-center">
        <div className="card-body items-center flex-col">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-4 shadow-sm">
            <ZapIcon className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="card-title text-2xl font-bold text-error mb-2">Whoa there, Speedster!</h2>
          <p className="text-base-content/70 mb-4">
            You've hit our rate limit. Please take a deep breath and try again in a little while.
          </p>
          <div className="text-xs text-base-content/50 font-mono bg-base-200 px-3 py-1 rounded-md">
            Error 429: Too Many Requests
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUI