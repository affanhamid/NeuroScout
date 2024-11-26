import { Item } from "dynamoose/dist/Item";

// Organization Type
export interface Organization extends Item {
  id: string;
  name: string;
}

// Player Type
export interface Player extends Item {
  id: string;
  age: number;
  position: number;
  organizationId: string;
}

// Game Type
export interface Game extends Item {
  id: string;
  name: string;
  description: string;
  image: string;

  parameters: Array<{
    id: string;
    data: Record<string, object | number | string>;
  }>;

  scoringMechanisms: Array<{
    id: string;
    description: string;
    function: string;
  }>;
}

// GameObservation Type
export interface GameObservation extends Item {
  playerId: string;
  gameId: string;
  data: Record<string, object | string | number>;
}

// User Type
export interface User extends Item {
  id: string;
  email: string;
  password: string;
  role: "admin" | "user" | "manager";
  organizationId: string;
}

// Result Type
export interface Result extends Item {
  id: string;
  gameId: string;
  playerId: string;
  metrics: Record<string, MetricsTemplate>;
  resultDate: Date;
}

// MetricsTemplate Type
export interface MetricsTemplate extends Item {
  id: string;
  gameId: string;
  metrics: Array<{
    name: string;
    description: string;
    type: "number" | "string";
  }>;
}
