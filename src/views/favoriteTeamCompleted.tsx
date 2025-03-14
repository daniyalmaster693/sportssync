import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  name: string;
  id?: string;
}

const preferences = getPreferenceValues<Preferences>();

const favoriteTeam = getPreferenceValues().team as string;
const favoriteLeague = getPreferenceValues().league as string;
const favoriteSport = getPreferenceValues().sport as string;

interface Competitor {
  team: {
    logos: any;
    abbreviation: string;
    displayName: string;
    logo: string;
    links: { href: string }[];
  };
  score: {
    displayValue: string;
  };
  records?: { summary: string }[];
  probables?: { athlete: { displayName: string; headshot: string } }[];
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
  status: Status;
  venue: {
    fullName: string;
    indoor: boolean;
    address: {
      city: string;
      state: string;
      country: string;
    };
  };
  tickets: [
    {
      summary: string;
    },
  ];
  season: {
    year: string;
    slug: string;
  };
}

interface Game {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: Status;
  competitions: Competition[];
  links: { href: string }[];
  season: {
    year: string;
    slug: string;
  };
  displayName: string;
}

interface DayItems {
  title: string;
  games: JSX.Element[];
}

interface Response {
  events: Game[];
  day: { date: string };
}

export default function CompletedGames() {
  // Fetch NHL Stats

  const {
    isLoading: nhlScheduleStats,
    data: nhlScoresAndSchedule,
    revalidate,
  } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/teams/${favoriteTeam}/schedule`,
  );

  if (nhlScheduleStats) {
    return <Detail isLoading={true} />;
  }

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

    let accessoryTitle = `${nhlGame?.competitions[0]?.competitors[1]?.team?.abbreviation} ${nhlGame?.competitions?.[0]?.competitors[1]?.score?.displayValue} - ${nhlGame?.competitions[0]?.competitors[0]?.team?.abbreviation} ${nhlGame?.competitions?.[0]?.competitors[0]?.score?.displayValue}`;
    let accessoryColor = Color.SecondaryText;
    let accessoryIcon = { source: Icon.CheckCircle, tintColor: Color.SecondaryText };
    let accessoryToolTip = "Final";

    if (
      nhlGame?.competitions[0]?.status?.type?.state === "post" &&
      nhlGame?.competitions[0]?.status?.type?.completed === false
    ) {
      accessoryTitle = `Postponed`;
      accessoryIcon = { source: Icon.XMarkCircle, tintColor: Color.Orange };
      accessoryColor = Color.Orange;
    }

    if (nhlGame?.competitions?.[0]?.status?.type?.completed === true)
      nhlDay?.games.push(
        <List.Item
          key={index}
          title={nhlGame?.name?.replace(" at ", " vs ")}
          icon={{ source: nhlGame?.competitions[0]?.competitors[1]?.team?.logos[0].href }}
          accessories={[
            {
              text: { value: `${accessoryTitle ?? "No Date Found"}`, color: accessoryColor },
              tooltip: accessoryToolTip ?? "Unknown",
            },
            { icon: accessoryIcon },
          ]}
          actions={
            <ActionPanel>
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={revalidate}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              ></Action>
              <Action.OpenInBrowser
                title="View Game Details on ESPN"
                url={`${nhlGame?.links[0]?.href ?? "https://www.espn.com/nhl"}`}
              />

              {nhlGame?.competitions[0]?.competitors[1]?.team.links?.length > 0 && (
                <Action.OpenInBrowser
                  title="View Away Team Details"
                  url={nhlGame?.competitions[0]?.competitors[1]?.team?.links[0]?.href ?? "https://www.espn.com/nhl"}
                />
              )}

              {nhlGame.competitions[0]?.competitors[0]?.team?.links?.length > 0 && (
                <Action.OpenInBrowser
                  title="View Home Team Details"
                  url={nhlGame?.competitions[0]?.competitors[0]?.team?.links[0]?.href ?? "https://www.espn.com/nhl"}
                />
              )}
            </ActionPanel>
          }
        />,
      );
  });

  nhlDayItems.reverse();

  return (
    <>
      {nhlDayItems?.map((nhlDay, index) => (
        <List.Section
          key={index}
          title={nhlDay?.title}
          subtitle={`${nhlDay?.games?.length} Game${nhlDay?.games?.length !== 1 ? "s" : ""}`}
        >
          {nhlDay?.games}
        </List.Section>
      ))}
    </>
  );
}
