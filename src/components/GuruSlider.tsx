import { useRef } from 'react'

export type Guru = { name: string; role: string; photo: string }

export function GuruSlider({ guru }: { guru: Guru[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => scroll(-1)}
        className="absolute -left-3 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-2xl leading-none text-brand shadow transition hover:bg-soft md:grid"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => scroll(1)}
        className="absolute -right-3 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-2xl leading-none text-brand shadow transition hover:bg-soft md:grid"
      >
        ›
      </button>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {guru.map((g, i) => (
          <figure
            key={i}
            className="w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-soft">
              <img
                src={g.photo}
                alt={g.name}
                loading="lazy"
                onError={(e) => {
                  const fallback =
                    'https://' +
                    'ui-avatars.com/api/?name=' +
                    encodeURIComponent(g.name) +
                    '&background=0B5D3B&color=fff&size=256&bold=true'
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                }}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
            <figcaption className="p-3 text-center">
              <b className="block text-sm leading-snug text-ink">{g.name}</b>
              <span className="text-xs text-muted">{g.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
