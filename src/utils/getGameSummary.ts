import { useFetch } from "@raycast/utils";
import sportInfo from "./getSportInfo";

interface Response {
  header: any;
  boxscore: any;
  leaders: any;
  gameInfo: any;
}

export default function getTeamStandings() {
  const currentLeague = sportInfo.getLeague();
  const currentSport = sportInfo.getSport();

  const {
    isLoading: summaryLoading,
    data: summaryData,
    revalidate: summaryRevalidate,
  } = useFetch<Response>(
    `https://site.web.api.espn.com/apis/site/v2/sports/${currentSport}/${currentLeague}/summary?event=${gameId}`,
  );

  return { summaryData, summaryLoading, summaryRevalidate };
}
