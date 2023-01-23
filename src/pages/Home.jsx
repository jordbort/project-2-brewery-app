import { useNavigate, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Search from "../components/Search"
import Welcome from "../components/Welcome"
import SearchResults from "../components/SearchResults"
// import "../Home.css"
import "../sassStyles/main.scss"

export default function Home() {
    // State variables
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        searchBar: "",
        searchMethod: "by_name",
        searchMethodName: "name"
    })

    // State update functions
    function handleTextInput(event) {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }
    function handleRadioClick(event) {
        setFormState({ ...formState, [event.target.name]: event.target.value, searchMethodName: event.target.id })
    }
    function handleSubmitClick(event) {
        event.preventDefault()
        if (formState.searchBar !== "") {
            navigate(`/breweries/${formState.searchMethod}=${formState.searchBar}&sort=name:asc&per_page=20&page=1`)
        }
    }

    return (
        <>
            <div className="home">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Welcome />
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} form={formState} />
                        </>
                    } />
                    <Route path='/breweries/:userQueryBy=:userQuery&sort=:sortMethod::sortDirection&per_page=:perPage&page=:pageNumber' element={
                        <>
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} form={formState} />
                            <SearchResults />
                        </>
                    } />
                </Routes>
                <div className="inner-bubbles inner-bubble-1"></div>
            </div>
        </>
    )
}