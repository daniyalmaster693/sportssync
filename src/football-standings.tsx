import { List, Detail } from "@raycast/api";
import sportInfo from "./utils/getSportInfo";
import getTeamStandings from "./utils/getStandings";
import DisplayTeamStandings from "./templates/standings";

sportInfo.setSportAndLeague("football", "nfl");

const displaySchedule = () => {
  const { standingsLoading, standingsData } = getTeamStandings();

  if (standingsLoading) {
    return <Detail isLoading={true} />;
  }

  if (!standingsData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List searchBarPlaceholder="Search for a team" isLoading={standingsLoading}>
      <DisplayTeamStandings />
    </List>
  );
};

export default displaySchedule;
