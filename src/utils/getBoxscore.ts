import { PlayByPlayData } from "./getPlaybyPlay";

export function getBoxscore(playByPlayData: PlayByPlayData | undefined) {
  if (!playByPlayData) {
    return { teams: [], players: [] };
  }
  const { boxscore } = playByPlayData;
  return boxscore;
}

export function getBasketballBoxScore(playByPlayData: PlayByPlayData | undefined) {
  if (!playByPlayData) {
    return {
      homeTeam: {
        id: "",
        name: "",
        fieldGoalAttempted: "0",
        fieldGoalPct: "0",
        threePointAttempted: "0",
        threePointPct: "0",
        freeThrowAttempted: "0",
        freeThrowPct: "0",
        turnovers: "0",
      },
      awayTeam: {
        id: "",
        name: "",
        fieldGoalAttempted: "0",
        fieldGoalPct: "0",
        threePointAttempted: "0",
        threePointPct: "0",
        freeThrowAttempted: "0",
        freeThrowPct: "0",
        turnovers: "0",
      },
      homeLeaders: {
        leadingScorer: { id: "", name: "", value: "" },
        leadingAssists: { id: "", name: "", value: "" },
        leadingRebounder: { id: "", name: "", value: "" },
      },
      awayLeaders: {
        leadingScorer: { id: "", name: "", value: "" },
        leadingAssists: { id: "", name: "", value: "" },
        leadingRebounder: { id: "", name: "", value: "" },
      },
    };
  }

  const homeTeam = {
    id: playByPlayData?.boxscore?.teams?.[1]?.team?.id || "",
    name: playByPlayData?.boxscore?.teams?.[1]?.team?.displayName || "",
    fieldGoalAttempted: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[0]?.displayValue || "0",
    fieldGoalPct: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[1]?.displayValue || "0",
    threePointAttempted: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[2]?.displayValue || "0",
    threePointPct: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[3]?.displayValue || "0",
    freeThrowAttempted: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[4]?.displayValue || "0",
    freeThrowPct: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[5]?.displayValue || "0",
    turnovers: playByPlayData?.boxscore?.teams?.[1]?.statistics?.[12]?.displayValue || "0",
  };
  const awayTeam = {
    id: playByPlayData?.boxscore?.teams?.[0]?.team?.id || "",
    name: playByPlayData?.boxscore?.teams?.[0]?.team?.displayName || "",
    fieldGoalAttempted: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[0]?.displayValue || "0",
    fieldGoalPct: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[1]?.displayValue || "0",
    threePointAttempted: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[2]?.displayValue || "0",
    threePointPct: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[3]?.displayValue || "0",
    freeThrowAttempted: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[4]?.displayValue || "0",
    freeThrowPct: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[5]?.displayValue || "0",
    turnovers: playByPlayData?.boxscore?.teams?.[0]?.statistics?.[12]?.displayValue || "0",
  };

  const homeLeaders = {
    leadingScorer: {
      id: playByPlayData?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.displayValue || "",
    },
    leadingAssists: {
      id: playByPlayData?.leaders?.[0]?.leaders?.[1]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[0]?.leaders?.[1]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[0]?.leaders?.[1]?.leaders?.[0]?.displayValue || "",
    },
    leadingRebounder: {
      id: playByPlayData?.leaders?.[0]?.leaders?.[2]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[0]?.leaders?.[2]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[0]?.leaders?.[2]?.leaders?.[0]?.displayValue || "",
    },
  };

  const awayLeaders = {
    leadingScorer: {
      id: playByPlayData?.leaders?.[1]?.leaders?.[0]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[1]?.leaders?.[0]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[1]?.leaders?.[0]?.leaders?.[0]?.displayValue || "",
    },
    leadingAssists: {
      id: playByPlayData?.leaders?.[1]?.leaders?.[1]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[1]?.leaders?.[1]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[1]?.leaders?.[1]?.leaders?.[0]?.displayValue || "",
    },
    leadingRebounder: {
      id: playByPlayData?.leaders?.[1]?.leaders?.[2]?.leaders?.[0]?.athlete?.id || "",
      name: playByPlayData?.leaders?.[1]?.leaders?.[2]?.leaders?.[0]?.athlete?.shortName || "",
      value: playByPlayData?.leaders?.[1]?.leaders?.[2]?.leaders?.[0]?.displayValue || "",
    },
  };

  return { homeTeam, awayTeam, homeLeaders, awayLeaders };
}
