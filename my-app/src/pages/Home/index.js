import React from 'react'
import NavBar from './Header/index'
import Newsletter from './Newsletter/index'
import Advantage from './Advantage/index'
import Questions from './FrequentsQuestions/index'
import Footer from './Footer/index'
import { ScrollView } from 'react-native'

const Home = ()=>{
    return(
        <ScrollView>
            <NavBar/>                
            <Newsletter/>
            <Advantage/>
            <Questions/>
            <Footer/>
        </ScrollView>
    )
}
export default Home