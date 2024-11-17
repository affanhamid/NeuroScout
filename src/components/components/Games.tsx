import type Game from "./Game/Game";
import { TNTGame, TNTStroboscopicGame } from "./TNT";

export const Games: Record<number, Game> = {
  1: TNTGame,
  2: TNTStroboscopicGame,
};
