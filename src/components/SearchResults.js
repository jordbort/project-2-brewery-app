import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchResults = (props) => {
    const navigate = useNavigate()
    let {userQueryBy, userQuery, pageNumber, perPage, sortMethod, sortDirection} = useParams()
    const [results, setResults] = useState(null)
    const [resultsPerPageState, setResultsPerPageState] = useState(perPage)
    const [sortMethodState, setSortMethodState] = useState(sortMethod)
    const [sortDirectionState, setSortDirectionState] = useState(sortDirection)

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${pageNumber}`
        // const url = `https://api.openbrewerydb.org/breweries?by_city=brooklyn&sort=state:asc&per_page=50&page=1`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log("Current URL:", url)
            // console.log("Retrieved data:", json)
            setResults(json)
            setResultsPerPageState(perPage)
            setSortMethodState(sortMethod)
            setSortDirectionState(sortDirection)
        })
    }, [userQueryBy, userQuery, pageNumber, perPage, navigate, resultsPerPageState, sortDirection, sortDirectionState, sortMethod, sortMethodState])

    // Results per page dropdown selection menu function
    const handlePerPageSelect = (event) => {
        perPage = event.target.value
        setResultsPerPageState({...resultsPerPageState, [event.target.name]: event.target.value})
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort method dropdown selection menu function
    const handleSortMethodSelect = (event) => {
        console.log("handleSortMethodSelect:", event.target.value)
        sortMethod = event.target.value
        setSortMethodState({...sortMethod, [event.target.name]: event.target.value})
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort direction radio button click function
    const handleSortDirectionClick = (event) => {
        console.log("handleSortDirectionClick:", event.target.value)
        sortDirection = event.target.value
        setSortDirectionState({...sortDirection, [event.target.name]: event.target.value})
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Prev page click (available except for page 1)
    const handlePrevPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        if(pageNumber > 1) {
            newPageNumber--
            navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
        }
    }

    // Next page click ()
    const handleNextPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        newPageNumber++
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
    }

    if(!results) {
        return (
            <>
                <h4>*⬇ START OF SEARCH RESULTS PAGE ⬇*</h4>
                <h1>Loading search results...</h1>
            </>
        )
    }
    else {
        return (
            <>
                <h4>*⬇ START OF SEARCH RESULTS PAGE ⬇*</h4>
                <div className="all-search-results-container">
                    
                    {/* Search Controls */}
                    <div className="search-controls">
                        <h2>Search results:</h2>
                        <form>
                            <label htmlFor="sort-method">Sort results by:</label>
                            <select name="sort-method" id="sort-method" value={sortMethod} onChange={handleSortMethodSelect}>
                                <option value="name">Brewery name</option>
                                <option value="type">Brewery type</option>
                                <option value="dist">Distance</option>
                                <option value="city">City</option>
                                <option value="state">State</option>
                                <option value="postal">Postal code</option>
                            </select>
                        </form>
                        {sortMethod !== "dist" ? (
                            <form>
                                <label><input type="radio" name="sort-asc-desc" value="asc" checked={sortDirection==="asc"} onChange={handleSortDirectionClick}/>Ascending</label>
                                <label><input type="radio" name="sort-asc-desc" value="desc" checked={sortDirection==="desc"} onChange={handleSortDirectionClick}/>Descending</label>
                            </form>
                        ) : null}

                        <form>
                            <label htmlFor="results-per-page">Results per page:</label>
                            <select name="results-per-page" id="results-per-page" value={resultsPerPageState} onChange={handlePerPageSelect}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </form>
                        {Number(pageNumber)===1 ? <button>Prev Page</button> : <button onClick={handlePrevPageClick}>Prev Page</button>}
                        {Number(results.length) < Number(perPage) ? <button>Next Page</button> : <button onClick={handleNextPageClick}>Next Page</button>}
                        <p>sorting by {sortMethod} first, {sortDirection === "asc" ? "123→ABC" : "ZYX→321"}, items on the page: {results.length}</p>
                        <p>Page number: {pageNumber}</p>
                    </div>

                    {/* Search Results */}
                    <div className="all-search-results-box">
                        {results.length === 0 ? <h3>No results found</h3> : null}
                        <ol>
                            {results.map((brewery, idx) => {
                                return (
                                    <Link to={'/brewery/' + brewery.id} key={idx}>
                                        <div className={"search-result-box " + brewery.brewery_type}>
                                        <li>{brewery.name ? `${brewery.name} ` : null}<span>{brewery.longitude && brewery.latitude ?  <div>
                      <FontAwesomeIcon icon="fa-solid fa-map-location-dot" />
                    </div> : "(No map available)"}</span></li>
                                            <ul>
                                            {brewery.street && brewery.street !== "Unnamed Street" ? <li>{brewery.street}</li> : null}
                                                {brewery.address_2 ? <li>{brewery.address_2}</li> : null}
                                                {brewery.address_3 ? <li>{brewery.address_3}</li> : null}
                                                {brewery.city && brewery.postal_code ? <li>{brewery.city ? brewery.city : null}{brewery.state ? `, ${brewery.state}` : null} {brewery.postal_code ? brewery.postal_code : null}</li> : null}
                                                {brewery.county_province && brewery.country !== "United States" ? <li>{brewery.county_province ? `${brewery.county_province}, ` : null}{brewery.country !== "United States" ? brewery.country : null}</li> : null}
                                                {brewery.phone && brewery.country !== "United States"? <li>Phone: {brewery.phone}</li> : null}
                                                {brewery.phone && brewery.phone.length === 10 && brewery.country === "United States" ? <li>Phone: ({brewery.phone[0]}{brewery.phone[1]}{brewery.phone[2]}) {brewery.phone[3]}{brewery.phone[4]}{brewery.phone[5]}-{brewery.phone[6]}{brewery.phone[7]}{brewery.phone[8]}{brewery.phone[9]}</li> : brewery.phone}
                                                {/* {brewery.website_url ? <li>{brewery.website_url}</li> : null} */}
                                            </ul>
                                        </div>
                                    </Link>
                                )
                            })}
                        </ol>
                    </div>
                </div>
                    {Number(pageNumber) === 1 ? <button>Prev Page</button> : <button onClick={handlePrevPageClick}>Prev Page</button>}
                    {Number(results.length) < Number(perPage) ? <button>Next Page</button> : <button onClick={handleNextPageClick}>Next Page</button>} {/* For development/debugging */}
                    <span> Page {pageNumber}, sorting by {sortMethod} first, {sortDirection === "asc" ? "123→ABC" : "ZYX→321"}, items on the page: {results.length}</span> {/* For development/debugging */}
                <h4>*⬆ END OF SEARCH RESULTS PAGE ⬆*</h4>
            </>
        )
    }
}

export default SearchResults