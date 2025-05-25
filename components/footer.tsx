import Link from "next/link";
import { BookOpenText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <BookOpenText className="h-5 w-5" />
          <span className="font-semibold">Comic AI</span>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/create" className="transition-colors hover:text-primary">
            Create
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-primary">
            Gallery
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Comic AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}