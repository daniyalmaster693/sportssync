const league = "nfl";
const sport = "football";

fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams`)
  .then((response) => response.json())
  .then((data) => {
    const teams = data.sports?.[0]?.leagues[0].teams;
    const teamInfo = teams.map((team) => {
      return {
        title: team.team.displayName,
        value: team.team.id,
      };
    });

    console.log(teamInfo);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
