import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import getScoresAndSchedule from "../utils/getSchedule";
import sportInfo from "../utils/getSportInfo";
import Plays from "../views/playbyplay";

interface DayItems {
  title: string;
  games: JSX.Element[];
}

export default function DisplayScoresAndSchedule() {
  const { scheduleLoading, scheduleData, scheduleRevalidate } = getScoresAndSchedule();
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const gameItems: DayItems[] = [];
  const games = scheduleData?.events || [];

  games?.forEach((game, index) => {
    const gameDate = new Date(game?.date);
    const gameDay = gameDate?.toLocaleDateString([], {
      dateStyle: "medium",
    });

    if (!gameItems?.find((sportGameDay) => sportGameDay?.title === gameDay)) {
      gameItems?.push({
        title: gameDay,
        games: [],
      });
    }

    const sportGameDay = gameItems?.find((sportGameDay) => sportGameDay?.title === gameDay);

    const gameTime = new Date(game?.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let accessoryTitle = gameTime;
    let accessoryColor = Color.SecondaryText;
    let accessoryIcon = { source: Icon.Calendar, tintColor: Color.SecondaryText };
    let accessoryToolTip = "Scheduled";
    let period;
    let periodNumber = `${game?.status?.period}`;
    let timeDisplay = game?.status?.displayClock;

    if (currentSport === "hockey") {
      period = "P";
    }

    if (currentSport === "basketball") {
      period = "Q";
    }

    if (currentSport === "football") {
      period = "Q";
    }

    if (currentSport === "baseball") {
      timeDisplay = game?.status?.type?.detail ?? "Unknown";
      period = "";
      periodNumber = "";
    }

    if (currentSport === "soccer") {
      timeDisplay = game?.status?.type?.detail ?? "Unknown";
      period = "";
      periodNumber = "";
    }

    if (currentSport === "racing") {
      period = "L";
    }

    const startingSoonInterval = 15 * 60 * 1000;
    const currentDate = new Date();
    const timeUntilGameStarts = gameDate.getTime() - currentDate.getTime();

    if (timeUntilGameStarts <= startingSoonInterval && game?.status?.type?.state === "pre") {
      accessoryColor = Color.Yellow;
      accessoryIcon = { source: Icon.Warning, tintColor: Color.Yellow };
      accessoryToolTip = "Starting Soon";
    }

    if (game?.status?.type?.state === "in") {
      accessoryTitle = `${game?.competitions[0]?.competitors[1]?.team.abbreviation} ${game?.competitions[0]?.competitors[1]?.score} - ${game?.competitions[0]?.competitors[0]?.team?.abbreviation} ${game?.competitions[0]?.competitors[0]?.score}     ${period}${periodNumber} ${timeDisplay}`;
      accessoryColor = Color.Green;
      accessoryIcon = { source: Icon.Livestream, tintColor: Color.Green };
      accessoryToolTip = "In Progress";
    }

    if (currentSport !== "racing") {
      if (game?.status?.type?.state === "post") {
        accessoryTitle = `${game?.competitions[0]?.competitors[1]?.team?.abbreviation} ${game?.competitions[0]?.competitors[1]?.score} - ${game?.competitions[0]?.competitors[0]?.team?.abbreviation} ${game?.competitions[0]?.competitors[0]?.score}`;
        accessoryColor = Color.SecondaryText;
        accessoryIcon = { source: Icon.CheckCircle, tintColor: Color.SecondaryText };
        accessoryToolTip = "Final";
      }
    } else {
      if (game?.status?.type?.state === "post") {
        accessoryTitle = `${game.competitions[4].competitors[0].athlete.shortName}`;
        accessoryColor = Color.SecondaryText;
        accessoryIcon = { source: Icon.CheckCircle, tintColor: Color.SecondaryText };
        accessoryToolTip = "Winner";
      }
    }

    if (game?.status?.type?.state === "post" && game?.status?.type?.completed === false) {
      accessoryTitle = `Postponed`;
      accessoryIcon = { source: Icon.XMarkCircle, tintColor: Color.Orange };
      accessoryColor = Color.Orange;
    }

    let gameTitle = game?.name ?? "Unknown";

    if (currentSport === "hockey") {
      gameTitle = game?.name?.replace(" at ", " vs ");
    }

    sportGameDay?.games.push(
      <List.Item
        key={index}
        title={gameTitle}
        icon={{
          source:
            game?.competitions?.[0]?.competitors?.[1]?.team?.logo ??
            `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`,
        }}
        accessories={[
          {
            text: { value: `${accessoryTitle ?? "No Date Found"}`, color: accessoryColor },
            tooltip: accessoryToolTip ?? "Unknown",
          },
          { icon: accessoryIcon },
        ]}
        actions={
          <ActionPanel>
            <Action.Push title="View Play by Play" icon={Icon.Sidebar} target={<Plays gameId={game.id} />} />
            <Action
              title="Refresh"
              icon={Icon.ArrowClockwise}
              onAction={scheduleRevalidate}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
            />
            <Action.OpenInBrowser
              title="View Game Details on ESPN"
              url={`${`https://www.espn.com/${currentLeague}`}`}
            />

            {currentSport !== "racing" ? (
              <>
                {game?.competitions?.[0]?.competitors?.[1]?.team.links?.length > 0 && (
                  <Action.OpenInBrowser
                    title={`View ${game?.competitions?.[0]?.competitors?.[1]?.team?.displayName ?? "Away"} Team Details`}
                    url={
                      game?.competitions?.[0]?.competitors?.[1]?.team?.links?.[0]?.href ??
                      `https://www.espn.com/${currentLeague}`
                    }
                  />
                )}
                {game.competitions?.[0]?.competitors?.[0]?.team?.links?.length > 0 && (
                  <Action.OpenInBrowser
                    title={`View ${game?.competitions?.[0]?.competitors?.[0]?.team?.displayName ?? "Home"} Team Details`}
                    url={
                      game?.competitions?.[0]?.competitors?.[0]?.team?.links?.[0]?.href ??
                      `https://www.espn.com/${currentLeague}`
                    }
                  />
                )}
              </>
            ) : (
              <>
                <Action.OpenInBrowser
                  title="View Race Details on ESPN"
                  url={`${game?.links?.[0].href ?? `https://www.espn.com/${currentLeague}`}`}
                />
                <Action.OpenInBrowser
                  title="View Circuit Details on ESPN"
                  url={`${game?.links?.[2].href ?? `https://www.espn.com/${currentLeague}`}`}
                />
              </>
            )}
          </ActionPanel>
        }
      />,
    );
  });

  if (scheduleLoading) {
    return <Detail isLoading={true} />;
  }

  if (!scheduleData) {
    return <Detail markdown="No data found." />;
  }

  gameItems.sort((a, b) => {
    const dateA = new Date(a.title);
    const dateB = new Date(b.title);
    return dateA.getTime() - dateB.getTime();
  });

  let subTitleText = "Game";

  if (currentSport === "racing") {
    subTitleText = "Race";
  }

  return (
    <>
      {gameItems?.map((sportGameDay, index) => (
        <List.Section
          key={index}
          title={`${sportGameDay?.title ?? "Unknown"}`}
          subtitle={`${sportGameDay?.games?.length} ${subTitleText}${sportGameDay?.games?.length !== 1 ? "s" : ""}`}
        >
          {sportGameDay?.games}
        </List.Section>
      ))}
    </>
  );
}
