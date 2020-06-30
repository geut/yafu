import React from 'react'

export default function Container({ className = '', children }) {
  return (
    <div className={`container ${className}`}>
      {children}
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: var(--spacing);
          width: 100%;
          max-width: calc(var(--spacing) * 84);
        }
      `}</style>
    </div>
  )
}