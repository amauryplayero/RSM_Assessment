import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Map from './Map'
import { Wrapper, Status } from "@googlemaps/react-wrapper";



export default function AllBreweries() {


    const [allBreweries, setAllBreweries] = useState([])
    const [selectedBrewerie, setSelectedBrewerie] = useState("")


useEffect(() => {
        getAllBreweries()
    }, []);

const showDetails = (brewery)=>{
    
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=${brewery.name}`).then(
        res=>{
        // setSelectedBrewerie(res.data) 
        let response = res.data
        let filtered = response.filter(e=>e.city===brewery.city)
        setSelectedBrewerie(filtered[0])
        // console.log(res.data)
        }
    )

}


const getAllBreweries = () =>{
    axios.get('https://api.openbrewerydb.org/breweries?by_city=new_york&per_page=50').then(res=>{
 
    let breweriesArr = res.data
    setAllBreweries(breweriesArr)
    })}

    
    let handleMappingBreweries = allBreweries.map((brewery,i)=>{
       return <button onClick={()=>showDetails(brewery)}>{brewery.name}</button>
    })
    

    const render = (status: Status) => {
        return <h1>{status}</h1>;
      };

    

    let googleMap 
    
    selectedBrewerie.latitude ?
        googleMap = <Map coordinates={{
        latitude:selectedBrewerie.latitude,
        longitude:selectedBrewerie.longitude
        }} />
        :
        googleMap = <Map coordinates={{
            latitude:0,
            longitude:0
            }} />

  return (
    <>
    <div style={{
    display:"flex",
    flexDirection:"column", 
    border: "red solid",
    width: "200px"
    }}>

    {handleMappingBreweries}
    </div>

    <div>
        <p>Name:{selectedBrewerie.name}</p>
        <p>Street:{selectedBrewerie.street}</p>
        <p>State:{selectedBrewerie.state}</p>
        <p>ZIP:{selectedBrewerie.postal_code}</p>
        <p>City:{selectedBrewerie.city}</p>
        <p>url:<a href={selectedBrewerie.website_url} target="_blank">{selectedBrewerie.website_url}</a></p>
    </div>

   {googleMap}
    </>
  )
}
