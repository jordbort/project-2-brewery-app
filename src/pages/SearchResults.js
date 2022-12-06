// import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const SearchResults = (props) => {
    const [results, setResults] = useState(null)
    useEffect(() => {
        const url = `https://api.openbrewerydb.org/breweries`
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            setResults(json)
        })
    }, [])
    if(!results) {
        return <p>Loading search results...</p>
    }
    else {
        return (
            <>
                <h2>Search results:</h2>
                <ul>
                    {results.map((brewery, idx) => {
                        return (
                            <>
                                <li>Name: {brewery.name}</li>
                                <li>Address:</li>
                                <ul>
                                    <li>{brewery.address_2}</li>
                                    <li>{brewery.address_3}</li>
                                </ul>
                            </>
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