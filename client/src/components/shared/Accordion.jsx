/* ----------------------------------------------------------------------------------------------
Accordion.jsx
The custom accordion elements
------------------------------------------------------------------------------------------------- */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";

// The accordion

export function CourseCommonAccordion({ children }) {
  return (
    <Accordion type="multiple" className="w-full">
      {children}
    </Accordion>
  );
}

// The accordion item
export function CourseCommonAccordionItem({ children, value }) {
  return (
    <AccordionItem value={value} className="border border-white/5">
      {children}
    </AccordionItem>
  );
}

// The accordion trigger
export function CourseAccordionTrigger({ children }) {
  return (
    <AccordionTrigger asChild>
      <div className="w-full border-b rounded-none px-2 bg-white/3 border-white/5 text-md flex justify-center items-center">
        {/* The trigger title */}
        {children}

        {/* The trigger icon */}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </div>
    </AccordionTrigger>
  );
}

// The accordion content
export function CourseAccordionContent({ children }) {
  return (
    <AccordionContent asChild>
      {/* The videos */}
      <div className="w-full p-3 flex flex-col gap-7 justify-between items-center">
        <ol className="w-full list-decimal p-3 pb-0 pl-7 flex flex-col justify-center items-start gap-2 text-lg">
          {children}
        </ol>
      </div>
    </AccordionContent>
  );
}
