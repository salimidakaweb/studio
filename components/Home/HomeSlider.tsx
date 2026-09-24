import HomeSliderClient from "./HomeSliderClient";
import type { HomeData } from "@/data/home";

export default function HomeSlider({
  data,
}: {
  data: HomeData["slider"];
}) {
  return (
    <section
      aria-label="اسلایدر"
      className="relative bg-[#f5f2ec]"
    >
      <h1 className="sr-only">
        {data.title}
      </h1>

      <p className="sr-only">
        {data.subtitle}
      </p>

      <HomeSliderClient
        slides={data.slides.map(
          (slide) => ({
            image: slide.image,
            alt: slide.alt,
          })
        )}
        labels={data.slides.map(
          (slide) =>
            slide.caption
        )}
      />
    </section>
  );
}