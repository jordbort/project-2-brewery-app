// import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const SearchResults = (props) => {
    // const {page} = useParams()
    const [results, setResults] = useState(null)
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries?per_page=50`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json)
            // console.log(url)
            setResults(json)
        })
    }, [])
    if(!results) {
        return <p>Loading search results...</p>
    }
    else {
        return (
            <>
                {/* <p>
                    Page: {page}
                </p> */}
                <p>
                    {/* <Link to={nextPage}>Next Page</Link> */}
                </p>
                <h2>Search results:</h2>
                <ul>
                    {results.map((brewery, idx) => {
                        return (
                            <div className={brewery.brewery_type} key={idx}>
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
            </>
        )
    }
}

export default SearchResults