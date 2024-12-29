"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  OrganizationTypeWithId,
  PlayerFields,
  PlayerTypeWithId
} from "@/types";
import { apiClient } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import games from "../game-components";

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
    .min(6, "Age must be at least 11")
    .max(99, "Age must be less than 100"),
  position: yup.string().required("Position is required")
});

export type PlayerFormFields = Omit<PlayerFields, "organizationId">;

const PlayerForm = ({
  organization
}: {
  organization: OrganizationTypeWithId;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PlayerFormFields>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<PlayerFormFields> = async (data) => {
    const response: { data: PlayerTypeWithId } = await apiClient(
      "/api/players",
      {
        method: "POST",
        body: { ...data, organizationId: organization._id }
      }
    );
    sessionStorage.setItem("playerId", response.data._id.toString());
    router.push(`/games/${Object.keys(games)[0]}`);
  };

  return (
    <main className="bg-game-background w-screen h-screen flex flex-col gap-20 justify-center items-center">
      <h1 className="text-white">NeuroScout Assessment Centre</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 bg-white/5 w-120 border-2 border-white/20 text-gray-100 p-4 rounded-md shadow-md mx-auto"
      >
        <h2 className="text-xl text-center">
          Organisation: {organization.name}
        </h2>
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold">
            First Name
          </label>
          <input id="firstName" {...register("firstName")} />
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
          <input id="lastName" {...register("lastName")} />
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
          <input id="age" type="number" {...register("age")} />
          {errors.age && (
            <p className="text-red-400 mt-1 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="position" className="block mb-1 font-semibold">
            Position
          </label>
          <select id="position" {...register("position")}>
            <option value="">Select Position</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="N/A">N/A</option>
          </select>
          {errors.position && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.position.message}
            </p>
          )}
        </div>
        <div className="mt-6">
          <div className="bg-primary/30 p-3 rounded-md text-sm">
            <p className="font-medium">Important Notice:</p>
            <p>• Must complete assessment in one sitting</p>
            <p>• Estimated time to complete: 20 minutes</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 text-xl mt-5"
        >
          Start Assessment
        </button>
      </form>
    </main>
  );
};

export default PlayerForm;
