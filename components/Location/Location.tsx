import Reveal from "../Ui/Reveal";


type LocationProps = {
  /** Text address used to build the Google Maps embed (no API key needed). */
  address?: string;
  /** Label shown on the small floating card over the map. */
  title?: string;
  /** Map height in px on desktop. Kept low on purpose; width is always 100%. */
  height?: number;
  /** Optional: direct link for the "open in Google Maps" button. Falls back to a search link. */
  mapsUrl?: string;
  className?: string;
};

// TODO: replace with the real studio address
const DEFAULT_ADDRESS = "Tehran, Valiasr Street";

export default function Location({
  address = DEFAULT_ADDRESS,
  title = "آتلیه بختیاری",
  height = 320,
  mapsUrl,
  className = "",
}: LocationProps) {
  const query = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${query}&hl=fa&z=15&output=embed`;
  const openUrl =
    mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <Reveal y={30} className={`relative w-full overflow-hidden bg-[#e9e5dc] ${className}`}>
      <iframe
        title="موقعیت آتلیه روی نقشه"
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block w-full border-0 grayscale-[0.35] transition-[filter] duration-500 hover:grayscale-0"
        style={{ height }}
      />

      {/* Floating info card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4 sm:justify-start sm:px-8 lg:px-12">
        <div className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-sm bg-white/90 px-4 py-3 text-right shadow-[0_15px_40px_-15px_rgba(20,18,15,0.35)] backdrop-blur-md">
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium text-white"
          >
            مسیریابی
            <span aria-hidden="true">←</span>
          </a>

          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#171512]">
              {title}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-black/45">
              {address}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}