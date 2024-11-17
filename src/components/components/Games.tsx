import type Game from "./Game/Game";
import { TNTGame, TNTStroboscopicGame } from "./TNT";
import TNTGlowGame from "./TNT/TNTGlow";

export const Games: Record<number, Game> = {
  1: TNTGame,
  2: TNTGlowGame,
  3: TNTStroboscopicGame,
};
