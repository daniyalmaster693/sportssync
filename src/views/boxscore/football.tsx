import { Detail, Icon, Action, ActionPanel } from "@raycast/api";
import getPlayByPlayEvents from "../../utils/getPlaybyPlay";
import { getFootballBoxScore } from "../../utils/getBoxscore";

const Football = ({ gameId }: { gameId: string }) => {
  //! test for college and nfl

  gameId = "401671777";
  const { playByPlayEventData, playByPlayLoading, playByPlayRevalidate } = getPlayByPlayEvents({ gameId });
  const boxScore = getFootballBoxScore(playByPlayEventData);

  if (playByPlayLoading) {
    return <Detail isLoading={true} />;
  }

  if (!playByPlayEventData) {
    return <Detail markdown="No data found." />;
  }

  const markdownArea = `
  ### Last Play
  > 
  ---

  ### ${boxScore.homeTeam.name} (Home)
  - Total Yards: ${boxScore.homeTeam.totalYards}
  - Turnovers: ${boxScore.homeTeam.turnovers}
  - Penalties: ${boxScore.homeTeam.penalties}
  - 3rd Downs: ${boxScore.homeTeam.thirdDowns}
  - Time of Possession: ${boxScore.homeTeam.timeOfPossession}

  ### ${boxScore.awayTeam.name} (Away)
  - Total Yards: ${boxScore.awayTeam.totalYards}
  - Turnovers: ${boxScore.awayTeam.turnovers}
  - Penalties: ${boxScore.awayTeam.penalties}
  - 3rd Downs: ${boxScore.awayTeam.thirdDowns}
  - Time of Possession: ${boxScore.awayTeam.timeOfPossession}
  `;

  // separate home team and away team with separator component

  return (
    <Detail
      markdown={markdownArea}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            title="Home QB"
            // text={
            //   pitcher.name
            //     ? pitcher.inningsPitched && pitcher.era
            //       ? `${pitcher.name} (${pitcher.inningsPitched} IP, ${pitcher.era} ERA)`
            //       : pitcher.name
            //     : "No pitcher data"
            // }
            // icon={pitcher.headshot}
          />
          <Detail.Metadata.Label
            title="Away QB"
            // text={
            //   batter.name
            //     ? batter.atBats && batter.batAvg
            //       ? `${batter.name} (${batter.atBats} AB, ${batter.batAvg} BA)`
            //       : batter.name
            //     : "No batter data"
            // }
            // icon={batter.headshot}
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="WRs"
            // text={
            //   noBases
            //     ? "None"
            //     : [liveGame.onFirst && "1st", liveGame.onSecond && "2nd", liveGame.onThird && "3rd"]
            //         .filter(Boolean)
            //         .join(" ")
            // }
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="RBs"
            // text={
            //   noBases
            //     ? "None"
            //     : [liveGame.onFirst && "1st", liveGame.onSecond && "2nd", liveGame.onThird && "3rd"]
            //         .filter(Boolean)
            //         .join(" ")
            // }
          />
        </Detail.Metadata>
      }
    ></Detail>
  );
};

export default Football;
