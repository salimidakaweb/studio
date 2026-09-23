import Reveal from "@/components/Ui/Reveal";
import HoverCard from "@/components/Ui/Hovercard";

type AddOnItem = {
  title: string;
  description: string;
  icon: "video" | "cake" | "calendar";
};

type ServiceAddOnsData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  items: AddOnItem[];
};

type ServiceAddOnsProps = {
  data: ServiceAddOnsData;
};

function AddOnIcon({ type }: { type: AddOnItem["icon"] }) {
  if (type === "video") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="m22 8-5 4 5 4V8Z" />
      </svg>
    );
  }

  if (type === "cake") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16h16" />
        <path d="M12 3c-1 1.5-1 2.5 0 4 1-1.5 1-2.5 0-4Z" />
        <path d="M4 21h16" />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

export default function ServiceAddOns({ data }: ServiceAddOnsProps) {
  return (
    <section className="bg-[#171512] py-14 text-white lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal y={20} className="mb-9 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-light)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {data.eyebrow}
          </span>

          <h2 className="mt-3 text-2xl font-light leading-tight sm:text-3xl lg:text-4xl">
            {data.title}
            <span className="font-medium"> {data.titleAccent}</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal
              key={item.title}
              y={24}
              delay={index * 0.1}
              className="h-full"
            >
              <HoverCard className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-right">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary-light)]">
                  <AddOnIcon type={item.icon} />
                </div>

                <h3 className="mt-5 text-base font-medium leading-6 text-white sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-white/50">
                  {item.description}
                </p>
              </HoverCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}