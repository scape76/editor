import { Sample } from "./_components/sample";
import { ShortcutsHandbook } from "./_components/shortcuts-handbook";

export default function Home() {
  return (
    <main className="flex container max-w-3xl flex-col items-center justify-between pt-6">
      <Sample />
      <ShortcutsHandbook />
    </main>
  );
}
