import { motion } from 'framer-motion'

export default function DropText({ text, as: Tag = 'h3', className, style, delay = 0 }) {
  const chars = [...text]
  return (
    <Tag className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap' }}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -40, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.025,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: c === ' ' ? 'inline-block' : 'inline-block', width: c === ' ' ? '0.35em' : 'auto', whiteSpace: 'pre' }}
        >{c === ' ' ? '\u00A0' : c}</motion.span>
      ))}
    </Tag>
  )
}
