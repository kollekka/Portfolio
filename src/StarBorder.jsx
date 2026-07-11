export default function StarBorder({ children, className = '', as: Tag = 'span', color = '#a78bfa', speed = 4, thickness = 1, ...rest }) {
  return (
    <Tag
      className={`star-border ${className}`}
      style={{ '--sb-color': color, '--sb-speed': `${speed}s`, '--sb-thick': `${thickness}px` }}
      {...rest}
    >
      <span className="star-border-inner">{children}</span>
      <style>{`
        .star-border { position: relative; display: inline-flex; }
        .star-border-inner { position: relative; z-index: 1; display: inline-flex; align-items: center; }
        .star-border::before {
          content: ''; position: absolute; inset: 0;
          border-radius: inherit; padding: var(--sb-thick);
          background: conic-gradient(from var(--sb-angle, 0deg),
            transparent 0%, var(--sb-color) 10%, transparent 20%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: star-border-spin var(--sb-speed) linear infinite;
        }
        @keyframes star-border-spin {
          to { --sb-angle: 360deg; }
        }
        @property --sb-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
      `}</style>
    </Tag>
  )
}
