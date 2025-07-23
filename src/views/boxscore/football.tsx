import { Detail, Icon, Action, ActionPanel } from "@raycast/api";
import getPlayByPlayEvents, { PlayByPlayData, Play } from "../../utils/getPlaybyPlay";

const Football = ({ gameId }: { gameId: string }) => {
  const { playByPlayEventData, playByPlayLoading, playByPlayRevalidate } = getPlayByPlayEvents({ gameId });

  //? idea: render an emoji for team that is leading in a stat (trophy, medal, etc.)
  const markdownArea = `
  ### Last Play
  > 
  ---

  ### Home
  - Total Yards: 8/10 (80.0%)
  - Turnovers: 2
  - Penalties: 3
  - 3rd Downs: 5/15 (33.3%)
  - Time of Possession: 20:00

  ### Away
  - Total Yards: 12/28 (42.9%)
  - Turnovers: 1
  - Penalties: 2
  - 3rd Downs: 4/12 (33.3%)
  - Time of Possession: 20:00
  `;

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
