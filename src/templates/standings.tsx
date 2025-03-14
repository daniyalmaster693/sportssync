import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import getTeamStandings from "../utils/getStandings";
import sportInfo from "../utils/getSportInfo";
// import Plays from "../views/roster";

export default function DisplayTeamStandings() {
  const { standingsLoading, standingsData, standingsRevalidate } = getTeamStandings();
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const items1 = standingsData?.children?.[0]?.standings?.entries || [];
  const items2 = standingsData?.children?.[1]?.standings?.entries || [];

  const conference1 = items1.map((team1, index) => {
    let playoffPosition = 0;

    let tagColor;
    let tagIcon;
    let tagTooltip;

    let stat1;
    let stat2;
    let stat3;
    let stat4;
    let stat5;

    if (currentLeague === "nhl") {
      stat1 = `${team1?.stats[3]?.displayValue ?? "0"} GP`;
      stat2 = `${team1?.stats[21]?.summary ?? "0-0-0"}`;
      stat3 = `${team1?.stats[7]?.displayValue ?? "0"} pts`;
      stat4 = `GF: ${team1?.stats[9]?.displayValue ?? "0"}`;
      stat5 = `GA: ${team1?.stats[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[5]?.displayValue);
    }

    if (currentLeague === "nba") {
      stat1 = team1?.stats?.[15]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[13]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[11]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[10]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[7]?.displayValue);
    }

    if (currentLeague === "wnba") {
      stat1 = team1?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[14]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[12]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[11]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[8]?.displayValue);
    }

    if (currentLeague === "nfl") {
      stat1 = team1?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team1?.stats?.[10]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team1?.stats?.[7]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team1?.stats?.[6]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team1?.stats?.[5]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[4]?.displayValue);
    }

    if (currentLeague === "mlb") {
      stat1 = `${team1?.stats[7]?.displayValue ?? "0"} GP`;
      stat2 = `${team1?.stats[32]?.displayValue ?? "0-0"}`;
      stat3 = `Pct: ${(Number(team1?.stats[8]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat4 = `PF: ${team1?.stats[14]?.displayValue ?? "0"}`;
      stat5 = `PA: ${team1?.stats[13]?.displayValue ?? "0"}`;
      playoffPosition = Number(team1?.stats?.[10]?.displayValue);
    }

    if (currentSport === "soccer") {
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

    if (currentLeague === "wnba") {
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

    if (currentSport === "football") {
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

    if (currentSport === "baseball") {
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

    if (currentSport === "soccer") {
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

    return (
      <List.Item
        key={index}
        title={`${team1?.team?.displayName ?? "Unknown"}`}
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
        icon={{
          source:
            team1?.team?.logos?.[0]?.href ??
            `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`,
        }}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              title={`View ${team1?.team?.displayName ?? "Team"} Details on ESPN`}
              url={`${team1?.team?.links?.[0]?.href ?? `https://www.espn.com/${currentLeague}`}`}
            />
            <Action
              title="Refresh"
              icon={Icon.ArrowClockwise}
              onAction={standingsRevalidate}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
            ></Action>
          </ActionPanel>
        }
      />
    );
  });

  const conference2 = items2.map((team2, index) => {
    let playoffPosition = 0;

    let tagColor;
    let tagIcon;
    let tagTooltip;

    let stat1;
    let stat2;
    let stat3;
    let stat4;
    let stat5;

    if (currentLeague === "nhl") {
      stat1 = `${team2?.stats[3]?.displayValue ?? "0"} GP`;
      stat2 = `${team2?.stats[21]?.summary ?? "0-0-0"}`;
      stat3 = `${team2?.stats[7]?.displayValue ?? "0"} pts`;
      stat4 = `GF: ${team2?.stats[9]?.displayValue ?? "0"}`;
      stat5 = `GA: ${team2?.stats[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team2?.stats?.[5]?.displayValue);
    }

    if (currentLeague === "nba") {
      stat1 = team2?.stats?.[15]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team2?.stats?.[13]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team2?.stats?.[11]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team2?.stats?.[10]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team2?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team2?.stats?.[7]?.displayValue);
    }

    if (currentLeague === "wnba") {
      stat1 = team2?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team2?.stats?.[14]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team2?.stats?.[12]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team2?.stats?.[11]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team2?.stats?.[8]?.displayValue ?? "0"}`;
      playoffPosition = Number(team2?.stats?.[8]?.displayValue);
    }

    if (currentLeague === "nfl") {
      stat1 = team2?.stats?.[16]?.displayValue ?? "0-0";
      stat2 = `Pct: ${(Number(team2?.stats?.[10]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat3 = `PF: ${team2?.stats?.[7]?.displayValue ?? "0"}`;
      stat4 = `PA: ${team2?.stats?.[6]?.displayValue ?? "0"}`;
      stat5 = `Dif: ${team2?.stats?.[5]?.displayValue ?? "0"}`;
      playoffPosition = Number(team2?.stats?.[4]?.displayValue);
    }

    if (currentLeague === "mlb") {
      stat1 = `${team2?.stats[7]?.displayValue ?? "0"} GP`;
      stat2 = `${team2?.stats[32]?.displayValue ?? "0-0"}`;
      stat3 = `Pct: ${(Number(team2?.stats[8]?.displayValue) * 100).toFixed(1) ?? "0"}%`;
      stat4 = `PF: ${team2?.stats[14]?.displayValue ?? "0"}`;
      stat5 = `PA: ${team2?.stats[13]?.displayValue ?? "0"}`;
      playoffPosition = Number(team2?.stats?.[10]?.displayValue);
    }

    if (currentSport === "soccer") {
      stat1 = `${team2.stats[0].displayValue ?? "0"} GP`;
      stat2 = `${team2.stats[12].displayValue ?? "0-0-0"}`;
      stat3 = `${team2.stats[3].displayValue ?? "0"} pts`;
      stat4 = `${team2.stats[5].displayValue ?? "0"} GF`;
      stat5 = `${team2.stats[4].displayValue ?? "0"} GA`;
      playoffPosition = Number(team2?.stats?.[10]?.displayValue);
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

    if (currentLeague === "wnba") {
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

    if (currentSport === "football") {
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

    if (currentSport === "baseball") {
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

    if (currentSport === "soccer") {
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

    return (
      <List.Item
        key={index}
        title={`${team2?.team?.displayName ?? "Unknown"}`}
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
        icon={{
          source:
            team2?.team?.logos?.[0]?.href ??
            `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`,
        }}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              title={`View ${team2?.team?.displayName ?? "Team"} Details on ESPN`}
              url={`${team2?.team?.links?.[0]?.href ?? `https://www.espn.com/${currentLeague}`}`}
            />
            <Action
              title="Refresh"
              icon={Icon.ArrowClockwise}
              onAction={standingsRevalidate}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
            ></Action>
          </ActionPanel>
        }
      />
    );
  });

  if (standingsLoading) {
    return <Detail isLoading={true} />;
  }

  if (currentLeague === "nba") {
    conference1.reverse();
    conference2.reverse();
  }

  const conferenceTitle1 = standingsData?.children[0]?.name ?? "Conference 1";
  const conferenceTitle2 = standingsData?.children[1]?.name ?? "Conference 2";

  return (
    <>
      <List.Section title={`${conferenceTitle1}`}>{conference1}</List.Section>
      <List.Section title={`${conferenceTitle2}`}>{conference2}</List.Section>
    </>
  );
}
