import Search from "../components/Search"

const Home = (props) => {
    return (
        <>
            <h4>⬇⬇⬇ START OF HOME PAGE ⬇⬇⬇</h4>
            <div className="home">
                <h2>This is the Home page!</h2>
                <p>Use the search component below!</p>
                <Search />
            </div>
            <h4>⬆⬆⬆ END OF HOME PAGE ⬆⬆⬆</h4>
        </>
    )
}

export default Home