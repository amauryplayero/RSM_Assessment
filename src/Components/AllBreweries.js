import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Map from './Map'
import { idText } from 'typescript'
import Geocode from "react-geocode";



export default function AllBreweries() {


const [allBreweries, setAllBreweries] = useState([])
const [selectedBrewerie, setSelectedBrewerie] = useState("")
const [address, setAddress] = useState([])



useEffect(() => {
        getAllBreweries()
    }, []);

const showDetails = (brewery)=>{
    
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=${brewery.name}`).then(
        res=>{
        let response = res.data
        // filter to only NYC breweries
        let filtered = response.filter(e=>e.city===brewery.city)
        setSelectedBrewerie(filtered[0])
        }
    )

}

const getAllBreweries = () =>{
    axios.get('https://api.openbrewerydb.org/breweries?by_city=new_york&per_page=50').then(res=>{
    let breweriesArr = res.data
    setAllBreweries(breweriesArr)
    })}

    
let handleMappingBreweries = allBreweries.map((brewery,i)=>{
       return <button class="singleBrewerie"onClick={()=>showDetails(brewery)}>{brewery.name}</button>
    })

// ///////////Setting up latitudes if they dont exist. /////////


    let googleMap 

    if(selectedBrewerie===""){
        googleMap = ""

    }else if(selectedBrewerie.latitude===null){
        Geocode.setApiKey("AIzaSyBf5Z9QCm8ZVBbNAe3k1RFp6u1ufNs8FTY");
        Geocode.fromAddress(`${selectedBrewerie.city+' '+selectedBrewerie.street}`).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setSelectedBrewerie({...selectedBrewerie, latitude: lat, longitude: lng})
             
            },(error) =>{
              console.error(error)
            })

       
    } else {
    }

//    create an array of keys from the select brewery object 
// then whichever ones are undefined just show "url not currently available"

  return (
    <>
    <div id="listAndDetailsContainer">
        <div className="brewerieContainer">

        {handleMappingBreweries}
        </div>

        {/* <div className="detailsContainer">
            <h1 id="breweryNameEl">Harlmem Brewerie{selectedBrewerie.name}</h1>
            <p id="addressEl">123 Melrose st. Apt 353 {selectedBrewerie.street}</p>
            <p id="locationLineEl">New York City, NY, 11206 {selectedBrewerie.city}, {selectedBrewerie.state}, {selectedBrewerie.postal_code}</p>
               
       
            <p>www.google.com<a href={selectedBrewerie.website_url} target="_blank">{selectedBrewerie.website_url}</a></p>
        </div> */}

        <Map coordinates={{
                latitude:selectedBrewerie.latitude,
                longitude:selectedBrewerie.longitude
                }}/>
        <div id="emptyDetailsContainer">
            select a brewery
        </div>
    </div>
    </>
  )
}
