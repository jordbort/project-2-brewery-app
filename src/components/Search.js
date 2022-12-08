import { useState } from "react"

const Search = (props) => {
    const initialState = {
        searchBar: null,
        searchMethod: null
    }

    const [formState, setFormState] = useState(initialState)
    console.log(formState)

    const handleTextInput = (event) => {
        // console.log(event.target.name, event.target.value)
        setFormState({...formState, [event.target.name]: event.target.value})
    }

    const handleSubmitClick = (event) => {
        event.preventDefault()
        // console.log(event.target.value)
    }

    const handleRadioClick = (event) => {
        // console.log(event.target.name, event.target.value, event.target)
        setFormState({...formState, [event.target.name]: event.target.id})
    }

    return (
        <div className="search">
            <h4>* ⬇ START OF SEARCH COMPONENT ⬇ *</h4>
            <h2>Search breweries{formState.searchMethod ? ` by ${formState.searchMethod}` : null}</h2>
            <form>
                <input
                    name="searchBar"
                    placeholder="Enter text"
                    onChange={handleTextInput}
                />
                <button type="submit" onSubmit={handleSubmitClick}>Submit</button>
                <div className="search-radio-buttons">
                    <label name="searchMethod"><input type="radio" id="name" name="searchMethod" value="by_name" onChange={handleRadioClick}/>Brewery name</label>
                    <label name="searchMethod"><input type="radio" id="city" name="searchMethod" value="by_city" onChange={handleRadioClick}/>City</label>
                    <label name="searchMethod"><input type="radio" id="state" name="searchMethod" value="by_state" onChange={handleRadioClick}/>State</label>
                    <label name="searchMethod"><input type="radio" id="country" name="searchMethod" value="by_country" onChange={handleRadioClick}/>Country</label>
                </div>
            </form>
            <h4>* ⬆ END OF SEARCH COMPONENT ⬆ *</h4>
        </div>
    )
}

export default Search