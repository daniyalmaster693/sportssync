import { useFetch } from "@raycast/utils";
import getPastAndFutureDays from "./getDateRange";
import sportInfo from "./getSportInfo";

interface Athlete {
  shortName: string;
}

interface Competitor {
  athlete: Athlete;
  team: {
    abbreviation: string;
    displayName: string;
    logo: string;
    links: { href: string }[];
  };
  score: string;
  records?: { summary: string }[];
  probables?: { athlete: { displayName: string; headshot: string } }[];
}

interface Status {
  type: {
    state: string;
    completed?: boolean;
    detail?: string;
  };
  period?: number;
  displayClock?: string;
}

interface Competition {
  competitors: Competitor[];
  type: { id: number };
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

interface Response {
  events: Game[];
  day: { date: string };
}

export default function getScoresAndSchedule() {
  let dateRange = getPastAndFutureDays(new Date());
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  // F1 Specific Date Range

  const currentYear = new Date().getFullYear();

  if (currentLeague === "f1") {
    dateRange = `${currentYear}`;
  }

  const {
    isLoading: scheduleLoading,
    data: scheduleData,
    revalidate: scheduleRevalidate,
  } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/${currentSport}/${currentLeague}/scoreboard?dates=${dateRange}`,
  );

  return { scheduleData, scheduleLoading, scheduleRevalidate };
}
