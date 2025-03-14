import { LocalStorage, List, Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import sportInfo from "./utils/getSportInfo";
import getArticles from "./utils/getArticles";
import getInjuries from "./utils/getInjuries";
import getTransactions from "./utils/getTransactions";
import DisplayNews from "./templates/news";
import DisplayInjuries from "./templates/injuries";
import DisplayTransactions from "./templates/transactions";

const displayTrackerInformation = () => {
  const [currentLeague, displaySelectLeague] = useState("Articles");

  useEffect(() => {
    async function loadStoredDropdown() {
      const storedValue = await LocalStorage.getItem("selectedDropdown");

      if (typeof storedValue === "string") {
        displaySelectLeague(storedValue);
      } else {
        displaySelectLeague("Articles");
      }
    }

    loadStoredDropdown();
  }, []);

  const { articleLoading, articleData } = getArticles();
  const { injuryLoading, injuryData } = getInjuries();
  const { transactionLoading, transactionData } = getTransactions();

  sportInfo.setSportAndLeague("baseball", `mlb`);

  let searchBarPlaceholder = "Search for a game";

  if (currentLeague === "Articles") {
    searchBarPlaceholder = "Search for an article";
  }

  if (currentLeague === "Injuries" || currentLeague === "Transactions") {
    searchBarPlaceholder = "Search for a player, or team";
  }

  if (articleLoading || injuryLoading || transactionLoading) {
    return <Detail isLoading={true} />;
  }

  if (!articleData || !injuryData || !transactionData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List
      searchBarPlaceholder={searchBarPlaceholder}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Sort by"
          onChange={async (newValue) => {
            displaySelectLeague(newValue);
            await LocalStorage.setItem("selectedDropdown", newValue);
          }}
          value={currentLeague}
          defaultValue="Articles"
        >
          <List.Dropdown.Item title="Articles" value="Articles" />
          <List.Dropdown.Item title="Injuries" value="Injuries" />
          <List.Dropdown.Item title="Transactions" value="Transactions" />
        </List.Dropdown>
      }
      isLoading={injuryLoading || transactionLoading || articleLoading}
    >
      {currentLeague === "Articles" && (
        <>
          <DisplayNews />
        </>
      )}
      {currentLeague === "Injuries" && (
        <>
          <DisplayInjuries />
        </>
      )}
      {currentLeague === "Transactions" && (
        <>
          <DisplayTransactions />
        </>
      )}
    </List>
  );
};

export default displayTrackerInformation;
