"use client";

import {
  ArrowRight,
  Camera,
  CodeSquare,
  HeartIcon,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";
import WordRotate from "@/components/ui/word-rotate";
import DotPattern from "@/components/ui/dot-pattern";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  return (
    <main className=" flex items-center justify-center md:p-24 sm:py-12 w-full mx-auto my-auto">
      <DotPattern className="absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
    
      <div className="flex flex-col relative w-fit gap-12">
        <div className="flex item-center gap-4">
          <Image
            src="/matthias.jpg"
            alt="Portrait"
            width={128}
            height={128}
            className="rounded-full cursor-pointer"
            onClick={() => {
              toast({
                title: "Nope. No link here.",
                description:
                  "Sorry i made you click, i wanted to try out the toast functionality.",
              });
            }}
          />
          <Image
            src="/click-me.png"
            alt="Click Me"
            width={150}
            height={115}
            className="my-auto md:block lg:block hidden"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight transition-transform ease-in-out">
            Hi, i&apos;m Matthias.
            <br />I build{" "}
            <WordRotate
              duration={4000}
              words={["tiny", "cool", "funny", "cute", "useful", "sexy"]}
              className="bg-[#ff9f43] p-2 rounded-2xl"
            />{" "}
            apps for the web.
          </h1>

          <div className="space-y-4 text-lg text-neutral-600 font-medium">
            <p>
              Building simple and beautiful little apps with free to use tools is what
              I enjoy most about writing software.
              <br />I am using this website as a playground to dive nose first in the world of NextJS, trying to have some fun along the way.
            </p>
            <p>
              Sometimes i&apos;m
              <Twitter
                fill="lightblue "
                className="ml-1 inline-flex size-4 text-blue-600"
              />{" "}
              <a
                href="https://x.com/matthias_codes"
                className="underline hover:text-black transition-colors"
                target="blank"
              >
                tweeting
              </a>
              , taking{" "}
              <Camera fill="lightgrey" className="ml-1 inline-flex size-5" />{" "}
              <a
                href="https://instagram.com/dermeisterfotograf"
                className="underline hover:text-black transition-colors"
                target="blank"
              >
                photos
              </a>{" "}
              and writing{" "}
              <CodeSquare className="ml-1 inline-flex size-4 text-[#ff9f43]" />{" "}
              <a
                href="https://github.com/mmeister86"
                className="underline hover:text-black transition-colors"
                target="blank"
              >
                code
              </a>{" "}
              which i store on GitHub.
            </p>
            <p>
              All of this wouldn&apos;t be possible without incredible (often
              times) open source tools like Aider, Cline, VS-Code, shadcn UI,
              Vercel, and many more.
            </p>
          </div>

          <div className="py-4 space-y-4 text-lg text-neutral-600 font-medium">
            <div className="flex items-center gap-2">
              <p>
                Check out my little projects using the sidebar{" "}
                <ArrowRight className="inline-flex size-4" />
                <ArrowRight className="inline-flex size-4" />
                <ArrowRight className="inline-flex size-4" />
              </p>
              <SidebarTrigger className="inline-flex size-4 hover:bg-none" />
            </div>
          </div>

          <div className="font-semibold">
            <p>
              Write me a mail, i love getting these{" "}
              <HeartIcon
                fill="red"
                className="inline-flex size-4 text-red-500"
              />
            </p>
            <a
              href="mailto:hi@matthias.lol"
              className="underline hover:text-black transition-colors"
            >
              hi@matthias.lol
            </a>
          </div>

          <div className="font-light text-gray-600 text-sm pt-4">
            <p>
              &#169; Matthias Meister | Mayener Straße 15 | 56753 Welling |
              Germany
              <br />
              Made with NextJS and deployed to Vercel.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
