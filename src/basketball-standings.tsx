import { LocalStorage, List, Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import sportInfo from "./utils/getSportInfo";
import getTeamStandings from "./utils/getStandings";
import DisplayTeamStandings from "./templates/standings";

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

  const { standingsLoading, standingsData } = getTeamStandings();
  sportInfo.setSportAndLeague("basketball", `${currentLeague}`);

  if (standingsLoading) {
    return <Detail isLoading={true} />;
  }

  if (!standingsData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List
      searchBarPlaceholder="Search for a team"
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
        </List.Dropdown>
      }
      isLoading={standingsLoading}
    >
      <DisplayTeamStandings />;
    </List>
  );
};

export default displaySchedule;
