import { Detail, Icon, Action, ActionPanel } from "@raycast/api";
import getPlayByPlayEvents, { PlayByPlayData, Play } from "../../utils/getPlaybyPlay";

const findPlayer = ({
  playerType,
  lastPlay,
  playByPlayEventData,
}: {
  playerType: "batter" | "pitcher";
  lastPlay: Play | undefined;
  playByPlayEventData: PlayByPlayData | undefined;
}) => {
  const playerParticipant = lastPlay?.participants?.find((p) => p.type === playerType);
  const playerId = playerParticipant?.athlete?.id;

  const allAthletes = playByPlayEventData?.boxscore.players.flatMap(
    (team) => team?.statistics?.flatMap((stat) => stat?.athletes) || [],
  );

  const currentPlayer = allAthletes?.find((a) => a?.athlete?.id === playerId);

  return { playerId, currentPlayer };
};

const Baseball = ({ gameId }: { gameId: string }) => {
  const { playByPlayEventData, playByPlayLoading, playByPlayRevalidate } = getPlayByPlayEvents({ gameId });

  const awayTeamFull = playByPlayEventData?.boxscore?.teams?.[0]?.team?.displayName;
  const homeTeamFull = playByPlayEventData?.boxscore?.teams?.[1]?.team?.displayName;
  const lastPlay = playByPlayEventData?.plays?.[playByPlayEventData.plays.length - 1];

  const { playerId: batterId, currentPlayer: currentBatter } = findPlayer({
    playerType: "batter",
    lastPlay,
    playByPlayEventData,
  });

  const { playerId: pitcherId, currentPlayer: currentPitcher } = findPlayer({
    playerType: "pitcher",
    lastPlay,
    playByPlayEventData,
  });

  const batter = {
    id: batterId,
    name: currentBatter?.athlete?.shortName,
    headshot: currentBatter?.athlete?.headshot?.href,
  };

  const pitcher = {
    id: pitcherId,
    name: currentPitcher?.athlete?.shortName,
    headshot: currentPitcher?.athlete?.headshot?.href,
  };

  if (playByPlayLoading) {
    return <Detail isLoading={true} />;
  }

  if (!playByPlayEventData) {
    return <Detail markdown="No data found." />;
  }

  //Game ID: ${gameId}

  const markdownArea = `
  ### Last Play
  > ${lastPlay?.text}
  ---

  ### Home
  - **Home Team:**  ${homeTeamFull}
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
          <Detail.Metadata.Label title="Pitcher" text={pitcher.name} icon={pitcher.headshot} />
          <Detail.Metadata.Label title="Batter" text={batter.name} icon={batter.headshot} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Bases" />
          <Detail.Metadata.Label title="Count" />
          <Detail.Metadata.Label title="Outs" />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action
            title="Refresh"
            icon={Icon.ArrowClockwise}
            onAction={playByPlayRevalidate}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
        </ActionPanel>
      }
    />
  );
};

export default Baseball;
