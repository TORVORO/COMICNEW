import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { Features } from "@/components/features";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to create your comic?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Jump into our comic creator and bring your stories to life with AI.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/create">
                  <Button size="lg" className="h-12 px-8">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}