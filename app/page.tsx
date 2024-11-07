import { HeartIcon} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 md:p-24 max-w-5xl mx-auto">
      <div className="flex flex-col gap-12">
        <Image 
          src="/matthias.jpg"
          alt="Portrait"
          width={128}
          height={128}
          className="rounded-full"
        />
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, i&apos;m Matthias.<br />
            I build apps for the web.
          </h1>
          
          <div className="space-y-4 text-lg text-neutral-600 font-medium">
            <p>
              Building simple and beautiful things for complex interfaces is what I enjoy most about my work.
            </p>
            <p>
              I am also interested in crafting beautiful minimal products and exploring new worlds.
            </p>
            <p>
              I am sometimes <a href="https://twitter.com" className="underline hover:text-black transition-colors">tweeting</a>, 
              taking <a href="#" className="underline hover:text-black transition-colors">photos</a> and 
              writing <a href="https://github.com" className="underline hover:bg-black hover:text-white transition-colors">code</a> which i store on GitHub.
            </p>
          </div>

          <div className="pt-4">
            <p>Write me a mail, i love getting these <HeartIcon className="inline-flex size-4 text-red-500" /></p> 
            <a href="mailto:hi@matthias.lol" className="underline hover:text-black transition-colors">
              hi@matthias.lol
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
