import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-image bg-cover bg-center min-h-dvh flex items-center justify-center">
      
        <div className="bg-black/80 p-14 rounded-2xl shadow-2xl border border-white/10">
          <main className="flex flex-col items-center gap-6">
            <h1 className="text-5xl font-semibold text-white">
              Repair Shop
            </h1>
            <p className="text-gray-200 text-xl">
              Opens: 9AM to 5PM
            </p>
            <Link href="/home">
              <Button className="w-32 h-12 text-lg mt-4 bg-white/10 hover:bg-white/20 text-white transition-all duration-300">
                Enter
              </Button>
            </Link>
          </main>
        </div>
    </div>
  );
}