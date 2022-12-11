import { useNavigate, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Search from "../components/Search"
import Welcome from "../components/Welcome"
import SearchResults from "../components/SearchResults"
import "../Home.css"

const Home = (props) => {
    const initialState = {
        searchBar: null,
        searchMethod: null,
        searchMethodName: "name"
    }
    const navigate = useNavigate()
    const [formState, setFormState] = useState(initialState)
    // console.log('formState:', formState)

    const handleTextInput = (event) => {
        // console.log(event.target.name, event.target.value)
        setFormState({...formState, [event.target.name]: event.target.value})
    }

    const handleRadioClick = (event) => {
        // console.log(event.target.name, event.target.id)
        // console.log(event.target)
        setFormState({...formState, [event.target.name]: event.target.value, searchMethodName: event.target.id})
    }

    const handleSubmitClick = (event) => {
        event.preventDefault()
        // console.log(event.target.value)
        // console.log("submitted:", formState.searchBar, formState.searchMethod)
        navigate(`/breweries/${formState.searchMethod}=${formState.searchBar}&sort=name:asc&per_page=20&page=1`)
    }
    
    return (
        <>
            {/* <h3>*⬇ START OF HOME PAGE ⬇*</h3> */}
            <div className="home">
                {/* <h2>This is the Home page!</h2> */}
                <Routes>
                    <Route path="/" element={
                        <>
                            <Welcome/>
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} searchMethod={formState.searchMethodName} />
                        </>
                    }/>
                    <Route path='/breweries/:userQueryBy=:userQuery&sort=:sortMethod::sortDirection&per_page=:perPage&page=:pageNumber' element={
                        <>
                            <Search textInput={handleTextInput} radioClick={handleRadioClick} submitClick={handleSubmitClick} searchMethod={formState.searchMethodName} />
                            <SearchResults/>
                        </>
                    }/>
                </Routes>
                <div className="inner-bubbles inner-bubble-1"></div>
            </div>
            {/* <h3>*⬆ END OF HOME PAGE ⬆*</h3> */}
        </>
    )
}

export default Home