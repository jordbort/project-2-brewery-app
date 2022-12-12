const Search = (props) => {
    return (
        <>
            <h2>Search for breweries by {props.searchMethod}</h2>
            <div className="search">
                <form className="search-form" onSubmit={props.submitClick}>
                    <div className="search-radio-buttons">
                        <label name="searchMethod"><input type="radio" id="name" name="searchMethod" value="by_name" checked={props.searchMethod === "name"} onChange={props.radioClick} />Brewery name</label>
                        <label name="searchMethod"><input type="radio" id="city" name="searchMethod" value="by_city" checked={props.searchMethod === "city"} onChange={props.radioClick} />City</label>
                        <label name="searchMethod"><input type="radio" id="state" name="searchMethod" value="by_state" checked={props.searchMethod === "state"} onChange={props.radioClick} />State</label>
                        <label name="searchMethod"><input type="radio" id="postal code" name="searchMethod" value="by_postal" checked={props.searchMethod === "postal"} onChange={props.radioClick} />ZIP/Postal code</label>
                        <label name="searchMethod"><input type="radio" id="country" name="searchMethod" value="by_country" checked={props.searchMethod === "country"} onChange={props.radioClick} />Country</label>
                    </div>
                    <input
                        type="text"
                        name="searchBar"
                        placeholder="Enter text"
                        className="search-bar"
                        onChange={props.textInput}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Search