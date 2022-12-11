import '../Brewery.css'

import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Map from "../components/Map"

const Brewery = (props) => {
    const [ brewery, setBrewery ] = useState([])
    const [ randomBrewery, setRandomBreweryState ] = useState()
    const [ randomNumber, setRandomNumber ] = useState()
    const selectedBrewery = useParams()

    const randNum = () => {
        return Math.floor(Math.random()*8163)
    }
    const handleRandomFetch = useCallback(async () => {
        const newNum = randNum()
        // console.log(randomNumber)
        // console.log(newNum)
        setRandomNumber(newNum)
        const randURL = `https://api.openbrewerydb.org/breweries/?page=${newNum}&per_page=1`
        // console.log('randURL is', randURL)
        fetch (randURL)
        .then ((res) => res.json())
        .then ((data) => setRandomBreweryState(data))
        .catch((err) => console.log(err))
    },[])

    const handleNormalFetch = useCallback(async () => {
        const urlForFetch = 'https://api.openbrewerydb.org/breweries/'+selectedBrewery.brewery
        fetch (urlForFetch)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json)})  
    },[selectedBrewery.brewery])

    const handleClick = () => {
            handleRandomFetch()
            setBrewery(randomBrewery[0])
        }
        useEffect (() => {
            if (selectedBrewery.brewery !== 'random') {
                handleNormalFetch() 
        } else if (selectedBrewery.brewery === "random") {
            handleRandomFetch()
        }
    }, [handleNormalFetch, handleRandomFetch, selectedBrewery.brewery]) 
    
    // using this console log to clear error message
    // not sure how else to use randomNumber in code otherwise
    // console.log(`random number is`, randomNumber)

    const { name, street, address_2, address_3, county_province, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery

    if (!brewery) {
        <p>Loading brewery info...</p>
    }

    if (brewery) {
        return (
            <>
                <h2>Brewery details:</h2>
                <button className='random-brewery-button' onClick={handleClick}>Random Brewery</button>
                <div className='details'>
                    <div className="brewery-container">
                        <div className='brewery-info'>
                            <h3 className='brewery-name'>{name}</h3>
                            {street && street !== "Unnamed Street" ? <p>{street}</p> : null}
                            {address_2 ? <p>{address_2}</p> : null}
                            {address_3 ? <p>{address_3}</p> : null}
                            {city && postal_code ? <p>{city ? city : null}{state ? `, ${state}` : null} {postal_code ? postal_code : null}</p> : null}
                            {county_province && country !== "United States" ? <p>{county_province ? `${county_province}, ` : null}{country !== "United States" ? country : null}</p> : null}
                            {phone ? <p><FontAwesomeIcon icon="fa-solid fa-phone" /> {phone.length === 10 && country === "United States" ? `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}` : phone}</p> : null}
                            {website_url ? <p><FontAwesomeIcon icon="fa-solid fa-globe" /> <a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></p> : null}
                            {updated_at ? <p><em>Last updated: {updated_at[8]+updated_at[9] + `/` + updated_at[5]+updated_at[6] + `/` + updated_at[0]+updated_at[1]+updated_at[2]+updated_at[3]}</em></p> : null}
                        </div>

                        {latitude ? 
                            <div className="map-container"><Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code} /></div> : 
                            <div className="map-container"><p><FontAwesomeIcon icon="fa-solid fa-beer-mug-empty" size="10x" className="empty-mug" /></p></div>}

                    </div>
                </div>
            </>
        )    
    }
}

export default Brewery