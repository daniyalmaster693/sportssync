import { Detail, List, Color, Icon, Action, ActionPanel } from "@raycast/api";
import getArticles from "../utils/getArticles";
import sportInfo from "../utils/getSportInfo";
import { useState } from "react";

export default function DisplayNews() {
  const { articleData, articleLoading, articleRevalidate } = getArticles();

  const currentLeague = sportInfo.getLeague();
  const [showDetail, setShowDetail] = useState(false);

  const articles = articleData?.articles || [];
  const articleItems = articles?.map((article, index) => {
    const articleDate = new Date(article?.published ?? "Unknown").toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    let articleType = article?.type ?? "Unknown";

    if (articleType === "HeadlineNews") {
      articleType = "Headline";
    }

    return (
      <List.Item
        key={index}
        title={`${article?.headline ?? "No Headline Found"}`}
        icon={{
          source:
            article?.images[0]?.url ??
            `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`,
        }}
        accessories={
          !showDetail
            ? [
                { tag: { value: articleType, color: Color.Green }, icon: Icon.Megaphone, tooltip: "Category" },
                { text: articleDate, tooltip: "Date Published" },
                { icon: Icon.Calendar },
              ]
            : []
        }
        detail={
          showDetail ? (
            <List.Item.Detail
              markdown={`![Article Headline Image](${article?.images[0]?.url ?? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${currentLeague}.png&w=100&h=100&transparent=true`})`}
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Title" text={article?.headline ?? "No Headline Found"} />
                  <List.Item.Detail.Metadata.Label
                    title="Description"
                    text={article?.description ?? "No Description Found"}
                  />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Published" text={articleDate} />
                  <List.Item.Detail.Metadata.Label title="Writer" text={article?.byline ?? "Unknown"} />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.TagList title="Category">
                    <List.Item.Detail.Metadata.TagList.Item text={articleType} color={Color.Green} />
                  </List.Item.Detail.Metadata.TagList>
                </List.Item.Detail.Metadata>
              }
            />
          ) : null
        }
        actions={
          <ActionPanel>
            <Action title="Toggle Detailed View" icon={Icon.Sidebar} onAction={() => setShowDetail(!showDetail)} />
            <Action.OpenInBrowser
              title="View Article on ESPN"
              url={`${article?.links?.web?.href ?? `https://www.espn.com/${currentLeague}`}`}
            />
            <Action.CopyToClipboard
              title="Copy Article Link"
              content={`${article?.links?.web?.href ?? `https://www.espn.com/${currentLeague}`}`}
            ></Action.CopyToClipboard>
            <Action
              title="Refresh"
              icon={Icon.ArrowClockwise}
              onAction={articleRevalidate}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
            ></Action>
          </ActionPanel>
        }
      />
    );
  });

  return (
    <List isLoading={articleLoading}>
      <List.Section title={`${articles?.length ?? "0"} Article${articles?.length !== 1 ? "s" : ""}`}>
        {articleItems}
      </List.Section>
    </List>
  );
}
