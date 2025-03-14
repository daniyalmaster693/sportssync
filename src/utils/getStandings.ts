import { useFetch } from "@raycast/utils";
import sportInfo from "./getSportInfo";

interface Stats {
  displayValue: string;
  summary: string;
}

interface Team {
  displayName: string;
  logos: { href: string }[];
  links: { href: string }[];
}

interface StandingsEntry {
  team: Team;
  stats: Stats[];
}

interface StandingsData {
  links: [
    {
      href: string;
    },
  ];

  children: [
    {
      name: string;
      standings: {
        entries: StandingsEntry[];
      };
    },
    {
      name: string;
      standings: {
        entries: StandingsEntry[];
      };
    },
  ];
}

export default function getTeamStandings() {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const {
    isLoading: standingsLoading,
    data: standingsData,
    revalidate: standingsRevalidate,
  } = useFetch<StandingsData>(
    `https://site.web.api.espn.com/apis/v2/sports/${currentSport}/${currentLeague}/standings`,
  );

  return { standingsData, standingsLoading, standingsRevalidate };
}
