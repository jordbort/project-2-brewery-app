import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const SearchResults = (props) => {
    const navigate = useNavigate()
    let {pageNumber, perPage, sortMethod, sortDirection} = useParams()
    const [results, setResults] = useState(null)
    const [resultsPerPageState, setResultsPerPageState] = useState(perPage)
    const [sortMethodState, setSortMethodState] = useState(sortMethod)
    const [sortDirectionState, setSortDirectionState] = useState(sortDirection)

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${pageNumber}`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log("Current URL:", url)
            console.log("Retrieved data:", json)
            console.log("resultsPerPageState:", resultsPerPageState)
            console.log("sortMethodState:", sortMethodState)
            console.log("sortDirectionState:", sortDirectionState)
            setResults(json)
            setResultsPerPageState(perPage)
            setSortMethodState(sortMethod)
            setSortDirectionState(sortDirection)
        })
    }, [pageNumber, perPage, navigate, resultsPerPageState, sortDirection, sortDirectionState, sortMethod, sortMethodState])

    // Results per page dropdown selection menu function
    const handlePerPageSelect = (event) => {
        perPage = event.target.value
        setResultsPerPageState({...resultsPerPageState, [event.target.name]: event.target.value})
        navigate(`/breweries/sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort method dropdown selection menu function
    const handleSortMethodSelect = (event) => {
        console.log("handleSortMethodSelect:", event.target.value)
        sortMethod = event.target.value
        setSortMethodState({...sortMethod, [event.target.name]: event.target.value})
        navigate(`/breweries/sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Sort direction radio button click function
    const handleSortDirectionClick = (event) => {
        console.log("handleSortDirectionClick:", event.target.value)
        sortDirection = event.target.value
        setSortDirectionState({...sortDirection, [event.target.name]: event.target.value})
        navigate(`/breweries/sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=1`)
    }

    // Prev page click (available except for page 1)
    const handlePrevPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        if(pageNumber > 1) {
            newPageNumber--
            navigate(`/breweries/sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
        }
    }

    // Next page click ()
    const handleNextPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        newPageNumber++
        navigate(`/breweries/sort=${sortMethod}:${sortDirection}&per_page=${perPage}&page=${newPageNumber}`)
    }

    if(!results) {
        return <h1>Loading search results...</h1>
    }
    else {
        return (
            <>
                <h4>vvv START OF SEARCH RESULTS PAGE vvv</h4>

                {/* Search Controls */}
                <div className="search-controls">
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
                        <label><input type="radio" name="sort-asc-desc" value="asc" checked={sortDirection==="asc"} onChange={handleSortDirectionClick}/>Ascending</label>
                        <label><input type="radio" name="sort-asc-desc" value="desc" checked={sortDirection==="desc"} onChange={handleSortDirectionClick}/>Descending</label>
                    </form>

                    <form>
                        <label htmlFor="results-per-page">Results per page:</label>
                        <select name="results-per-page" id="results-per-page" value={resultsPerPageState} onChange={handlePerPageSelect}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </form>
                    {Number(pageNumber)===1 ? <button>Prev Page</button> : <button onClick={handlePrevPageClick}>Prev Page</button>}
                    <button onClick={handleNextPageClick}>Next Page</button>
                    <h2>Search results:</h2>
                    <p>Page number: {pageNumber}</p>
                </div>

                {/* Search Results */}
                <div className="all-search-results-box">
                    <ol>
                        {results.map((brewery, idx) => {
                            return (
                                <Link to={'/brewery/' + brewery.id} key={idx}>
                                    <div className={"search-result-box " + brewery.brewery_type}>
                                    <li>{brewery.name ? brewery.name : null}</li>
                                        <ul>
                                            {brewery.street && brewery.street !== "Unnamed Street" ? <li>{brewery.street}</li> : null}
                                            {brewery.address_2 ? <li>{brewery.address_2}</li> : null}
                                            {brewery.address_3 ? <li>{brewery.address_3}</li> : null}
                                            <li>{brewery.city ? brewery.city : null}{brewery.state ? `, ${brewery.state}` : null} {brewery.postal_code ? brewery.postal_code : null}</li>
                                            {brewery.country && brewery.country !== "United States" ? <li>{brewery.country}</li> : null}
                                            {brewery.phone ? <li>Phone: {brewery.phone}</li> : null}
                                            {brewery.website ? <li>Website: {brewery.website}</li> : null}
                                        </ul>
                                    </div>
                                </Link>
                            )
                        })}
                    </ol>
                </div>
                <h4>^^^ END OF SEARCH RESULTS PAGE ^^^</h4>
            </>
        )
    }
}

export default SearchResults