import React,{ useState } from "react"
import { API_KEY } from "../const";
import styles from "./styles.module.css"


function LocationSearch({ onCityFound }) {

    const [zipcode, setZipcode] = useState('');

    const getLocation = (zip) => {
        const url = `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${API_KEY}&q=${zip}`
        fetch(url).then(res => res.json())
            .then(res => res.find(l => l.Country.ID === "IN"))
            .then(res => onCityFound({
                name: res.SupplementalAdminAreas[0].LocalizedName,
                key: res.Key,
                state: res.AdministrativeArea.ID
            }))
    }
    return (
        <>
        <div className="container">
  <div className="row">
     <h1>⛅Forecast</h1>
        </div>
        <div className={styles.main}>
           
            <input
            placeholder="zipcode"
            className="form-control"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
            />
            <button 
            className="btn btn-outline-light"
            onClick={e => getLocation(zipcode)}>Search</button>
        </div>
        </div>
        </>
    )

}

export default LocationSearch