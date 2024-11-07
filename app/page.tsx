"use client"

import { ArrowRight, Camera, CodeSquare, HeartIcon, Twitter } from "lucide-react";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar"; 
import WordRotate from "@/components/ui/word-rotate"; 
import DotPattern from "@/components/ui/dot-pattern"; 

export default function Home() {

  return (
    <main className="relative min-h-screen flex items-center justify-center p-8 md:p-24 max-w-5xl mx-auto">
      <DotPattern className="absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" /> {/* Dot-Pattern hinter dem Text */}
      <div className="flex flex-col gap-12 relative z-10">
        <Image 
          src="/matthias.jpg"
          alt="Portrait"
          width={128}
          height={128}
          className="rounded-full cursor-pointer"
        />
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight transition-transform ease-in-out">
            Hi, i&apos;m Matthias.<br />
            I build <WordRotate duration={3500} words={["tiny", "cool", "funny", "cute", "useful", "sexy"]} className="bg-[#ff9f43] p-2 rounded-2xl"/> apps <br/>for the web.
          </h1>
          
          <div className="space-y-4 text-lg text-neutral-600 font-medium">
            <p>
              Building simple and beautiful things with accessible tools is what I enjoy most about my work.<br/>
              I am also interested in crafting beautiful minimal products and exploring new worlds.
            </p>
            <p>
              Sometimes i&apos;m 
              <Twitter fill="lightblue " className="ml-1 inline-flex size-4 text-blue-600" /> <a href="https://x.com/matthias_codes" className="underline hover:text-black transition-colors">tweeting</a>,   
              taking <Camera fill="lightgrey" className="ml-1 inline-flex size-5" /> <a href="https://instagram.com/dermeisterfotograf" className="underline hover:text-black transition-colors">photos</a> and  
              writing <CodeSquare className="ml-1 inline-flex size-4 text-[#ff9f43]"/> <a href="https://github.com/mmeister86" className="underline hover:text-black transition-colors">code</a> which
              i store on GitHub.
            </p>
            <p>All of this wouldn&apos;t be possible withhout incredible (often times) open source tools like Aider, Cline, VS-Code, shadcn UI, Vercel, and many more.</p>
          </div>

          <div className="py-4 space-y-4 text-lg text-neutral-600 font-medium">
            <div className="flex items-center gap-2">
              <p>Check out my little projects using the <ArrowRight className="inline-flex size-4" /><ArrowRight className="inline-flex size-4" /><ArrowRight className="inline-flex size-4" /></p>
              <SidebarTrigger className="inline-flex size-4 hover:bg-none"/>
            </div>
          </div>

          <div className="font-semibold">
            <p>Write me a mail, i love getting these <HeartIcon fill="red" className="inline-flex size-4 text-red-500" /></p> 
            <a href="mailto:hi@matthias.lol" className="underline hover:text-black transition-colors">
              hi@matthias.lol
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
