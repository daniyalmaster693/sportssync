import { Detail, Color, LocalStorage, Icon, List, Action, ActionPanel } from "@raycast/api";
import getPlayByPlayEvents from "../../utils/getPlaybyPlay";
import { useState, useEffect } from "react";
import sportInfo from "../../utils/getSportInfo";
// import TeamDetail from "../views/teamDetail";

const Baseball = ({ gameId }: { gameId: string }) => {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

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
  const homeTeamLogo = playByPlayEventData?.boxscore?.teams?.[1]?.team?.logo;

  // const homeTeamRoster = playByPlayEventData?.rosters?.[0].roster?.players ?? [];
  // const homeTeamPlayer = homeTeamRoster[0]?.athlete.displayName;
  const test = playByPlayEventData?.rosters?.[0]?.teamInfo?.roster[0]?.rosterItem?.athlete || {};

  console.log(test);
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

  const markdownArea = `
  ### Last Play
  > Game ID: ${gameId}
  ---

  ### Home
  - **Home Team:** ${homeTeamPlayer}
  - Hits
  - Errors

  ### Away 
  - **Away Team:** ${awayTeamFull}
  - Hits
  - Errors
  `;
  return (
    <Detail
      markdown={markdownArea}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Pitcher" text={awayTeamFull} icon={awayTeamLogo} />
          <Detail.Metadata.Label title="Batter" text={homeTeamFull} icon={homeTeamLogo} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Bases" />
          <Detail.Metadata.Label title="Count" />
          <Detail.Metadata.Label title="Outs" />
        </Detail.Metadata>
      }
    />
  );
};

export default Baseball;
