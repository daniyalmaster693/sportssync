import { Detail, List, LocalStorage } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState, useEffect } from "react";
import CompletedGames from "./views/favoriteTeamCompleted";
import ScheduledGames from "./views/favoriteTeamScheduled";
import TeamInjuries from "./views/favoriteTeamTracker";
import { getPreferenceValues } from "@raycast/api";

interface preferences {
  name: string;
  id?: string;
}
const preferences = getPreferenceValues<Preferences>();

const favoriteTeam = preferences.team;
const favoriteLeague = preferences.league;
const favoriteSport = preferences.sport;

const Command = () => {
  const [currentType, displaySelectType] = useState("Scheduled Games");
  useEffect(() => {
    async function loadStoredDropdown() {
      const storedValue = await LocalStorage.getItem("selectedDropdown");

      if (typeof storedValue === "string") {
        displaySelectType(storedValue);
      } else {
        displaySelectType("Scheduled Games");
      }
    }

    loadStoredDropdown();
  }, []);

  const { isLoading: scheduleLoading, data: scheduleData } = useFetch<Response>(
    `https://site.api.espn.com/apis/site/v2/sports/${favoriteSport}/${favoriteLeague}/teams/${favoriteTeam}/schedule`,
  );

  if (scheduleLoading) {
    return <Detail isLoading={true} />;
  }

  if (!scheduleData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List
      searchBarPlaceholder={`Search for a game`}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Sort by"
          onChange={async (newValue) => {
            displaySelectType(newValue);
            await LocalStorage.setItem("selectedDropdown", newValue);
          }}
          value={currentType}
          defaultValue="Scheduled Games"
        >
          <List.Dropdown.Item title="Scheduled Games" value="Scheduled Games" />
          <List.Dropdown.Item title="Completed Games" value="Completed Games" />
          <List.Dropdown.Item title="Tracker" value="Tracker" />
        </List.Dropdown>
      }
      isLoading={scheduleLoading}
    >
      {currentType === "Scheduled Games" && (
        <>
          <ScheduledGames />
        </>
      )}

      {currentType === "Completed Games" && (
        <>
          <CompletedGames />
        </>
      )}

      {currentType === "Tracker" && (
        <>
          <TeamInjuries />
        </>
      )}
    </List>
  );
};

export default Command;
