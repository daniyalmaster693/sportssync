import { List, Icon, Action, ActionPanel, LaunchProps } from "@raycast/api";
import getPlayerResults from "./utils/getPlayerResults";

export default function PlayerSearch(props: LaunchProps<{ arguments: Arguments.PlayerSearch }>) {
  const { playerSearchData, playerSearchLoading, playerSearchRevalidate } = getPlayerResults(props);
  const playerResults = playerSearchData?.results[0].contents;

  return (
    <List navigationTitle="Search Results" searchBarPlaceholder="Search for a player" isLoading={playerSearchLoading}>
      {playerResults?.map((player: any) => (
        <List.Item
          key={player.id}
          title={player.displayName}
          icon={player.image?.default || Icon.Person}
          subtitle={player.description || ""}
          actions={
            <ActionPanel>
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={playerSearchRevalidate}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
