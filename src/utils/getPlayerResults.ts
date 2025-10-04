import { useFetch } from "@raycast/utils";
import { LaunchProps } from "@raycast/api";

interface PlayerResults {
  type: String;
  totalFound: number;
  contents: ResultsList[];
}

interface ResultsList {
  uid: String;
  displayName: String;
  description: String;
  type: String;
  sport: String;
  defaultLeagueSlug: String;
  link: PlayerLinks[];
  image: PlayerHeadshot[];
}

interface PlayerLinks {
  app: String;
  web: String;
}

interface PlayerHeadshot {
  default: String;
  defaultDark: String;
}

interface PlayerResultsResponse {
  results: PlayerResults[];
}

export default function getPlayerResults(props: LaunchProps<{ arguments: Arguments.PlayerSearch }>) {
  const { name } = props.arguments;

  const {
    isLoading: playerSearchLoading,
    data: playerSearchData,
    revalidate: playerSearchRevalidate,
  } = useFetch<PlayerResultsResponse>(`https://site.web.api.espn.com/apis/search/v2?limit=10&query=${name}`);

  return { playerSearchData, playerSearchLoading, playerSearchRevalidate };
}
