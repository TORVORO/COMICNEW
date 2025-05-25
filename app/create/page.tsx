import { ComicCreator } from "@/components/comic-creator/comic-creator";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Your Comic</h1>
          <ComicCreator />
        </div>
      </main>
      <Footer />
    </div>
  );
}