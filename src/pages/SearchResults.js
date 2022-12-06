import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const SearchResults = (props) => {
    let {page, perPage} = useParams()
    const allParams = useParams()
    const [results, setResults] = useState(null)
    const [formState, setFormState] = useState(perPage)
    console.log(formState)

    // API call and response
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?per_page=${perPage}&page=${page}`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log("Current URL:", url)
            console.log("Checking params:", allParams)
            console.log("Retrieved data:", json)
            setResults(json)
        })
    }, []) //, [] <= this might need to be added back in, if you're getting into an infinite loop!!

    // function handleSubmit() {
    //     console("handleSubmit was called")
    // }
    const handleChange = (event) => {
        // console.log("perPage:", perPage)
        // console.log("change:", event.target.value, event.target.name)
        perPage = event.target.value
        // console.log("perPage:", perPage)
        // handleSubmit()
        // console.log("URL:", url)
        setFormState({...formState, [event.target.name]: event.target.value})
        window.location.assign(`/breweries/per_page=${perPage}&page=${page}`)
    }

    if(!results) {
        return <p>Loading search results...</p>
    }
    else {
        return (
            <>
                <h4>vvv START OF SEARCH RESULTS PAGE vvv</h4>
                {/* <p>
                    Page: {page}
                </p> */}
                {/* <p>
                    <Link to={nextPage}>Next Page</Link>
                </p> */}
                <form>
                    <label htmlFor="results-per-page">Results per page:</label>
                    <select name="results-per-page" id="results-per-page" value={formState} onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </form>
                <h2>Search results:</h2>
                <ul>
                    {results.map((brewery, idx) => {
                        return (
                            <Link to={'/brewery/' + brewery.id} key={idx}>
                                <div className={brewery.brewery_type}>
                                    <li>Name: {brewery.name}</li>
                                    {brewery.phone ? <li>Phone: {brewery.phone}</li> : null}
                                    {brewery.website ? <li>Website: {brewery.website}</li> : null}
                                    <li>Address:</li>
                                    <ul>
                                        {brewery.street && !"Unnamed Street" ? <li>{brewery.street}</li> : null}
                                        {brewery.address_2 ? <li>{brewery.address_2}</li> : null}
                                        {brewery.address_3 ? <li>{brewery.address_3}</li> : null}
                                        <li>{brewery.city}{brewery.state ? `, ${brewery.state}` : null} {brewery.postal_code}</li>
                                        {brewery.country && !"United States" ? <li>{brewery.country}</li> : null}
                                    </ul>
                                    <p></p>
                                </div>
                            </Link>
                        )
                    })}
                    {/* <li>Brewery Name</li>
                    <ul>
                        <li>Phone number:</li>
                        <li>Address</li>
                        <li>Address:</li>
                        <ul>
                            <li>123 Fake street</li>
                            <li>Brooklyn, NY 11221</li>
                        </ul>
                    </ul> */}
                </ul>
                <h4>^^^ START OF SEARCH RESULTS PAGE ^^^</h4>
            </>
        )
    }
}

export default SearchResults