import { List, Detail } from "@raycast/api";
import sportInfo from "./utils/getSportInfo";
import getScoresAndSchedule from "./utils/getSchedule";
import DisplayScoresAndSchedule from "./templates/scores-and-schedule";

sportInfo.setSportAndLeague("baseball", "mlb");

const displaySchedule = () => {
  const { scheduleLoading, scheduleData } = getScoresAndSchedule();

  if (scheduleLoading) {
    return <Detail isLoading={true} />;
  }

  if (!scheduleData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List searchBarPlaceholder="Search for a game or team" isLoading={scheduleLoading}>
      <DisplayScoresAndSchedule />
    </List>
  );
};

export default displaySchedule;
