import { useState } from "react"

const Search = (props) => {
    const initialState = {
        // form states go here
    }

    const [formState, setFormState] = useState(initialState)

    const handleTextInput = (event) => {
        console.log(event.target.name, event.target.value)
        setFormState({...formState})
    }

    const handleSubmitClick = (event) => {
        event.preventDefault()
        console.log(event.target.email.value)
    }

    return (
        <div className="search">
            <h4>* ⬇ START OF SEARCH COMPONENT ⬇ *</h4>
            <h2>Search by postal code</h2>
            <form>
                <input
                    name="search-bar"
                    placeholder="Enter text"
                    onChange={handleTextInput}
                />
                <button onSubmit={handleSubmitClick}>Submit</button>
            </form>
            <h4>* ⬆ END OF SEARCH COMPONENT ⬆ *</h4>
        </div>
    )
}

export default Search