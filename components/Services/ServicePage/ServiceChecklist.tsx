import Reveal from "@/components/Ui/Reveal";

type ChecklistItem = {
  title: string;
  description: string;
};

type ServiceChecklistData = {
  intro: string;
  items: ChecklistItem[];
};

type ServiceChecklistProps = {
  data: ServiceChecklistData;
};

export default function ServiceChecklist({
  data,
}: ServiceChecklistProps) {
  return (
    <section className="bg-[#f5f2ec] py-14 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal y={20} className="mb-4 max-w-2xl text-right lg:mr-auto">
          <p className="text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
            {data.intro}
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.items.map((item, index) => (
            <Reveal key={item.title} y={20} delay={index * 0.08}>
              <li className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 text-right">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/12 text-[var(--primary-dark)]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>

                <div>
                  <h3 className="text-sm font-medium text-[#171512] sm:text-[15px]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[12.5px] leading-6 text-black/55 sm:text-[13px] sm:leading-7">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}