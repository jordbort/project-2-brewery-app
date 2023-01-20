import '../Brewery.css'

import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Map from "../components/Map"

export default function Brewery() {
    const [brewery, setBrewery] = useState({})

    const selectedBrewery = useParams()

    /*
    const [totalBreweries, setTotalBreweries] = useState(8170) // <= putting our most up-to-date count of total breweries here is better than putting 0, otherwise the first random brewery will always be the same

    - This function would ensure that we're always working with the up-to-date total of breweries in the database, at least after the first page render
    - We need to restructure the components before we can use it though, because it can't run here without causing another render
    - Causing the page to render again risks making the map out of sync again
    - We could make the brewery info/details its own component on this page, so we can use this getTotalBreweries function here, and pass its state data down as props
    - (Unfortunately you can't use useState or other React hooks at the top / App.js level... I tried)

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
    */

    // API call for when "Random Brewery" button is clicked
    async function handleRandomFetch(randomNumber) {
        let randomBrewery
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries/?page=${randomNumber}&per_page=1`)
            randomBrewery = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setBrewery(randomBrewery[0])
        }
    }

    // API call for brewery selected from the Search Results page
    async function handleNormalFetch(breweryName) {
        let chosenBrewery
        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries/?page=${breweryName}&per_page=1`)
            chosenBrewery = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setBrewery(chosenBrewery[0])
        }
    }

    // handles button click for "Random Brewery" button
    function handleClick() {
        const randNum = Math.floor(Math.random() * 8170) // initial count, current total as of January 19, 2023
        setBrewery({})
        handleRandomFetch(randNum)
    }

    useEffect(() => {
        selectedBrewery.brewery === 'random' ? handleRandomFetch(Math.floor(Math.random() * 8170)) : handleNormalFetch(selectedBrewery.brewery)
        
        return (() => {
            setBrewery({})
        })
    }, [selectedBrewery.brewery])


    function loaded() {
        const { name, brewery_type, street, address_2, address_3, county_province, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery

        return (
            <>
                <h2 className='brewery-details-header'>Brewery details:</h2>
                <button className='random-brewery-button' onClick={handleClick}>Random Brewery</button>
                <div className='details'>
                    <div className="brewery-container">
                        <div className='brewery-info'>
                            <h3 className='brewery-name'>{name}</h3>
                            {brewery_type && brewery_type !== "closed" ? <h4 className='brewery-type'>Brewery type: {brewery_type}</h4> : null}
                            {street && street !== "Unnamed Street" ? <p>{street}</p> : null}
                            {address_2 ? <p>{address_2}</p> : null}
                            {address_3 ? <p>{address_3}</p> : null}
                            {city && postal_code ? <p>{city ? city : null}{state ? `, ${state}` : null} {postal_code ? postal_code : null}</p> : null}
                            {county_province && country !== "United States" ? <p>{county_province ? `${county_province}, ` : null}{country !== "United States" ? country : null}</p> : null}
                            <br />
                            {phone ? <p><FontAwesomeIcon icon="fa-solid fa-phone" /> {phone.length === 10 && country === "United States" ? `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}` : phone}</p> : null}
                            {website_url ? <p><FontAwesomeIcon icon="fa-solid fa-globe" /> <a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></p> : null}
                            <br />
                            {updated_at ? <p><em>Last updated: {updated_at[5] + updated_at[6] + `/` + updated_at[8] + updated_at[9] + `/` + updated_at[0] + updated_at[1] + updated_at[2] + updated_at[3]}</em></p> : null}
                        </div>

                        {brewery.id && latitude && longitude ?
                            <div className="map-container">
                                <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code} />
                            </div> :
                            <div className="map-container no-map">
                                <p><FontAwesomeIcon icon="fa-solid fa-beer-mug-empty" size="10x" className="empty-mug" /></p>
                                <p>(No map available)</p>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
        // }
    }

    return brewery?.id ? loaded() : <h2 className='brewery-details-header'>Loading brewery info...</h2>
}