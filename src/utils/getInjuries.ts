import { useFetch } from "@raycast/utils";
import sportInfo from "./getSportInfo";

interface Team {
  logos: { href: string }[];
  links: { href: string }[];
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

export default function getInjuries() {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const {
    isLoading: injuryLoading,
    data: injuryData,
    revalidate: injuryRevalidate,
  } = useFetch<Response>(`https://site.api.espn.com/apis/site/v2/sports/${currentSport}/${currentLeague}/injuries`);

  return { injuryData, injuryLoading, injuryRevalidate };
}
