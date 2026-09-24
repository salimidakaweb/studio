import ServiceHero from "./ServiceHero";
import ServiceTheme from "./ServiceTheme";
import ServiceAddOns from "./ServiceAddOns";
import ServiceChecklist from "./ServiceChecklist";
import ServiceOutdoor from "./ServiceOutdoor";
import ServiceWorks from "./ServiceWorks";
import ServiceSummary from "./ServiceSummary";
import ServiceArticles from "./ServiceArticles";
import type { ServiceData } from "@/data/services";

type ServicePageProps = {
  service: ServiceData;
};

export default function ServicePage({
  service,
}: ServicePageProps) {
  return (
    <main>
      <ServiceHero data={service.hero} category={service.category} />
      <ServiceTheme data={service.theme} />
      <ServiceAddOns data={service.addOns} />
      <ServiceChecklist data={service.checklist} />
      <ServiceOutdoor
        data={service.outdoor}
        bookingHref={`/${service.category ?? "kids"}#booking`}
      />
      <ServiceWorks data={service.works} />
      <ServiceSummary data={service.summary} />
      <ServiceArticles data={service.articles} />
    </main>
  );
}