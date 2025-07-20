import { PlayByPlayData } from "./getPlaybyPlay";

export default function getBoxscore(playByPlayData: PlayByPlayData) {
  const { boxscore } = playByPlayData;
  return boxscore;
}
