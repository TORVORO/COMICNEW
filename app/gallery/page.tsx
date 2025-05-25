import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Comic Gallery</h1>
            <Link href="/create">
              <Button>Create New Comic</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example placeholder for gallery items */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <p className="text-2xl text-muted-foreground/50">Coming Soon</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Sample Comic #{i + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    This is a placeholder for user-generated comics.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {false && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 text-muted-foreground/50">
                <BookOpenText className="h-16 w-16" />
              </div>
              <h2 className="text-xl font-medium mb-2">No comics yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first comic to see it here
              </p>
              <Link href="/create">
                <Button>Create Your First Comic</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}