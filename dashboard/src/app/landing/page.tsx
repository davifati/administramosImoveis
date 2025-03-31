import { SaasSloganHighlight } from "@/app/landing/_components/TitleHighlight";
import { Container } from "./_components/Container";
import { Footer } from "./_components/Footer";
import { FeatureSection } from "./_components/Features";
import { Banner } from "./_components/BannerCTA";




export default function Home() {
    return (
        <Container>

            < SaasSloganHighlight />
            < FeatureSection />
            < Banner />
            < Footer />

        </Container>
    );
}
