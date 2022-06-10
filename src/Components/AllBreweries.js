import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AllBreweries() {

    const [allBreweries, setAllBreweries] = useState([])
    const [selectedBrewerie, setSelectedBrewerie] = useState()


useEffect(() => {
        getAllBreweries()
    }, []);

const showDetails = ()=>{

}


const getAllBreweries = () =>{
    axios.get('https://api.openbrewerydb.org/breweries').then(res=>{
    console.log(res.data)
    let breweriesArr = res.data
    setAllBreweries(breweriesArr)
    })}

    
    let handleMappingBreweries = allBreweries.map((e,i)=>{
       return <button onClick={(e)=>showDetails(e)}>{e.name}</button>
    })

    // let detailedViewOfBrewerie = {
    //     name: selectedBrewerie.name, 
    //     street: selectedBrewerie.street,
    //     state: ,
    //     postal_code: ,
    //     phone: ,



    // }

    




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

    {/* <div>
        {detailedViewOfBrewerie}
    </div> */}
    
    </>
  )
}
