import { LocalStorage, List, Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import sportInfo from "./utils/getSportInfo";
import getScoresAndSchedule from "./utils/getSchedule";
import DisplayScoresAndSchedule from "./templates/scores-and-schedule";

const displaySchedule = () => {
  const [currentLeague, displaySelectLeague] = useState("nba");

  useEffect(() => {
    async function loadStoredDropdown() {
      const storedValue = await LocalStorage.getItem("selectedDropdown");

      if (typeof storedValue === "string") {
        displaySelectLeague(storedValue);
      } else {
        displaySelectLeague("nba");
      }
    }

    loadStoredDropdown();
  }, []);

  const { scheduleLoading, scheduleData } = getScoresAndSchedule();
  sportInfo.setSportAndLeague("basketball", `${currentLeague}`);

  if (scheduleLoading) {
    return <Detail isLoading={true} />;
  }

  if (!scheduleData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List
      searchBarPlaceholder="Search for a team or game"
      searchBarAccessory={
        <List.Dropdown
          tooltip="Sort by"
          onChange={async (newValue) => {
            displaySelectLeague(newValue);
            await LocalStorage.setItem("selectedDropdown", newValue);
          }}
          value={currentLeague}
          defaultValue="nba"
        >
          <List.Dropdown.Item title="NBA" value="nba" />
          <List.Dropdown.Item title="WNBA" value="wnba" />
          <List.Dropdown.Item title="NCAA M" value="mens-college-basketball" />
          <List.Dropdown.Item title="NCAA W" value="womens-college-basketball" />
        </List.Dropdown>
      }
      isLoading={scheduleLoading}
    >
      <DisplayScoresAndSchedule />;
    </List>
  );
};

export default displaySchedule;
