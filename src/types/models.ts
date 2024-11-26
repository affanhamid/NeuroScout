export type Player = {
  id: string;
  age: number;
  position: number;
  organizationId: number;
};

export type organizationId = {
  id: string;
  name: string;
};

export type Game = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type GameObservation = {
  id: string;
  gameId: string;
  playerId: string;
  data: Record<string, any>;
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
  organizationId: string;
};
