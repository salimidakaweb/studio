import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Plans from "@/components/Plans/Plans";
import Booking from "@/components/Booking/Booking";
import Blog from "@/components/Blog/Blog";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Services />
        <About />
        <Portfolio />
        <Plans />
        <Booking />
        <Blog />
      </main>
      <Footer />
    </>
  );
}