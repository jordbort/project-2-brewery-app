// import '../Brewery.css'
import "../sassStyles/components/_brewery.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Map from "../components/Map"

export default function Brewery() {
    const [brewery, setBrewery] = useState({})
    const [totalBreweries, setTotalBreweries] = useState(0)

    const selectedBrewery = useParams()

    async function getTotalBreweries() {
        let data
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries/meta`)
            data = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setTotalBreweries(data.total)
        }
    }

    // API call for brewery selected from the Search Results
    async function findRandomBrewery(randNum) {
        let randomBrewery
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries/?page=${randNum}&per_page=1`)
            randomBrewery = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setBrewery(randomBrewery[0])
        }
    }

    // API call for brewery selected by random number
    async function findBrewery(breweryName) {
        let chosenBrewery
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries/${breweryName}`)
            chosenBrewery = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setBrewery(chosenBrewery)
        }
    }

    // handles button click for "Random Brewery" button
    function handleClick() {
        const randNum = Math.floor(Math.random() * totalBreweries)
        setBrewery({})
        findRandomBrewery(randNum)
    }

    useEffect(() => {
        if (totalBreweries && selectedBrewery.brewery === "random") {
            findRandomBrewery(Math.floor(Math.random() * totalBreweries))
        }
        if (!brewery.id && selectedBrewery.brewery !== "random") {
            findBrewery(selectedBrewery.brewery)
        }
        if (!totalBreweries) {
            getTotalBreweries()
        }

        // Just for demonstration, since resetting the state variables would cause an infinite loop
    }, [totalBreweries, selectedBrewery.brewery])

    const { name, brewery_type, street, address_2, address_3, county_province, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery

    function loaded() {
        return (
            <div className="brewery">
                <div className="brewery-header">
                    <h2 className="brewery-details-header">Brewery details:</h2>
                    <button onClick={handleClick}>
                        <span>Random Brewery</span>
                    </button>
                </div>
                <div className="details">
                    <div className="brewery-container">
                        <div className="brewery-info">
                            <h3 className="brewery-name">{name}</h3>
                            {brewery_type && brewery_type !== "closed" ? <h4 className="brewery-type">Brewery type: {brewery_type}</h4> : null}
                            {street && street !== "Unnamed Street" ? <p>{street}</p> : null}
                            {address_2 ? <p>{address_2}</p> : null}
                            {address_3 ? <p>{address_3}</p> : null}
                            {city && postal_code ? (
                                <p>
                                    {city ? city : null}
                                    {state ? `, ${state}` : null} {postal_code ? postal_code : null}
                                </p>
                            ) : null}
                            {county_province && country !== "United States" ? (
                                <p>
                                    {county_province ? `${county_province}, ` : null}
                                    {country !== "United States" ? country : null}
                                </p>
                            ) : null}
                            <br />
                            {phone ? (
                                <p>
                                    <FontAwesomeIcon icon="fa-solid fa-phone" />{" "}
                                    {phone.length === 10 && country === "United States" ? `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}` : phone}
                                </p>
                            ) : null}
                            {website_url ? (
                                <p>
                                    <FontAwesomeIcon icon="fa-solid fa-globe" />{" "}
                                    <a href={website_url} target="_blank" rel="noreferrer">
                                        {website_url}
                                    </a>
                                </p>
                            ) : null}
                            <br />
                            {updated_at ? (
                                <p>
                                    <em>Last updated: {updated_at[5] + updated_at[6] + `/` + updated_at[8] + updated_at[9] + `/` + updated_at[0] + updated_at[1] + updated_at[2] + updated_at[3]}</em>
                                </p>
                            ) : null}
                        </div>

                        {brewery.id && latitude && longitude ? (
                            <div className="map-container">
                                <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code} />
                            </div>
                        ) : (
                            <div className="map-container no-map">
                                <p>
                                    <FontAwesomeIcon icon="fa-solid fa-beer-mug-empty" size="10x" className="empty-mug" />
                                </p>
                                <p>(No map available)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return totalBreweries && brewery.id ? loaded() : <h2 className="brewery-details-header">Loading brewery info...</h2>
}
