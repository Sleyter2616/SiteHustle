'use client'

interface PageHeroProps {
  title: string
  subtitle: string
  className?: string
}

export default function PageHero({ title, subtitle, className = '' }: PageHeroProps) {
  return (
    <div className={`py-32 ${className}`}>
      <div className="container-custom text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">
          {title}
        </h1>
        <p className="text-xl text-[#94A3B8]">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
