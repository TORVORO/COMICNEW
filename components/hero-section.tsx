import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Amazing Comics with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Turn your ideas into stunning visual stories in seconds. Choose your style, set your panels, and watch your story come to life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/create">
                <Button size="lg" className="h-12 px-8">Start Creating</Button>
              </Link>
              <Link href="/gallery">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8"
                >
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className={cn(
              "w-full max-w-[400px] aspect-[4/3]",
              "bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20",
              "rounded-lg border border-border shadow-xl",
              "flex items-center justify-center",
              "overflow-hidden"
            )}>
              <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card rounded shadow-sm aspect-square flex items-center justify-center">
                    <div className="text-4xl font-bold text-muted-foreground/30">{i}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}