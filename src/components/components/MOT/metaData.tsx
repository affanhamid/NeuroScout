"use client";
export const instructions = {
  steps: [
    {
      title: (
        <>
          <small>Welcome to</small> <br />
          <span>The Visual Tracking Game</span>
        </>
      ),
      description: "Follow these simple steps to get started",
    },
    {
      title: "Focus on the Highlighted Targets",
      description:
        "When the game begins, a set of yellow objects will appear on the screen. Some of these objects will turn blue briefly to indicate your targets. Pay close attention to these targets as they will blend in with other objects once the tracking begins.",
    },
    {
      title: "Track the Target Objects",
      description:
        "After the blue targets revert to their normal appearance, all objects will begin to move around the screen. Your task is to keep track of the original target objects as they move.",
    },
    {
      title: "Avoid Distractions",
      description:
        "Other objects will be moving in random directions to distract you. Stay focused on your target objects and try not to lose track of them.",
    },
    {
      title: "Select the Targets",
      description:
        "Once the objects stop moving, click on the objects you believe were the original targets. Make sure you select all four of the targets to submit your answer.",
    },
    {
      title: "Scoring",
      description:
        "You’ll receive points based on how accurately you identify the targets. The faster and more accurate you are, the higher your score!",
    },
    {
      title: "Difficulty Levels",
      description:
        "As you progress, the objects will start to move faster or slower depending on your accuracy.",
    },
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
