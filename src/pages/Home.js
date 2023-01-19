import { useNavigate, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Search from "../components/Search"
import Welcome from "../components/Welcome"
import SearchResults from "../components/SearchResults"
import "../Home.css"

const Home = () => {

    // Initialization variables
    const initialState = {
        searchBar: null,
        searchMethod: "by_name",
        searchMethodName: "name"
    }

    // State variables
    const navigate = useNavigate()
    const [formState, setFormState] = useState(initialState)

    // State update functions
    const handleTextInput = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }
    const handleRadioClick = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value, searchMethodName: event.target.id })
    }
    const handleSubmitClick = (event) => {
        event.preventDefault()
        navigate(`/breweries/${formState.searchMethod}=${formState.searchBar}&sort=name:asc&per_page=20&page=1`)
    }

    return (
        <>
            <div className="home">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Welcome />
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} searchMethod={formState.searchMethodName} />
                        </>
                    } />
                    <Route path='/breweries/:userQueryBy=:userQuery&sort=:sortMethod::sortDirection&per_page=:perPage&page=:pageNumber' element={
                        <>
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} searchMethod={formState.searchMethodName} />
                            <SearchResults />
                        </>
                    } />
                </Routes>
                <div className="inner-bubbles inner-bubble-1"></div>
            </div>
        </>
    )
}

export default Home