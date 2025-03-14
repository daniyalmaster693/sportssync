import { useFetch } from "@raycast/utils";
import sportInfo from "./getSportInfo";

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

interface Team {
  logos: { href: string }[];
  links: { href: string }[];
  displayName: string;
}

interface NHLTransaction {
  date: string;
  description: string;
  team: Team;
}

interface DayItems {
  title: string;
  transactions: JSX.Element[];
}

interface Response {
  transactions: NHLTransaction[];
}

export default function getTransactions() {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const {
    isLoading: transactionLoading,
    data: transactionData,
    revalidate: transactionRevalidate,
  } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/${currentSport}/${currentLeague}/transactions?limit=75`,
  );

  return { transactionData, transactionLoading, transactionRevalidate };
}
