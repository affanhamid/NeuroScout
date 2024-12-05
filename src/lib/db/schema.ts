import { Schema, InferSchemaType } from "mongoose";

export const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
    },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const PlayerSchema = new Schema(
  {
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (val: number) => val > 0 && val < 100,
        message: "Age must be between 1 and 99"
      }
    },
    position: {
      type: String,
      required: true,
      min: 0 // Position must be non-negative
    },
    organizationId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/ // Validation for alphanumeric with hyphens
    },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
    },
    description: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 .,!?]{1,}$/ // Validation for sentences and punctuation
    },
    image: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "]+$/ // Validation for valid URLs
    },
    parameters: {
      type: [
        {
          id: { type: String, required: true },
          data: { type: Schema.Types.Mixed, required: true }
        }
      ],
      required: true
    },
    scoringMechanisms: {
      type: [
        {
          id: { type: String, required: true },
          description: { type: String, required: true },
          function: { type: String, required: true } // Serialized JS function
        }
      ],
      required: true
    },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const GameObservationSchema = new Schema(
  {
    playerId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    data: { type: Schema.Types.Mixed, required: true }, // Flexible object type
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8 // Minimum length for passwords
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"] // Predefined roles
    },
    organizationId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const ResultSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    playerId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    metrics: { type: Schema.Types.Mixed, required: true },
    resultDate: { type: Date, default: Date.now, required: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const MetricsTemplateSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9-]{1,}$/
    },
    metrics: {
      type: [
        {
          name: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
          },
          description: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 .,!?]{1,}$/ // Validation for sentences and punctuation
          },
          type: {
            type: String,
            required: true,
            enum: ["number", "string"] // Allowed types
          }
        }
      ],
      required: true
    },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

// Types
export type OrganizationType = InferSchemaType<typeof OrganizationSchema>;
export type PlayerType = InferSchemaType<typeof PlayerSchema>;

export type GameType = Omit<
  InferSchemaType<typeof GameSchema>,
  "createdAt" | "updatedAt" | "deletedAt"
>;
export type GameObservationType = Omit<
  InferSchemaType<typeof GameObservationSchema>,
  "createdAt" | "updatedAt" | "deletedAt"
>;
export type UserType = Omit<
  InferSchemaType<typeof UserSchema>,
  "createdAt" | "updatedAt" | "deletedAt"
>;
export type ResultsType = Omit<
  InferSchemaType<typeof ResultSchema>,
  "createdAt" | "updatedAt" | "deletedAt"
>;
export type MetricsTemplateType = Omit<
  InferSchemaType<typeof MetricsTemplateSchema>,
  "createdAt" | "updatedAt" | "deletedAt"
>;
