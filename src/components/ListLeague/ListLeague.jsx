import { useEffect, useState } from 'react';
import { fetchSeasonBadge } from '../../services/leaguesApi';
import BadgeModal from '../BadgeModal/BadgeModal';

function ListLeague({ leagues, search}) {
    const [badgeUrl, setBadgeUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleClick(leagueId) {
        console.log("Clicked league ID:", leagueId);
        setLoading(true);

        try {
            const seasonData = await fetchSeasonBadge(leagueId);
            setBadgeUrl(seasonData.seasons[0].strBadge);
        } finally {
            setLoading(false);
        }
    }

    const filteredLeagues = leagues.filter(league =>
        league.strLeague.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="block">
                <table className="table is-black">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Sport</th>
                        <th>Alternate League</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeagues.map((league) => (
                        <tr key={league.idLeague}>
                            <td>{league.strLeague}</td>
                            <td>{league.strSport}</td>
                            <td>
                                <button className='button is-danger' 
                                    disabled={loading}
                                    onClick={() => handleClick(league.idLeague)}>
                                    {loading ? 'Loading...' : 'View Seasons'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            { badgeUrl && !loading && (
                <BadgeModal imagen={badgeUrl} seasonYears="2022-2023" isOpen={true} onClose={() => setBadgeUrl(null)} />
            )}
        </>
    )
}

export default ListLeague;
