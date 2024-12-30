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
import Input from "./Input";
import Select from "./Select";

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
  age: yup.string().required("Age is required"),
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
    <main className="bg-[#000000] w-screen h-screen flex flex-col gap-20 justify-center items-center">
      <h1 className="text-white">NeuroScout Assessment Centre</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 bg-white/5 w-110 border-2 border-white/20 text-gray-100 p-4 rounded-md shadow-md mx-auto"
      >
        <h2 className="text-3xl py-3 text-center">
          Organisation: {organization.name}
        </h2>
        <Input
          id="firstName"
          label="First Name"
          register={register("firstName")}
          error={errors.firstName?.message}
        />

        <Input
          id="lastName"
          label="Last Name"
          register={register("lastName")}
          error={errors.lastName?.message}
        />
        <Select
          id="age"
          label="Age"
          register={register("age")}
          error={errors.age?.message}
          options={[
            { value: "U9", label: "U9" },
            { value: "U10", label: "U10" },
            { value: "U11", label: "U11" },
            { value: "U12", label: "U12" }
          ]}
        />
        <Select
          id="position"
          label="Position"
          register={register("position")}
          error={errors.position?.message}
          options={[
            { value: "Forward", label: "Forward" },
            { value: "Midfielder", label: "Midfielder" },
            { value: "Defender", label: "Defender" },
            { value: "Goalkeeper", label: "Goalkeeper" },
            { value: "N/A", label: "N/A" }
          ]}
        />

        <div className="my-5 py-3 px-5 bg-primary/20 rounded-lg">
          <h4 className="mb-2">Important Notice:</h4>
          <ul className="list-disc px-4">
            <li>Must complete assessment in one sitting</li>
            <li>Estimated time to complete: 20 minutes</li>
          </ul>
        </div>
        <button type="submit" className="game-button rounded-lg py-2">
          Start Assessment
        </button>
      </form>
    </main>
  );
};

export default PlayerForm;
