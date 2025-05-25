import { BookOpenCheck, Layout, Sparkles, Share2 } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "AI-Powered Creation",
    description: "Generate professional comics in seconds with our advanced AI model trained on thousands of comic styles."
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Multiple Style Options",
    description: "Choose from Manga, Realistic, Soccer, and more styles to match your story's unique vibe."
  },
  {
    icon: <BookOpenCheck className="h-10 w-10" />,
    title: "Flexible Panel Layout",
    description: "Select from preset panel layouts or create your own custom grid with up to 12 panels."
  },
  {
    icon: <Share2 className="h-10 w-10" />,
    title: "Easy Export & Sharing",
    description: "Download your comic as PNG or PDF, or share directly to social media with one click."
  }
];

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need to Create Amazing Comics
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to bring your comic ideas to life with AI-powered creativity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:shadow-md">
              <div className="text-primary">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}