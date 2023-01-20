import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SearchResults() {
    const [results, setResults] = useState([])

    const navigate = useNavigate()
    let { userQueryBy, userQuery, pageNumber, perPage, sortMethod, sortDirection } = useParams()

    async function getResults(userQueryBy, userQuery, sortMethod, sortDirection, perPage, pageNumber) {
        let searchResults
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries?${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${pageNumber}`)
            searchResults = await response.json()
        } catch (err) {
            console.error(err)
        } finally {
            setResults(searchResults)
        }
    }

    // API call and response
    useEffect(() => {
        getResults(userQueryBy, userQuery, sortMethod, sortDirection, perPage, pageNumber)
    }, [userQueryBy, userQuery, sortMethod, sortDirection, perPage, pageNumber])

    // Results per page dropdown selection menu function
    function handlePerPageSelect(event) {
        perPage = event.target.value
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort method dropdown selection menu function
    function handleSortMethodSelect(event) {
        sortMethod = event.target.value
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort direction radio button click function
    function handleSortDirectionClick(event) {
        sortDirection = event.target.value
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Prev page click (available except for page 1)
    function handlePrevPageClick(event) {
        let newPageNumber = Number(pageNumber)
        if (pageNumber > 1) {
            newPageNumber--
            navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
        }
    }

    // Next page click ()
    function handleNextPageClick(event) {
        let newPageNumber = Number(pageNumber)
        newPageNumber++
        navigate(`/breweries/${userQueryBy}=${userQuery}&sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
    }
    
    function loaded() {
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
                        <label>
                            <input type="radio" name="sort-asc-desc" value="asc" checked={sortDirection === "asc"} onChange={handleSortDirectionClick} />123→ABC
                        </label>
                        <label>
                            <input type="radio" id="desc" name="sort-asc-desc" value="desc" checked={sortDirection === "desc"} onChange={handleSortDirectionClick} />ZYX→321
                        </label>
                    </form>
                    <form>
                        <label htmlFor="results-per-page">Results per page: </label>
                        <select name="results-per-page" id="results-per-page" value={perPage} onChange={handlePerPageSelect}>
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
                                {Number(pageNumber) === 1 ? null : <button onClick={handlePrevPageClick}>Prev Page</button>}
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
                                                    {brewery.longitude && brewery.latitude ? <div className="map-icon-black"><FontAwesomeIcon icon="fa-solid fa-map-location-dot" /></div> : <div className="map-icon-gray"><FontAwesomeIcon icon="fa-solid fa-map-location-dot" /></div>}
                                                    <div className="brewery-type-text">{brewery.brewery_type ? brewery.brewery_type : null}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </ol>

                            {/* Page navigation buttons (bottom) */}
                            <div className="page-buttons" id="bottom-buttons">
                                {Number(pageNumber) === 1 ? null : <button onClick={handlePrevPageClick}>Prev Page</button>}
                                {Number(results.length) < Number(perPage) ? null : <button onClick={handleNextPageClick}>Next Page</button>}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return results ? loaded() : <h2 className="loading"><FontAwesomeIcon icon="fa-solid fa-gear" size="1x" className="fa-spin" /> Loading search results...</h2>
}