'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Sample search data - replace with actual data from your backend
const SEARCH_DATA = [
  { id: 'p1', title: 'Foundation Building', type: 'pillar', url: '/pillars/1' },
  { id: 'p2', title: 'Market Research', type: 'pillar', url: '/pillars/2' },
  { id: 'f1', title: 'How long is each pillar?', type: 'faq', url: '/faq#duration' },
  { id: 'f2', title: 'Can I get a refund?', type: 'faq', url: '/faq#refund' },
  { id: 'r1', title: 'Content Creation Templates', type: 'resource', url: '/resources/content-templates' },
]

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof SEARCH_DATA>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.length > 1) {
      const filtered = SEARCH_DATA.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pillar': return '📚'
      case 'faq': return '❓'
      case 'resource': return '📑'
      default: return '🔍'
    }
  }

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-200"
      >
        <FiSearch className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-[#1E293B] rounded-xl shadow-lg border border-[#334155] overflow-hidden">
          <div className="p-4 flex items-center gap-2">
            <FiSearch className="w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search pillars, FAQs, resources..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent border-none text-[#E2E8F0] placeholder-[#94A3B8] focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#94A3B8] hover:text-[#E2E8F0]"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {results.length > 0 && (
            <div className="border-t border-[#334155] max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 hover:bg-[#334155] transition-colors duration-200"
                >
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <div>
                    <div className="text-[#E2E8F0]">{result.title}</div>
                    <div className="text-sm text-[#94A3B8] capitalize">
                      {result.type}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-4 text-center text-[#94A3B8]">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
