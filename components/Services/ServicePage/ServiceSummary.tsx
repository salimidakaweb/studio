import Reveal from "@/components/Ui/Reveal";

type ServiceSummaryData = {
  title: string;
  description: string;
};

type ServiceSummaryProps = {
  data: ServiceSummaryData;
};

export default function ServiceSummary({
  data,
}: ServiceSummaryProps) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal y={20} className="border-t border-black/10 pt-10 text-right">
          <h2 className="text-xl font-light leading-tight text-[#171512] sm:text-2xl">
            {data.title}
          </h2>

          <p className="mt-4 max-w-3xl text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
            {data.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}