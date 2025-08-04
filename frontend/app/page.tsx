import BannerComponent from "@/components/layout/public/Banner.component";
import HeaderComponent from "@/components/layout/public/Header.component";
import FeaturesComponent from "@/components/layout/public/Feature.component";
import CounterComponent from "@/components/layout/public/Counter.component";
import CtaComponent from "@/components/layout/public/Cta.component";
import FooterComponent from "@/components/layout/public/Footer.component";

export default function Home() {
  return (
    <main>
      <HeaderComponent />
      <BannerComponent />
      <FeaturesComponent />
      {/* <CounterComponent /> */}
      <CtaComponent />
      <FooterComponent />
    </main>
  );
}
