"use client";
import Image from "next/image";

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
