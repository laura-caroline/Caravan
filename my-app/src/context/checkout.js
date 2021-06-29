import React, {createContext,useContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
const CheckOutContext = createContext()
const key = '@trips'

export const CheckOutProvider = ({children})=>{
    const [storagedTrips, setStoragedTrips] = useState([])
    const [showCheckOut, setShowCheckOut] = useState(false)
   
    useEffect(()=>{
        (async ()=>{
            const getTripsStoraged = await AsyncStorage.getItem(key) || []
            const parsedStoragedTrips = getTripsStoraged.length > 0 && JSON.parse(getTripsStoraged)
            setStoragedTrips(parsedStoragedTrips)
        })()
        
    },[])
    
    const handleAddStoragedTrip = async (objTrip)=>{
        const getTripsStoraged = await AsyncStorage.getItem(key) || []

        if(getTripsStoraged.length > 0){
            const parsedStoragedTrips = JSON.parse(getTripsStoraged)
            const existsThisTripStorage = parsedStoragedTrips.find((trip)=>{
               return trip.id_trip === objTrip.id_trip
            })

            if(!existsThisTripStorage){
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify([
                        ...JSON.parse(await AsyncStorage.getItem(key)),
                        objTrip
                    ])   
                )
                setStoragedTrips([
                    ...storagedTrips,
                    objTrip
                ])
                return setShowCheckOut(true)
            }
            console.log('Atração já foi adicionada no carrinho')
        }
        await AsyncStorage.setItem(key, JSON.stringify([objTrip]))   
        setStoragedTrips([objTrip])  
        return setShowCheckOut(true) 

    }
    const handleUpdateStoragedTrips = async (index,item)=>{
        const [prop] = Object.keys(item)
        const [value] = Object.values(item)

        const copyTripsStoraged = [...copyTripsStoraged]
        copyTripsStoraged[index] = {...copyTripsStoraged[index], [prop]: value}

        await AsyncStorage.setItem(key, JSON.stringify(copyTripsStoraged))    
        return setStoragedTrips(copyTripsStoraged)  
    }

    const handleDeleteStoragedTrips = async (objTrip)=>{
        const currentIndexTrip = storagedTrips.indexOf(objTrip)
        const parsedTrips = JSON.parse(await AsyncStorage.getItem(key))

        const deleteTripStorage = parsedTrips.filter((trip)=>{
            return trip.id_trip !== storagedTrips[currentIndexTrip].id_trip
        })
        
        await AsyncStorage.setItem(key, JSON.stringify(deleteTripStorage))
        return setStoragedTrips(deleteTripStorage)

    }
    const handleCleanStoragedTrips = async ()=>{
        await AsyncStorage.removeItem(key)
        return setStoragedTrips([])
    }

    const handleShowCheckOut = (bool)=>{
        return setShowCheckOut(bool)
    }
    
    return(
        <CheckOutContext.Provider value ={{
            storagedTrips,
            setStoragedTrips,
            handleAddStoragedTrip,
            handleUpdateStoragedTrips,
            handleDeleteStoragedTrips,
            handleCleanStoragedTrips,
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
        handleAddStoragedTrip,
        handleUpdateStoragedTrips,
        handleDeleteStoragedTrips,
        handleCleanStoragedTrips,
        handleShowCheckOut,
        showCheckOut,
        setShowCheckOut,
        
    } = useContext(CheckOutContext)

    return {
        storagedTrips,
        setStoragedTrips,
        handleAddStoragedTrip,
        handleUpdateStoragedTrips,
        handleDeleteStoragedTrips,
        handleCleanStoragedTrips,
        handleShowCheckOut,
        showCheckOut,
        setShowCheckOut,
    }

}