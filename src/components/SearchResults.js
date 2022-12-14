import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchResults = () => {
    const navigate = useNavigate()
    let {userQueryBy, userQuery, pageNumber, perPage, sortMethod, sortDirection} = useParams()
    const [results, setResults] = useState(null)
    const [resultsPerPageState, setResultsPerPageState] = useState(perPage)
    const [sortMethodState, setSortMethodState] = useState(sortMethod)
    const [sortDirectionState, setSortDirectionState] = useState(sortDirection)

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${pageNumber}`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
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
        sortMethod = event.target.value
        setSortMethodState({...sortMethod, [event.target.name]: event.target.value})
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort direction radio button click function
    const handleSortDirectionClick = (event) => {
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
            <h2 className="loading"><FontAwesomeIcon icon="fa-solid fa-gear" size="1x" className="fa-spin" /> Loading search results...</h2>
        )
    }
    else {
        return (
            <div className="all-search-components-container">
                
                {/* Search controls */}
                <h2>Search results:</h2>
                <div className="sort-methods">
                    <form>
                        <label htmlFor="sort-method">Sort results by: </label>
                        <select name="sort-method" id="sort-method" value={sortMethod} onChange={handleSortMethodSelect}>
                            <option value="name">Brewery name</option>
                            <option value="type">Brewery type</option>
                            <option value="city">City</option>
                            <option value="state">State</option>
                            <option value="country">Country</option>
                        </select>
                    </form>
                        <form>
                            <label><input type="radio" name="sort-asc-desc" value="asc" checked={sortDirection === "asc"} onChange={handleSortDirectionClick} />123???ABC</label>
                            <label><input type="radio" id="desc" name="sort-asc-desc" value="desc" checked={sortDirection === "desc"} onChange={handleSortDirectionClick} />ZYX???321</label>
                        </form>
                    <form>
                        <label htmlFor="results-per-page">Results per page: </label>
                        <select name="results-per-page" id="results-per-page" value={resultsPerPageState} onChange={handlePerPageSelect}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </form>
                </div>

                {/* Search results */}
                <div className="all-search-results-box">
                    {results.length === 0 ? <div className="no-results"><h3>No results found.</h3><p>Please search again!</p></div> : (
                        <>
                            {/* Page navigation information */}
                            <p className="page-number">Page: {pageNumber} (items: {results.length})</p>
                            <div className="page-buttons">
                                {Number(pageNumber)===1 ? null : <button onClick={handlePrevPageClick}>Prev Page</button>}
                                {Number(results.length) < Number(perPage) ? null : <button onClick={handleNextPageClick}>Next Page</button>}
                            </div>

                            {/* Search results item */}
                            <ol>
                                {results.map((brewery, idx) => {
                                    return (
                                        <div className={"search-result-container " + brewery.brewery_type} key={idx}>
                                            <Link to={'/brewery/' + brewery.id}>
                                                <div className="search-result-info">
                                                    <div className="brewery-details">
                                                        {brewery.name ? <li>{brewery.name} </li> : null}
                                                        <ul>
                                                            {brewery.street && brewery.street !== "Unnamed Street" ? <li>{brewery.street}</li> : null}
                                                            {brewery.address_2 ? <li>{brewery.address_2}</li> : null}
                                                            {brewery.address_3 ? <li>{brewery.address_3}</li> : null}
                                                            {brewery.city && brewery.postal_code ? <li>{brewery.city ? brewery.city : null}{brewery.state ? `, ${brewery.state}` : null} {brewery.postal_code ? brewery.postal_code : null}</li> : null}
                                                            {brewery.county_province && brewery.country !== "United States" ? <li>{brewery.county_province ? `${brewery.county_province}, ` : null}{brewery.country !== "United States" ? brewery.country : null}</li> : null}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="extra-details">
                                                    {brewery.longitude && brewery.latitude ?  <div className="map-icon-black"><FontAwesomeIcon icon="fa-solid fa-map-location-dot" size="3x" /></div> : <div className="map-icon-gray"><FontAwesomeIcon icon="fa-solid fa-map-location-dot" size="3x" /></div>}
                                                    <div className="brewery-type-text">{brewery.brewery_type ? brewery.brewery_type : null}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </ol>

                            {/* Page navigation buttons (bottom) */}
                            <div className="page-buttons" id="bottom-buttons">
                                {Number(pageNumber)===1 ? null : <button onClick={handlePrevPageClick}>Prev Page</button>}
                                {Number(results.length) < Number(perPage) ? null : <button onClick={handleNextPageClick}>Next Page</button>}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchResults