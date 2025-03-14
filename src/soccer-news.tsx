import { List } from "@raycast/api";
import sportInfo from "./utils/getSportInfo";
import getArticles from "./utils/getArticles";
import DisplayNews from "./templates/news";

sportInfo.setSportAndLeague("soccer", "ENG.1");

const displaySchedule = () => {
  const { articleLoading, articleData } = getArticles();

  if (!articleData) {
    return <List.EmptyView icon="Empty.png" title="No Results Found" />;
  }

  return (
    <List isLoading={articleLoading} searchBarPlaceholder="Search for an article">
      <DisplayNews />
    </List>
  );
};

export default displaySchedule;
