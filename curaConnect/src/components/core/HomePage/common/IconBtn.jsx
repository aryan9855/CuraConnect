import React from 'react'

function IconBtn({
  text,
  onClick,
  children,
  disable,
  outline = false,
  customClasses = '',
  type = 'button',
}) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      type={type}
      className={`
        flex items-center gap-x-2 rounded-md px-4 py-2
        text-sm font-semibold transition-all duration-300
        ${
          outline
            ? 'border border-cyan-400/40 text-cyan-300 hover:bg-white/5'
            : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-400'
        }
        disabled:opacity-50 ${customClasses}
      `}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}

export default IconBtn
