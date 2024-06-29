import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="w-full bg-background border-b">
      <div className="container flex h-16 max-w-3xl items-center justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <div className="flex flex-col space-y-1 text-sm leading-none">
            <span className="text-lg font-bold">Editor</span>
          </div>
          <span className="sr-only">Home</span>
        </Link>
        <nav className="flex items-center space-x-1">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
