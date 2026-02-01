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
        flex items-center gap-x-2
        rounded-md px-4 py-2
        text-sm font-semibold
        transition-all duration-300
        ${
          outline
            ? `
              border border-blue-400/40
              text-blue-300
              hover:bg-blue-500/10
              hover:text-blue-400
            `
            : `
              bg-gradient-to-r from-cyan-400 to-blue-500
              text-white
              hover:from-blue-500 hover:to-cyan-400
              shadow-[0_0_20px_rgba(34,211,238,0.35)]
            `
        }
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${customClasses}
      `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default IconBtn
