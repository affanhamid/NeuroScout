import { Schema, model, InferSchemaType } from "mongoose";

export const OrganizationSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]{1,}$/, // Validation for alphanumeric and spaces
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const PlayerSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (val: number) => val > 0 && val < 100,
        message: "Age must be between 1 and 99",
      },
    },
    position: {
      type: Number,
      required: true,
      min: 0, // Position must be non-negative
    },
    organizationId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/, // Validation for alphanumeric with hyphens
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const GameSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]{1,}$/, // Validation for alphanumeric and spaces
    },
    description: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 .,!?]{1,}$/, // Validation for sentences and punctuation
    },
    image: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "]+$/, // Validation for valid URLs
    },
    parameters: {
      type: [
        {
          id: { type: String, required: true },
          data: { type: Schema.Types.Mixed, required: true },
        },
      ],
      required: true,
    },
    scoringMechanisms: {
      type: [
        {
          id: { type: String, required: true },
          description: { type: String, required: true },
          function: { type: String, required: true }, // Serialized JS function
        },
      ],
      required: true,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const GameObservationSchema = new Schema(
  {
    playerId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    data: { type: Schema.Types.Mixed, required: true }, // Flexible object type
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum length for passwords
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"], // Predefined roles
    },
    organizationId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const ResultSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    playerId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    metrics: { type: Schema.Types.Mixed, required: true },
    resultDate: { type: Date, default: Date.now, required: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const MetricsTemplateSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/,
    },
    metrics: {
      type: [
        {
          name: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 ]{1,}$/, // Validation for alphanumeric and spaces
          },
          description: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 .,!?]{1,}$/, // Validation for sentences and punctuation
          },
          type: {
            type: String,
            required: true,
            enum: ["number", "string"], // Allowed types
          },
        },
      ],
      required: true,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Models
export const OrganizationModel = model("Organization", OrganizationSchema);
export const PlayerModel = model("Player", PlayerSchema);
export const GameModel = model("Game", GameSchema);
export const GameObservationModel = model(
  "Game Observation",
  GameObservationSchema,
);
export const UserModel = model("Player", UserSchema);
export const ResultsModel = model("Player", ResultSchema);
export const MetricsTemplateModel = model("Player", MetricsTemplateSchema);

// Types
export type OrganizationType = InferSchemaType<typeof OrganizationModel>;
export type PlayerType = InferSchemaType<typeof OrganizationModel>;
export type GameType = InferSchemaType<typeof OrganizationModel>;
export type GameObservationType = InferSchemaType<typeof OrganizationModel>;
export type UserType = InferSchemaType<typeof OrganizationModel>;
export type ResultsType = InferSchemaType<typeof OrganizationModel>;
export type MetricsTemplateType = InferSchemaType<typeof OrganizationModel>;
