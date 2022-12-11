const Search = (props) => {
    return (
        <>
            {/* <h4>*⬇ START OF SEARCH COMPONENT ⬇*</h4> */}
            <div className="search">
                <h2>Search breweries by {props.searchMethod}</h2>
                <form onSubmit={props.submitClick}>
                    <div className="search-radio-buttons">
                        <label name="searchMethod"><input type="radio" id="name" name="searchMethod" value="by_name" checked={props.searchMethod === "name"} onChange={props.radioClick}/>Brewery name</label>
                        <label name="searchMethod"><input type="radio" id="city" name="searchMethod" value="by_city" checked={props.searchMethod === "city"} onChange={props.radioClick}/>City</label>
                        <label name="searchMethod"><input type="radio" id="state" name="searchMethod" value="by_state" checked={props.searchMethod === "state"} onChange={props.radioClick}/>State</label>
                        <label name="searchMethod"><input type="radio" id="country" name="searchMethod" value="by_country" checked={props.searchMethod === "country"} onChange={props.radioClick}/>Country</label>
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
            {/* <h4>*⬆ END OF SEARCH COMPONENT ⬆*</h4> */}
        </>
    )
}

export default Search