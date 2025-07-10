import { Detail, Color, LocalStorage, Icon, List, Action, ActionPanel } from "@raycast/api";
import getPlayByPlayEvents from "../../utils/getPlaybyPlay";
import { useState, useEffect } from "react";
import sportInfo from "../../utils/getSportInfo";
// import TeamDetail from "../views/teamDetail";

const Baseball = ({ gameId }: { gameId: string }) => {
  const { playByPlayEventData, playByPlayLoading, playByPlayRevalidate } = getPlayByPlayEvents({ gameId });
  const period = "Inning";
  const [currentPeriod, displaySelectPeriod] = useState(`${period}1`);

  const events = playByPlayEventData?.plays || [];
  const playByPlayEvents: JSX.Element[] = [];

  const awayTeamFull = playByPlayEventData?.boxscore?.teams?.[0]?.team?.displayName;
  const awayTeamId = playByPlayEventData?.boxscore?.teams?.[0]?.team?.id ?? "";
  const awayTeamLogo = playByPlayEventData?.boxscore?.teams?.[0]?.team.logo;

  const homeTeamFull = playByPlayEventData?.boxscore?.teams?.[1]?.team?.displayName;
  const homeTeamId = playByPlayEventData?.boxscore?.teams?.[1]?.team?.id ?? "";
  const homeTeamLogo = playByPlayEventData?.boxscore?.teams?.[1]?.team.logo;

  const leagueLogo = `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`;

  useEffect(() => {
    async function loadStoredDropdown() {
      const storedValue = await LocalStorage.getItem("selectedPeriod");

      if (typeof storedValue === "string") {
        displaySelectPeriod(storedValue);
      } else {
        displaySelectPeriod(`${period}1`);
      }
    }

    loadStoredDropdown();
  }, []);

  if (playByPlayLoading) {
    return <Detail isLoading={true} />;
  }

  if (!playByPlayEventData) {
    return <Detail markdown="No data found." />;
  }
  return (
    <Detail
      markdown={`our game id is ${gameId}`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Away Team" text={awayTeamFull}></Detail.Metadata.Label>
          <Detail.Metadata.Label title="Home Team" text={homeTeamFull}></Detail.Metadata.Label>
        </Detail.Metadata>
      }
    />
  );
};

export default Baseball;
