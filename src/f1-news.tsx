<<<<<<< HEAD
import { List } from "@raycast/api";
import sportInfo from "./utils/getSportInfo";
import getArticles from "./utils/getArticles";
import DisplayNews from "./templates/news";

sportInfo.setSportAndLeague("racing", "f1");

const displaySchedule = () => {
  const { articleLoading } = getArticles();

  return (
    <List isLoading={articleLoading} searchBarPlaceholder="Search for an article">
      <DisplayNews />
=======
import { Detail, List, Action, ActionPanel, Color, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

interface Article {
  headline: string;
  published: string;
  type: string;
  images: { url: string }[];
  links: { web: { href: string } };
}

interface ArticlesResponse {
  articles: Article[];
}

export default function scoresAndSchedule() {
  // Fetch F! Articles

  const { isLoading: f1ArticlesStatus, data: f1ArticlesData } = useFetch<ArticlesResponse>(
    "https://site.api.espn.com/apis/site/v2/sports/racing/f1/news",
  );

  const f1Articles = f1ArticlesData?.articles || [];
  const f1Items = f1Articles?.map((f1Article, index) => {
    const articleDate = new Date(f1Article?.published).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const accessoryTitle = articleDate;
    const accessoryToolTip = "Date Published";
    let articleType = f1Article?.type;

    if (articleType === "HeadlineNews") {
      articleType = "Headline";
    }

    return (
      <List.Item
        key={index}
        title={`${f1Article?.headline ?? "No Headline Found"}`}
        icon={{ source: f1Article?.images[0]?.url }}
        accessories={[
          { tag: { value: articleType, color: Color.Green }, icon: Icon.Megaphone },
          { text: { value: `${accessoryTitle ?? "No Date Found"}` }, tooltip: accessoryToolTip ?? "Unknown" },
          { icon: Icon.Calendar },
        ]}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              title="View Article on ESPN"
              url={`${f1Article?.links?.web?.href ?? "https://www.espn.com"}`}
            />
          </ActionPanel>
        }
      />
    );
  });

  if (f1ArticlesStatus) {
    return <Detail isLoading={true} />;
  }

  return (
    <List searchBarPlaceholder="Search for an article" isLoading={f1ArticlesStatus}>
      <List.Section title={`${f1Articles?.length} Article${f1Articles?.length !== 1 ? "s" : ""}`}>
        {f1Items}
      </List.Section>
>>>>>>> contributions/merge-1743277393899
    </List>
  );
};

export default displaySchedule;
