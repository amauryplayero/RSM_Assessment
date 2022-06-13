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

    // mapContainer

  return (
    <>
    <div id="listAndDetailsContainer">
        <div className="brewerieContainer">

        {handleMappingBreweries}
        </div>

        <div className="detailsContainer">
            <p>Name:{selectedBrewerie.name}</p>
            <p>Street:{selectedBrewerie.street}</p>
            <p>State:{selectedBrewerie.state}</p>
            <p>ZIP:{selectedBrewerie.postal_code}</p>
            <p>City:{selectedBrewerie.city}</p>
            <p>url:<a href={selectedBrewerie.website_url} target="_blank">{selectedBrewerie.website_url}</a></p>
        </div>

        <Map coordinates={{
                latitude:selectedBrewerie.latitude,
                longitude:selectedBrewerie.longitude
                }} 
            />
    </div>
    </>
  )
}
