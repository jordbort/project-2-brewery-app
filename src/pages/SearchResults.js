import { Link, redirect } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const SearchResults = (props) => {
    let {pageNumber, perPage} = useParams()
    const [results, setResults] = useState(null)
    const [formState, setFormState] = useState(perPage)
    // const [radioState, serRadioState] = useState()
    // const [searchState, setSearchState] = useState({
    //     results: null,
    //     formState: perPage,
    // })

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?per_page=${perPage}&page=${pageNumber}`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log("Current URL:", url)
            // console.log("Checking params:", allParams)
            console.log("Retrieved data:", json)
            console.log("pageNumber?", pageNumber)
            setResults(json)
        })
    }, [pageNumber, perPage]) //, [] <= this might need to be added back in, if you're getting into an infinite loop!!

    // Dropdown selection menu function
    const handleSelect = async (event) => {
        if(results) {
            perPage = event.target.value
            setFormState({...formState, [event.target.name]: event.target.value})
            window.location.assign(`/breweries/per_page=${perPage}&page=1`)
            // return redirect(`/breweries/per_page=${perPage}&page=1`)
        }
    }

    const handlePrevPageClick = async (event) => {
        if(results) {
            console.log("pageNumber?", pageNumber)
            let newPageNumber = Number(pageNumber)
            console.log("(before) new page number:", newPageNumber)
            if(pageNumber > 1) {
                newPageNumber--
                console.log("(after) new page number:", newPageNumber)
                // return redirect(`/breweries/per_page=${perPage}&page=${pageNumber}`)
            }
            // window.location.assign(`/breweries/per_page=${perPage}&page=${pageNumber}`)
        }
    }

    const handleNextPageClick = async (event) => {
        if(results) {
        console.log("pageNumber?", pageNumber)
        let newPageNumber = Number(pageNumber)
        console.log("(before) new page number:", newPageNumber)
        newPageNumber++
        console.log("(after) new page number:", newPageNumber)
        // window.location.assign(`/breweries/per_page=${perPage}&page=${pageNumber}`)
        // return redirect(`/breweries/per_page=${perPage}&page=${pageNumber}`)
        }
    }

    if(!results) {
        return <p>Loading search results...</p>
    }
    else {
        return (
            <>
                <h4>vvv START OF SEARCH RESULTS PAGE vvv</h4>

                {/* Search Controls */}
                <div className="search-controls">
                    <div>
                        {/* okay nevermind, don't actually do radio buttons */}
                        <input type="radio" id="by-name" name="sort-by" value="name" onChange={null} />
                        <label htmlFor="by-name" name="sort-by">Brewery name</label>
                        <input type="radio" id="by-type" name="sort-by" value="type" onChange={null} />
                        <label htmlFor="by-type" name="sort-by">Brewery type</label>
                        <input type="radio" id="by-city" name="sort-by" value="city" onChange={null} />
                        <label htmlFor="by-city" name="sort-by">City</label>
                        <input type="radio" id="by-state" name="sort-by" value="state" onChange={null} />
                        <label htmlFor="by-state" name="sort-by">State</label>
                        <input type="radio" id="by-postal" name="sort-by" value="postal-code" onChange={null} />
                        <label htmlFor="by-postal-code" name="sort-by">Postal code</label>
                    </div>
                    <p></p>
                    <form>
                        <label htmlFor="results-per-page">Results per page:</label>
                        <select name="results-per-page" id="results-per-page" value={formState} onChange={handleSelect}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </form>
                    <p></p>
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
                                    <div className="search-result-box"> {/* may also use {brewery.brewery_type} here? */}
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
                                        <p></p>
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