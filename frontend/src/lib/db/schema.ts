import { Schema, InferSchemaType, Types } from "mongoose";

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
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50 // Optional: Limit name length for validation
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50 // Optional: Limit name length for validation
    },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (val: number) => val > 10 && val < 100,
        message: "Age must be between 10 and 99"
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
    instructions: {
      type: [
        {
          step: { type: Number, required: true },
          image: {
            type: String,
            required: true,
            match: /^(http|https):\/\/[^ "]+$/
          }
        }
      ]
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
export type OrganizationType = InferSchemaType<typeof OrganizationSchema> & {};
export type PlayerType = InferSchemaType<typeof PlayerSchema>;
export type GameType = InferSchemaType<typeof GameSchema>;
export type GameObservationType = InferSchemaType<typeof GameObservationSchema>;
export type UserType = InferSchemaType<typeof UserSchema>;
export type ResultType = InferSchemaType<typeof ResultSchema>;
export type MetricsTemplateType = InferSchemaType<typeof MetricsTemplateSchema>;

export type OrganizationTypeWithId = OrganizationType & { _id: Types.ObjectId };
export type PlayerTypeWithId = PlayerType & { _id: Types.ObjectId };
export type GameTypeWithId = GameType & { _id: Types.ObjectId };
export type GameObservationTypeWithId = GameObservationType & {
  _id: Types.ObjectId;
};
export type UserTypeWithId = UserType & { _id: Types.ObjectId };
export type ResultTypeWithId = ResultType & { _id: Types.ObjectId };
export type MetricsTemplateTypeWithId = MetricsTemplateType & {
  _id: Types.ObjectId;
};

// Just the fields
export type OrganizationFields = Omit<
  OrganizationType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type PlayerFields = Omit<
  PlayerType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type GameFields = Omit<
  GameType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type GameObservationFields = Omit<
  GameObservationType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type UserFields = Omit<
  UserType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type ResultFields = Omit<
  ResultType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type MetricsTemplateFields = Omit<
  MetricsTemplateType,
  "createdAt" | "deletedAt" | "updatedAt"
>;
