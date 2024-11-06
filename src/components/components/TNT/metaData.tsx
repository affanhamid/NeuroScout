"use client";
import Image from "next/image";
import * as tnt_instructions from "@/public/tnt";
import * as tnt_flash_instructions from "@/public/tnt_flash";
import * as tnt_strobe_instructions from "@/public/tnt_strobe";
export const tnt_instructions_tsx = {
  steps: [
    { tsx: <Image src={tnt_instructions.step_1} alt="step 1" /> },
    { tsx: <Image src={tnt_instructions.step_2} alt="step 2" /> },
    { tsx: <Image src={tnt_instructions.step_3} alt="step 3" /> },
    { tsx: <Image src={tnt_instructions.step_4} alt="step 4" /> },
    { tsx: <Image src={tnt_instructions.step_5} alt="step 5" /> },
    { tsx: <Image src={tnt_instructions.step_6} alt="step 6" /> },
    { tsx: <Image src={tnt_instructions.step_7} alt="step 7" /> },
  ],
};
export const tnt_flash_instructions_tsx = {
  steps: [
    { tsx: <Image src={tnt_flash_instructions.step_1} alt="step 1" /> },
    { tsx: <Image src={tnt_flash_instructions.step_2} alt="step 2" /> },
    { tsx: <Image src={tnt_flash_instructions.step_3} alt="step 3" /> },
    { tsx: <Image src={tnt_flash_instructions.step_4} alt="step 4" /> },
    { tsx: <Image src={tnt_flash_instructions.step_5} alt="step 5" /> },
    { tsx: <Image src={tnt_flash_instructions.step_6} alt="step 6" /> },
    { tsx: <Image src={tnt_flash_instructions.step_7} alt="step 7" /> },
  ],
};
export const tnt_strobe_instructions_tsx = {
  steps: [
    { tsx: <Image src={tnt_strobe_instructions.step_1} alt="step 1" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_2} alt="step 2" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_3} alt="step 3" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_4} alt="step 4" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_5} alt="step 5" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_6} alt="step 6" /> },
    { tsx: <Image src={tnt_strobe_instructions.step_7} alt="step 7" /> },
  ],
};

export const formFields = [
  {
    id: "highestLevel",
    label: "What's the highest level of football you've achieved?",
    type: "select" as "select",
    options: [
      "Never Played",
      "Recreational",
      "School Team",
      "Sunday League",
      "Grassroot Academy",
      "University Team",
      "Regional Team",
      "Semi-Professional",
      "Professional",
      "International",
    ],
    validation: (value: string) =>
      value ? null : "Please select your highest level.",
  },
  {
    id: "age",
    label: "What is your age?",
    type: "number" as "number",
    validation: (value: string) => {
      const age = parseInt(value, 10);
      if (isNaN(age) || age < 5 || age > 100) {
        return "Please enter a valid age between 5 and 100.";
      }
      return null;
    },
  },
];
