'use client';

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type ProjectProps = (typeof projectsData)[number]
// ProjectProps data type is defined as the type of the elements in the projectsData array (which are each of the projects)
// numbers represent the index of the projectsData array. it loops through each project in the array and assigns the type of each project to the ProjectProps type.

export default function Project({ title, description, tags, imageUrl }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"] // when the top of the viewport is 1px away from the target element(project), the animation will start.
    // The animation ends when the top of the viewport is 1.33px (33%) away from the target element(project).

  }); // this is a custom hook that we are using to animate the projects section when it comes into view.
  const scaleProgress= useTransform(scrollYProgress, [0, 1], [0.8, 1]); // this is a custom hook that we are using to animate the projects section when it comes into view.
  const opacityProgress= useTransform(scrollYProgress, [0, 1], [0.6, 1]); 
  return (
  <motion.div
    ref={ref}
    style={{
      scale: scaleProgress,
      opacity: opacityProgress
    }}
    className="group mb-3 sm:mb-8 last:mb-0"
  >
    <section className="group bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[22.5rem] hover:bg-gray-200 transition group-even:pl-8">
      <div className="pt-4 pb-4 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full 
    group-even:ml-[18rem]">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
        <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
          {tags.map((tag, index) => (
            <li className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full" key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <Image src={imageUrl} alt="Project I worked on" quality={95} className="absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2 

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:-right-[initial] 
        group-even:-left-40"
      />
    </section>
    </motion.div>
  );
}
// I changed sm:h-[20rem] to sm:h-[22.5rem] for the section className="group bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[22.5rem] mb-3 sm:mb-8 last:mb-0 even:pl-8 hover:bg-gray-200 transition"
// I also changed pb-8 to pb-4 for the div className="pt-4 pb-4 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full group-even:ml-[18rem]">