import { useFetch } from "@raycast/utils";
import sportInfo from "./getSportInfo";

interface GameHeader {
  links: { href: string }[];
  competitions: {
    competitors: { team: { links: { href: string }[] } }[];
  }[];
}

type RosterTeamInfo = {
  homeAway: string;
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    color: string;
    alternateColor: string;
    logos: Array<{ href: string }>;
  };
  roster: RosterPlayer[];
};

type RosterPlayer = {
  active: boolean;
  starter: boolean;
  athlete: {
    id: string;
    uid: string;
    guid: string;
    lastName: string;
    fullName: string;
    displayName: string;
    headshot: {
      href: string;
      alt: string;
    };
    positions: Array<{
      $ref: string;
      id: string;
      name: string;
      displayName: string;
      abbreviation: string;
    }>;
  };
};
export interface PlayByPlayData {
  header: GameHeader;
  boxscore: {
    teams: {
      team: { id: string; logo: string; displayName: string };
    }[];
  };
  plays: Array<{
    type: { text: string };
    period: { number: string; type: string };
    clock: { displayValue: string };
    team: { id: string };
    text: string;
  }>;
  rosters?: RosterTeamInfo[];
}

export default function getPlayByPlayEvents({ gameId }: { gameId: string }) {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const {
    isLoading: playByPlayLoading,
    data: playByPlayEventData,
    revalidate: playByPlayRevalidate,
  } = useFetch<PlayByPlayData>(
    `https://site.web.api.espn.com/apis/site/v2/sports/${currentSport}/${currentLeague}/summary?event=${gameId}`,
  );

  return { playByPlayEventData, playByPlayLoading, playByPlayRevalidate };
}
