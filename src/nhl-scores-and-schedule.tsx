<<<<<<< HEAD
import { List } from "@raycast/api";
import sportInfo from "./utils/getSportInfo";
import getScoresAndSchedule from "./utils/getSchedule";
import DisplayScoresAndSchedule from "./templates/scores-and-schedule";
=======
import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import getPastAndFutureDays from "./utils/getDateRange";

interface Competitor {
  team: {
    abbreviation: string;
    logo: string;
    links: { href: string }[];
  };
  score: string;
}

interface Status {
  type: {
    state: string;
    completed?: boolean;
  };
  period?: number;
  displayClock?: string;
}

interface Competition {
  competitors: Competitor[];
  type: { id: number };
}

interface Game {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: Status;
  competitions: Competition[];
  links: { href: string }[];
}

interface DayItems {
  title: string;
  games: JSX.Element[];
}

interface Response {
  events: Game[];
  day: { date: string };
}
>>>>>>> contributions/merge-1743277393899

sportInfo.setSportAndLeague("hockey", "nhl");

<<<<<<< HEAD
const displaySchedule = () => {
  const { scheduleLoading } = getScoresAndSchedule();

  return (
    <List searchBarPlaceholder="Search for a game or team" isLoading={scheduleLoading}>
      <DisplayScoresAndSchedule />
=======
  const dateRange = getPastAndFutureDays(new Date());

  const { isLoading: nhlScheduleStats, data: nhlScoresAndSchedule } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?dates=${dateRange}`,
  );

  const nhlDayItems: DayItems[] = [];
  const nhlGames = nhlScoresAndSchedule?.events || [];

  nhlGames?.forEach((nhlGame, index) => {
    const gameDate = new Date(nhlGame?.date);
    const nhlGameDay = gameDate?.toLocaleDateString([], {
      dateStyle: "medium",
    });

    if (!nhlDayItems?.find((nhlDay) => nhlDay?.title === nhlGameDay)) {
      nhlDayItems?.push({
        title: nhlGameDay,
        games: [],
      });
    }

    const nhlDay = nhlDayItems?.find((nhlDay) => nhlDay?.title === nhlGameDay);

    const gameTime = new Date(nhlGame?.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let accessoryTitle = gameTime;
    let accessoryColor = Color.SecondaryText;
    let accessoryIcon = { source: Icon.Calendar, tintColor: Color.SecondaryText };
    let accessoryToolTip = "Scheduled";

    const startingSoonInterval = 15 * 60 * 1000;
    const currentDate = new Date();
    const timeUntilGameStarts = gameDate.getTime() - currentDate.getTime();

    if (timeUntilGameStarts <= startingSoonInterval && nhlGame?.status?.type?.state === "pre") {
      accessoryColor = Color.Yellow;
      accessoryIcon = { source: Icon.Warning, tintColor: Color.Yellow };
      accessoryToolTip = "Starting Soon";
    }

    if (nhlGame?.status?.type?.state === "in") {
      accessoryTitle = `${nhlGame?.competitions[0]?.competitors[1]?.team.abbreviation} ${nhlGame?.competitions[0]?.competitors[1]?.score} - ${nhlGame?.competitions[0]?.competitors[0]?.team?.abbreviation} ${nhlGame?.competitions[0]?.competitors[0]?.score}     P${nhlGame?.status?.period} ${nhlGame?.status?.displayClock}`;
      accessoryColor = Color.Green;
      accessoryIcon = { source: Icon.Livestream, tintColor: Color.Green };
      accessoryToolTip = "In Progress";
    }

    if (nhlGame?.status?.type?.state === "post") {
      accessoryTitle = `${nhlGame?.competitions[0]?.competitors[1]?.team?.abbreviation} ${nhlGame?.competitions[0]?.competitors[1]?.score} - ${nhlGame?.competitions[0]?.competitors[0]?.team?.abbreviation} ${nhlGame?.competitions[0]?.competitors[0]?.score}`;
      accessoryColor = Color.SecondaryText;
      accessoryIcon = { source: Icon.CheckCircle, tintColor: Color.SecondaryText };
      accessoryToolTip = "Final";
    }

    if (nhlGame?.status?.type?.state === "post" && nhlGame?.status?.type?.completed === false) {
      accessoryTitle = `Postponed`;
      accessoryIcon = { source: Icon.XMarkCircle, tintColor: Color.Orange };
      accessoryColor = Color.Orange;
    }

    nhlDay?.games.push(
      <List.Item
        key={index}
        title={nhlGame?.name?.replace(" at ", " vs ")}
        icon={{ source: nhlGame?.competitions[0]?.competitors[1]?.team?.logo }}
        accessories={[
          {
            text: { value: `${accessoryTitle ?? "No Date Found"}`, color: accessoryColor },
            tooltip: accessoryToolTip ?? "Unknown",
          },
          { icon: accessoryIcon },
        ]}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              title="View Game Details on ESPN"
              url={`${nhlGame?.links[0]?.href ?? "https://www.espn.com"}`}
            />
            {nhlGame?.competitions[0]?.competitors[1]?.team.links?.length > 0 && (
              <Action.OpenInBrowser
                title="View Away Team Details"
                url={nhlGame?.competitions[0]?.competitors[1]?.team?.links[0]?.href ?? "https://www.espn.com"}
              />
            )}
            {nhlGame.competitions[0]?.competitors[0]?.team?.links?.length > 0 && (
              <Action.OpenInBrowser
                title="View Home Team Details"
                url={nhlGame?.competitions[0]?.competitors[0]?.team?.links[0]?.href ?? "https://www.espn.com"}
              />
            )}
          </ActionPanel>
        }
      />,
    );
  });

  if (nhlScheduleStats) {
    return <Detail isLoading={true} />;
  }

  if (!nhlScoresAndSchedule) {
    return <Detail markdown="No data found." />;
  }

  nhlDayItems.sort((a, b) => {
    const dateA = new Date(a.title);
    const dateB = new Date(b.title);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <List searchBarPlaceholder="Search for your favorite team" isLoading={nhlScheduleStats}>
      {nhlDayItems?.map((nhlDay, index) => (
        <List.Section
          key={index}
          title={`${nhlDay?.title}`}
          subtitle={`${nhlDay?.games?.length} Game${nhlDay?.games?.length !== 1 ? "s" : ""}`}
        >
          {nhlDay?.games}
        </List.Section>
      ))}
>>>>>>> contributions/merge-1743277393899
    </List>
  );
};

export default displaySchedule;
