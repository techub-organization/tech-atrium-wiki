import { loadHomePageData } from "../lib/api/data-source";
import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { HeroSection } from "@/app/components/home/HeroSection";
import { StackSourceGrid } from "@/app/components/home/StackSourceGrid";
import { PolicySection } from "@/app/components/home/PolicySection";

export default async function HomePage() {
  const data = await loadHomePageData();
  const apiSource = process.env.TECHRIUM_FRONT_PAGE_API ? "api-ready" : "mock-mode";

  return (
    <main className="pt-8 pb-16">
      <Container>
        <Section spacing="section">
          <HeroSection hero={data.hero} apiSource={apiSource} />
        </Section>

        <Section spacing="section">
          <StackSourceGrid sources={data.sources} />
        </Section>
      </Container>

      <Section spacing="section">
        <Container>
          <PolicySection highlights={data.highlights} />
        </Container>
      </Section>
    </main>
  );
}
