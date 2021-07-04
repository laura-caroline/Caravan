import { parse } from 'date-fns'
import React, {createContext,useContext, useState, useEffect} from 'react'

const CheckOutContext = createContext()
const key = '@trips'

export const CheckOutProvider = ({children})=>{
    const [storagedTrips, setStoragedTrips] = useState([])
    const [showCheckOut, setShowCheckOut] = useState(false)
   
    useEffect(()=>{
        const getTripsStoraged = localStorage.getItem(key) || []
        const parsedStoragedTrips = getTripsStoraged.length > 0 && JSON.parse(getTripsStoraged)
        return setStoragedTrips(parsedStoragedTrips)
    },[])
    
    const handleAddStoragedTrips = (objTrip)=>{
        const getTripsStoraged = localStorage.getItem(key) || []

        if(getTripsStoraged.length > 0){
            const parsedStoragedTrips = JSON.parse(getTripsStoraged)
            const existsThisTripStorage = parsedStoragedTrips.find((trip)=>{
                return trip.id_trip === objTrip.id_trip
            })

            if(!existsThisTripStorage){
                localStorage.setItem(
                    key,
                    JSON.stringify([
                        ...JSON.parse(localStorage.getItem(key)),
                        objTrip
                    ])
                )
                setStoragedTrips([
                    ...storagedTrips, 
                    objTrip
            ])
                return setShowCheckOut(true)
            }
        }
        localStorage.setItem(key, JSON.stringify([objTrip]))   
        setStoragedTrips([objTrip])  
        return setShowCheckOut(true) 

    }
    const handleUpdateStoragedTrips = (index,item)=>{
        const [prop] = Object.keys(item)
        const [value] = Object.values(item)
        
        const copyTripsStoraged = [...copyTripsStoraged]
        copyTripsStoraged[index] = {...copyTripsStoraged[index], [prop]: value}

        localStorage.setItem(key, JSON.stringify(copyTripsStoraged))    
        return setStoragedTrips(copyTripsStoraged) 
        
    }

    const handleDeleteStoragedTrips = (objTrip)=>{
        const currentIndexTrip = storagedTrips.indexOf(objTrip)
        const parsedTrips = JSON.parse(localStorage.getItem(key))
        
        const deleteTripStorage = parsedTrips.filter((trip)=>{
            return trip.id_trip !== storagedTrips[currentIndexTrip].id_trip
        })
        localStorage.setItem(key, JSON.stringify(deleteTripStorage))
        return setStoragedTrips(deleteTripStorage)

    }

    const handleShowCheckOut = (bool)=>{
        return setShowCheckOut(bool)
    }
    return(
        <CheckOutContext.Provider value ={{
            storagedTrips,
            setStoragedTrips,
            handleAddStoragedTrips,
            handleUpdateStoragedTrips,
            handleDeleteStoragedTrips,
            handleShowCheckOut,
            showCheckOut,
            setShowCheckOut,

        }}>
            {children}
        </CheckOutContext.Provider>
    )
    
}

export const useCheckOut = ()=>{
    const {
        storagedTrips,
        setStoragedTrips,
        handleAddStoragedTrips,
        handleUpdateStoragedTrips,
        handleDeleteStoragedTrips,
        handleShowCheckOut,
        showCheckOut,
        setShowCheckOut,
    } = useContext(CheckOutContext)

    return {
        storagedTrips,
        setStoragedTrips,
        handleAddStoragedTrips,
        handleUpdateStoragedTrips,
        handleDeleteStoragedTrips,
        handleShowCheckOut,
        showCheckOut,
        setShowCheckOut,
    }

}