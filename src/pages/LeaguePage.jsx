import { useEffect, useState } from 'react'
import SearchLeague from '../components/SearchLeague/SearchLeague';
import DropdownLeague from '../components/DropdownLeague/DropdownLeague';
import ListLeague from '../components/ListLeague/ListLeague';
import NavBar from '../components/NavBar/NavBar';
import { getLeagues } from '../services/leaguesApi';

function LeaguePage() {
    const [leagues, setLeagues] = useState([]);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categories = [
        'Basketball',
        'Motorsport',
        ...new Set(leagues.map(league => league.strSport))
    ];

    const filteredLeagues = leagues.filter(league => {
        const matchesSearch =
            league.strLeague.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            !category || league.strSport === category;

        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        const fetchLeagues = async () => {
            setLoading(true);
            setError(null);

            try {
                const leaguesData = await getLeagues();
                setLeagues(leaguesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagues();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <section className="container">
                <NavBar />
                <div className="is-centered columns">
                    <div className="column is-4">
                        <SearchLeague value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="column is-1">
                        <DropdownLeague categories={categories}
                            category={category}
                            setCategory={setCategory} />
                    </div>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center py-5">
                    {filteredLeagues.length ?
                        <ListLeague leagues={filteredLeagues} search={search} /> :
                        <p>No leagues found.</p>}
                </div>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <p>Sporty Group © {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default LeaguePage;