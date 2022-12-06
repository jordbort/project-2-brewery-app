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
    return (
        <h2>Search results:</h2>
    )
}

export default SearchResults