"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface PlayerFormInputs {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
}

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(1, "First name must have at least 1 character")
    .max(50, "First name must have at most 50 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(1, "Last name must have at least 1 character")
    .max(50, "Last name must have at most 50 characters"),
  age: yup
    .number()
    .required("Age is required")
    .typeError("Age must be a number")
    .min(11, "Age must be at least 11")
    .max(99, "Age must be less than 100"),
  position: yup.string().required("Position is required")
});

const PlayerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PlayerFormInputs>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<PlayerFormInputs> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <main className="bg-game-background w-screen h-screen flex flex-col gap-20 justify-center items-center">
      <h1 className="text-white">NeuroScout Assessment Centre</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white/5 w-[25vw] border-2 border-white/20 text-gray-100 p-6 rounded-md shadow-md max-w-lg mx-auto"
      >
        <h2 className="text-2xl text-center">Organization: </h2>
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold">
            First Name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.firstName && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 font-semibold">
            Last Name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.lastName && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block mb-1 font-semibold">
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age")}
            className="
    border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-100
    focus:outline-none focus:ring-2 focus:ring-green-600
  "
          />
          {errors.age && (
            <p className="text-red-400 mt-1 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="position" className="block mb-1 font-semibold">
            Position
          </label>
          <select
            id="position"
            {...register("position")}
            className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Position</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </select>
          {errors.position && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.position.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 text-xl"
        >
          Start Assessment
        </button>
      </form>
    </main>
  );
};

export default PlayerForm;
