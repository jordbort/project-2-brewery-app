import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const SearchResults = (props) => {
    const navigate = useNavigate()
    let {pageNumber, perPage} = useParams()
    const [results, setResults] = useState(null)
    const [resultsPerPageState, setResultsPerPageState] = useState(perPage)

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?per_page=${perPage}&page=${pageNumber}`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log("Current URL:", url)
            console.log("Retrieved data:", json)
            console.log("resultsPerPageState:", resultsPerPageState)
            setResults(json)
            setResultsPerPageState(perPage)
        })
    }, [pageNumber, perPage, navigate, resultsPerPageState]) //, [] <= this might need to be added back in, if you're getting into an infinite loop!!

    // Dropdown selection menu function
    const handleSelect = (event) => {
        perPage = event.target.value
        setResultsPerPageState({...resultsPerPageState, [event.target.name]: event.target.value})
        navigate(`/breweries/per_page=${perPage}&page=1`)
    }

    // Prev page click (available except for page 1)
    const handlePrevPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        if(pageNumber > 1) {
            newPageNumber--
            navigate(`/breweries/per_page=${perPage}&page=${newPageNumber}`)
        }
    }

    // Next page click ()
    const handleNextPageClick = (event) => {
        let newPageNumber = Number(pageNumber)
        newPageNumber++
        navigate(`/breweries/per_page=${perPage}&page=${newPageNumber}`)
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

                        {/* okay nevermind, don't actually do radio buttons */}
                    {/* <div> */}
                        {/* <input type="radio" id="by-name" name="sort-by" value="name" onChange={null} /> */}
                        {/* <label htmlFor="by-name" name="sort-by">Brewery name</label> */}
                        {/* <input type="radio" id="by-type" name="sort-by" value="type" onChange={null} /> */}
                        {/* <label htmlFor="by-type" name="sort-by">Brewery type</label> */}
                        {/* <input type="radio" id="by-city" name="sort-by" value="city" onChange={null} /> */}
                        {/* <label htmlFor="by-city" name="sort-by">City</label> */}
                        {/* <input type="radio" id="by-state" name="sort-by" value="state" onChange={null} /> */}
                        {/* <label htmlFor="by-state" name="sort-by">State</label> */}
                        {/* <input type="radio" id="by-postal" name="sort-by" value="postal-code" onChange={null} /> */}
                        {/* <label htmlFor="by-postal-code" name="sort-by">Postal code</label> */}
                    {/* </div> */}


                    <form>
                        <label htmlFor="sort-method">Sort results by:</label>
                        <select name="sort-method" id="sort-method" onChange={handleSelect}>
                            <option value="by_name">Name</option>
                            <option value="by_type">Type</option>
                            <option value="by_dist">Distance</option>
                            <option value="by_city">City</option>
                            <option value="by_state">State</option>
                            <option value="by_postal">Post code</option>
                        </select>
                    </form>

                    <form>
                        <label htmlFor="results-per-page">Results per page:</label>
                        <select name="results-per-page" id="results-per-page" value={resultsPerPageState} onChange={handleSelect}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>

                        <input type="radio" id="by-name" name="sort-by" value="name" onChange={null} />
                        <label htmlFor="by-name" name="sort-by">Brewery name</label>
                        <input type="radio" id="by-type" name="sort-by" value="type" onChange={null} />
                        <label htmlFor="by-type" name="sort-by">Brewery type</label>

                    </form>
                    {Number(pageNumber)===1 ? <button>Prev Page</button> : <button onClick={handlePrevPageClick}>Prev Page</button>}
                    <button onClick={handleNextPageClick}>Next Page</button>
                    <p>Page number: {pageNumber}</p>
                </div>

                {/* Search Results */}
                <div className="all-search-results-box">
                    <h2>Search results:</h2>
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