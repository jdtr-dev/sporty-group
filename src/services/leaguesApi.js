export async function getLeagues() {
    const cachedData = sessionStorage.getItem('leagues');

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
    const data = await response.json();

    sessionStorage.setItem('leagues', JSON.stringify(data.leagues));
    return data.leagues;
}

export async function fetchSeasonBadge(leagueId) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
  );

  const data = await response.json();

  return data;
}
