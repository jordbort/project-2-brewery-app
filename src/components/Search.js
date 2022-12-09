const Search = (props) => {
    return (
        <div className="search">
            <h4>*⬇ START OF SEARCH COMPONENT ⬇*</h4>
            <h2>Search breweries</h2>
            <form onSubmit={props.submitClick}>
                <input
                    name="searchBar"
                    placeholder="Enter text"
                    onChange={props.textInput}
                />
                <button type="submit">Submit</button>
                <div className="search-radio-buttons">
                    <label name="searchMethod"><input type="radio" id="name" name="searchMethod" value="by_name" onChange={props.radioClick}/>Brewery name</label>
                    <label name="searchMethod"><input type="radio" id="city" name="searchMethod" value="by_city" onChange={props.radioClick}/>City</label>
                    <label name="searchMethod"><input type="radio" id="state" name="searchMethod" value="by_state" onChange={props.radioClick}/>State</label>
                    <label name="searchMethod"><input type="radio" id="country" name="searchMethod" value="by_country" onChange={props.radioClick}/>Country</label>
                </div>
            </form>
            <h4>*⬆ END OF SEARCH COMPONENT ⬆*</h4>
        </div>
    )
}

export default Search