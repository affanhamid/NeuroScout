import dynamoose from "dynamoose";

// Organization Schema
export const OrganizationSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    name: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9 ]{1,}$/, // Must not be empty and allow alphanumeric + spaces
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Player Schema
export const PlayerSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    age: {
      type: Number,
      required: true,
      validate: (val) => typeof val === "number" && val > 0 && val < 100, // Age between 1 and 99
    },
    position: {
      type: Number,
      required: true,
      validate: (val) => typeof val === "number" && val >= 0, // Position must be non-negative
    },
    organizationId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Game Schema
export const GameSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    name: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9 ]{1,}$/, // Must not be empty and allow alphanumeric + spaces
    },
    description: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9 .,!?]{1,}$/, // Allow sentences with spaces and punctuation
    },
    image: {
      type: String,
      required: true,
      validate: /^(http|https):\/\/[^ "]+$/, // Must be a valid URL
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// GameObservation Schema
export const GameObservationSchema = new dynamoose.Schema(
  {
    playerId: {
      type: String,
      hashKey: true,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    gameId: {
      type: String,
      rangeKey: true,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    data: {
      type: Object,
      required: true, // Assuming data is always required
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// User Schema
export const UserSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    email: {
      type: String,
      required: true,
      validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Must be a valid email
    },
    password: {
      type: String,
      required: true,
      validate: /.{8,}/, // Password must be at least 8 characters
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"], // Only allow predefined roles
    },
    organizationId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Result Schema
export const ResultSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    gameId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    playerId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    metrics: {
      type: Object,
      required: true, // Assuming metrics are always required
    },
    resultDate: { type: Date, default: () => new Date(), required: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// MetricsTemplate Schema
export const MetricsTemplateSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, required: true },
    gameId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9-]{1,}$/, // Must be alphanumeric with hyphens allowed
    },
    metrics: {
      type: Array,
      required: true,
      schema: [
        {
          type: Object,
          schema: {
            name: {
              type: String,
              required: true,
              validate: /^[a-zA-Z0-9 ]{1,}$/, // Must not be empty and allow alphanumeric + spaces
            },
            description: {
              type: String,
              required: true,
              validate: /^[a-zA-Z0-9 .,!?]{1,}$/, // Allow sentences with spaces and punctuation
            },
            type: {
              type: String,
              required: true,
              enum: ["number", "string"], // Allowed types
            },
          },
        },
      ],
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);
