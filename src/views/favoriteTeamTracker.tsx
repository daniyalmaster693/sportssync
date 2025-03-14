import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  name: string;
  id?: string;
}

interface Article {
  headline: string;
  published: string;
  byline?: string;
  description?: string;
  type: string;
  images: { url: string }[];
  links: { web: { href: string } };
}

interface ArticleDayItems {
  title: string;
  articles: JSX.Element[];
}

interface ArticlesResponse {
  articles: Article[];
}

interface Address {
  city: string;
  state: string;
  country: string;
}

interface Venue {
  fullName: string;
  address: Address;
}

interface Team {
  id: string;
  displayName: string;
  nickname: string;
  logos: { href: string }[];
  links: { href: string }[];
  franchise: Franchise;
}

interface Franchise {
  displayName: string;
  abbreviation: string;
  venue: Venue;
  team: Team;
}

interface TeamStats {
  displayValue: string;
  summary: string;
}

interface StandingsTeam {
  team: Team;
  stats: TeamStats[];
}

interface StandingsData {
  standings: {
    entries: StandingsTeam[];
  };
}

interface Athlete {
  displayName: string;
  position: { displayName: string };
  team: Team;
  links: { href: string }[];
}

interface Injury {
  injuries: any;
  athlete: Athlete;
  status: string;
  details?: { returnDate: string };
}

interface Response {
  season: { displayName: string };
  injuries: Injury[];
}

interface NHLTransaction {
  date: string;
  description: string;
  team: Team;
}

interface TransactionDayItems {
  title: string;
  transactions: JSX.Element[];
}

interface Response {
  transactions: NHLTransaction[];
}

async function getFavoriteTeamID() {
  const preferences = getPreferenceValues<Preferences>();
}

const favoriteTeam = getPreferenceValues().team as string;
const favoriteLeague = getPreferenceValues().league as string;
const favoriteSport = getPreferenceValues().sport as string;

export default function TeamInjuries() {
  // Fetch Team Information

  const { isLoading: franchiseStats, data: franchiseData } = useFetch<Franchise>(
    `https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/teams/${favoriteTeam}`,
  );

  const franchise = franchiseData?.team?.franchise;

  const { isLoading, data } = useFetch<StandingsData>(
    `https://site.web.api.espn.com/apis/v2/sports/${favoriteSport}/${favoriteLeague}/standings?level=1`,
  );

  const teamPositionItems = data?.standings?.entries ?? [];

  const teamPosition = teamPositionItems.map((team1, index) => {
    let playoffPosition = 0;

    let tagColor;
    let tagIcon;
    let tagTooltip;

    let stat1;
    let stat2;
    let stat3;
    let stat4;
    let stat5;

    if (favoriteLeague === "nhl") {
      stat1 = `${team1?.stats[3]?.displayValue ?? "0"} GP`;
      stat2 = `${team1?.stats[21]?.summary ?? "0-0-0"}`;
      stat3 = `${team1?.stats[7]?.displayValue ?? "0"} pts`;
      stat4 = `GF: ${team1?.stats[9]?.displayValue ?? "0"}`;
      stat5 = `GA: ${team1?.stats[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[5]?.displayValue);
    }

    if (favoriteLeague === "nba") {
      stat1 = team1?.stats?.[15]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[13]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[11]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[10]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[7]?.displayValue);
    }

    if (favoriteLeague === "wnba") {
      stat1 = team1?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[14]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[12]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[11]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[8]?.displayValue);
    }

    if (favoriteLeague === "nfl") {
      stat1 = team1?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[10]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[7]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[6]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[5]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[4]?.displayValue);
    }

    if (favoriteLeague === "mlb") {
      stat1 = `${team1?.stats[7]?.displayValue ?? "0"} GP`;
      stat2 = `${team1?.stats[32]?.displayValue ?? "0-0"}`;
      stat3 = `Pct: ${(Number(team1?.stats[8]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat4 = `PF: ${team1?.stats[14]?.displayValue ?? "0"}`;
      stat5 = `PA: ${team1?.stats[13]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[10]?.displayValue);
    }

    if (favoriteLeague === "soccer") {
      stat1 = `${team1.stats[0].displayValue ?? "0"} GP`;
      stat2 = `${team1.stats[12].displayValue ?? "0-0-0"}`;
      stat3 = `${team1.stats[3].displayValue ?? "0"} pts`;
      stat4 = `${team1.stats[5].displayValue ?? "0"} GF`;
      stat5 = `${team1.stats[4].displayValue ?? "0"} GA`;
      playoffPosition = Number(team1?.stats?.[10]?.displayValue);
    }

    if (playoffPosition === 1) {
      tagColor = Color.Yellow;
      tagIcon = Icon.Trophy;
      tagTooltip = "1st in Conference";
    } else if (playoffPosition >= 2 && playoffPosition <= 8) {
      tagColor = Color.Green;
      tagIcon = Icon.Leaderboard;
      tagTooltip = "Playoff Contender";
    } else if (playoffPosition >= 9 && playoffPosition <= 15) {
      tagColor = Color.Orange;
      tagIcon = Icon.XMarkCircle;
      tagTooltip = "Not in Playoffs";
    } else if (playoffPosition === 16) {
      tagColor = Color.Red;
      tagIcon = Icon.Xmark;
      tagTooltip = "Last in Conference";
    } else {
      tagColor = Color.SecondaryText;
    }

    if (favoriteLeague === "wnba") {
      if (playoffPosition === 1) {
        tagColor = Color.Yellow;
        tagIcon = Icon.Trophy;
        tagTooltip = "1st in Conference";
      } else if (playoffPosition >= 2 && playoffPosition <= 4) {
        tagColor = Color.Green;
        tagIcon = Icon.Leaderboard;
        tagTooltip = "Playoff Contender";
      } else if (playoffPosition >= 4 && playoffPosition <= 5) {
        tagColor = Color.Orange;
        tagIcon = Icon.XMarkCircle;
        tagTooltip = "Not in Playoffs";
      } else if (playoffPosition === 6) {
        tagColor = Color.Red;
        tagIcon = Icon.Xmark;
        tagTooltip = "Last in Conference";
      } else {
        tagColor = Color.SecondaryText;
      }
    }

    if (favoriteSport === "football") {
      if (playoffPosition === 1) {
        tagColor = Color.Yellow;
        tagIcon = Icon.Trophy;
        tagTooltip = "1st in Conference";
      } else if (playoffPosition >= 2 && playoffPosition <= 7) {
        tagColor = Color.Green;
        tagIcon = Icon.Leaderboard;
        tagTooltip = "Playoff Contender";
      } else if (playoffPosition >= 8 && playoffPosition <= 15) {
        tagColor = Color.Orange;
        tagIcon = Icon.XMarkCircle;
        tagTooltip = "Not in Playoffs";
      } else if (playoffPosition === 16) {
        tagColor = Color.Red;
        tagIcon = Icon.Xmark;
        tagTooltip = "Last in Conference";
      } else {
        tagColor = Color.SecondaryText;
      }
    }

    if (favoriteSport === "baseball") {
      if (playoffPosition === 1) {
        tagColor = Color.Yellow;
        tagIcon = Icon.Trophy;
        tagTooltip = "1st in Conference";
      } else if (playoffPosition >= 2 && playoffPosition <= 6) {
        tagColor = Color.Green;
        tagIcon = Icon.Leaderboard;
        tagTooltip = "Playoff Contender";
      } else if (playoffPosition >= 7 && playoffPosition <= 14) {
        tagColor = Color.Orange;
        tagIcon = Icon.XMarkCircle;
        tagTooltip = "Not in Playoffs";
      } else if (playoffPosition === 15) {
        tagColor = Color.Red;
        tagIcon = Icon.Xmark;
        tagTooltip = "Last in Conference";
      } else {
        tagColor = Color.SecondaryText;
      }
    }

    if (favoriteSport === "soccer") {
      if (playoffPosition === 1) {
        tagColor = Color.Yellow;
        tagIcon = Icon.Trophy;
      } else if (playoffPosition >= 2) {
        tagColor = Color.Green;
        tagIcon = Icon.Leaderboard;
      } else {
        tagColor = Color.SecondaryText;
      }
    }

    if (team1.team.id === `${favoriteTeam}`)
      return (
        <List.Item
          key={index}
          title={`${team1?.team?.displayName}`}
          icon={{ source: team1?.team?.logos[0]?.href }}
          accessories={[
            {
              text: `${stat1} | ${stat2} | ${stat3} | ${stat4} | ${stat5}`,
            },
            {
              tag: { value: `${playoffPosition}`, color: tagColor },
              icon: tagIcon,
              tooltip: tagTooltip,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="View Team Details on ESPN"
                url={`${team1?.team?.links[0]?.href ?? "https://www.espn.com"}`}
              />
            </ActionPanel>
          }
        />
      );
  });

  const {
    isLoading: articleLoading,
    data: articleData,
    revalidate: articleRevalidate,
  } = useFetch<ArticlesResponse>(
    `https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/news?limit=200`,
  );

  const articleDayItems: ArticleDayItems[] = [];
  const articles = articleData?.articles || [];

  articles?.forEach((article, index) => {
    const articleDate = new Date(article?.published ?? "Unknown").toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const articleHeadline = article?.headline ?? "No Headline Found";
    let articleType = article?.type ?? "Unknown";

    if (articleType === "HeadlineNews") {
      articleType = "Headline";
    }

    let articleDayItem = articleDayItems?.find((item) => item?.title === articleDate);

    if (!articleDayItem) {
      articleDayItem = { title: articleDate, articles: [] };
      articleDayItems.push(articleDayItem);
    }

    const favoriteTeamName = franchiseData?.team?.nickname.toString() ?? "Unknown";

    if (article.headline.includes(favoriteTeamName))
      articleDayItem?.articles.push(
        <List.Item
          key={index}
          title={`${articleHeadline}`}
          icon={{
            source:
              article?.images[0]?.url ??
              `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${favoriteLeague}.png&w=100&h=100&transparent=true`,
          }}
          accessories={[
            { tag: { value: articleType, color: Color.Green }, icon: Icon.Megaphone, tooltip: "Category" },
            { icon: Icon.Megaphone },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="View Article on ESPN"
                url={`${article?.links?.web?.href ?? `https://www.espn.com/${favoriteLeague}`}`}
              />
              <Action.CopyToClipboard
                title="Copy Article Link"
                content={`${article?.links?.web?.href ?? `https://www.espn.com/${favoriteLeague}`}`}
              ></Action.CopyToClipboard>
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={articleRevalidate}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              ></Action>
            </ActionPanel>
          }
        />,
      );
  });

  const {
    isLoading: nhlInjuryStatus,
    data: nhlInjuryData,
    revalidate: injuryRevalidate,
  } = useFetch<Response>(`https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/injuries`);

  const nhlInjuryItems = nhlInjuryData?.injuries.flatMap((injuryItem) => injuryItem.injuries) || [];
  const nhlInjuryArray = nhlInjuryItems?.map((nhlInjury, index) => {
    const articleDate = nhlInjury?.details?.returnDate ?? "";

    if (!articleDate) {
      return null;
    }

    let tagColor = Color.SecondaryText;
    let accessoryIcon = { source: Icon.MedicalSupport, tintColor: Color.SecondaryText };

    if (nhlInjury.status === "Day-To-Day") {
      tagColor = Color.Yellow;
      accessoryIcon = { source: Icon.MedicalSupport, tintColor: Color.Yellow };
    }

    if (nhlInjury.status === "Out") {
      tagColor = Color.Orange;
      accessoryIcon = { source: Icon.MedicalSupport, tintColor: Color.Orange };
    }

    if (nhlInjury.status === "Injured Reserve" || nhlInjury.status === "Questionable") {
      tagColor = Color.Red;
      accessoryIcon = { source: Icon.MedicalSupport, tintColor: Color.Red };
    }

    if (nhlInjury.status === "Suspension") {
      tagColor = Color.Orange;
      accessoryIcon = { source: Icon.Warning, tintColor: Color.Orange };
    }

    if (nhlInjury.athlete.team.id === `${favoriteTeam}`)
      return (
        <List.Item
          key={index}
          title={`${nhlInjury.athlete.displayName}`}
          subtitle={`${nhlInjury.athlete.position.displayName}`}
          icon={{ source: nhlInjury.athlete.team.logos[0].href }}
          accessories={[
            {
              tag: { value: nhlInjury.status.replace(/-/g, " "), color: tagColor },
              tooltip: "Status",
            },
            { text: articleDate, tooltip: "Est. Return Date" },
            { icon: accessoryIcon },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="View Player Details on ESPN"
                url={`${nhlInjury.athlete.links[0]?.href ?? "https://www.espn.com"}`}
              />
              <Action.OpenInBrowser
                title="View Team Details on ESPN"
                url={`${nhlInjury.athlete.team.links[0]?.href ?? "https://www.espn.com"}`}
              />
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={injuryRevalidate}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              ></Action>
            </ActionPanel>
          }
        />
      );
  });

  const {
    isLoading: nhlTransactionStatus,
    data: nhlTransactionsData,
    revalidate: transactionRevalidate,
  } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/transactions?limit=200`,
  );

  const nhlTransactionDayItems: TransactionDayItems[] = [];
  const nhlTransactions = nhlTransactionsData?.transactions || [];

  const nhlTransactionItems = nhlTransactions?.map((nhlTransaction, index) => {
    const transactionDate = new Date(nhlTransaction.date ?? "Unknown").toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const nhlGameDay = transactionDate;

    let transactionDayItem = nhlTransactionDayItems.find((item) => item.title === nhlGameDay);

    if (!transactionDayItem) {
      transactionDayItem = { title: nhlGameDay, transactions: [] };
      nhlTransactionDayItems.push(transactionDayItem);
    }

    if (nhlTransaction.team.id === `${favoriteTeam}`)
      transactionDayItem?.transactions.push(
        <List.Item
          key={index}
          title={`${nhlTransaction?.description ?? "Unknown"}`}
          icon={{ source: nhlTransaction?.team.logos[0]?.href }}
          accessories={[{ icon: Icon.Switch }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="View Team Details on ESPN"
                url={`${nhlTransaction?.team.links[0]?.href ?? "https://www.espn.com"}`}
              />
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={transactionRevalidate}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              ></Action>
            </ActionPanel>
          }
        />,
      );
  });

  const city = franchise?.venue?.address.city;
  const country = franchise?.venue?.address.country;
  const state = franchise?.venue?.address.state;
  const address = `${city}, ${state}, ${country}`;

  if (!data || !nhlInjuryData || !nhlTransactionsData || !franchiseData) {
    return <Detail markdown="No data found." />;
  }

  if (isLoading || nhlInjuryStatus || nhlTransactionStatus || franchiseStats || articleLoading) {
    return <Detail isLoading={true} />;
  }

  return (
    <>
      <List.Section title="Team Information">
        <List.Item
          title={`${franchise?.displayName} (${franchise?.abbreviation})`}
          icon={{ source: franchiseData?.team?.logos?.[0]?.href }}
          accessories={[
            {
              tag: { value: address, color: Color.Yellow },
              icon: Icon.Map,
              tooltip: "Location",
            },
            {
              tag: { value: franchise?.venue?.fullName, color: Color.Yellow },
              icon: Icon.Building,
              tooltip: "Venue",
            },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="View Team Details on ESPN"
                url={`${franchiseData.team.links[0].href ?? "https://www.espn.com"}`}
              />
            </ActionPanel>
          }
        />
        {teamPosition}
      </List.Section>

      <List.Section title="Injury Status">{nhlInjuryArray}</List.Section>

      {articleDayItems.map((articleDayItem, index) => (
        <List.Section
          key={index}
          title={`Article${articleDayItem.articles.length !== 1 ? "s" : ""}`}
          subtitle={`${articleDayItem?.title ?? "Articles"}`}
        >
          {articleDayItem?.articles}
        </List.Section>
      ))}

      {nhlTransactionDayItems.map((transactionDayItem, index) => (
        <List.Section
          key={index}
          title={`Transaction${transactionDayItem.transactions.length !== 1 ? "s" : ""}`}
          subtitle={`${transactionDayItem.title}`}
        >
          {transactionDayItem.transactions}
        </List.Section>
      ))}
    </>
  );
}
