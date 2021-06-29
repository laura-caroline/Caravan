import React, {useState, useEffect} from 'react'
import img1 from '../../../assets/paris.jpg'
import img2 from '../../../assets/california.jpg'
import img3 from '../../../assets/dublin.jpg'
import {
    Container,
    BoxCarrosel,
    Image,
    BoxNewsletter,
    Title,
    Description
} from './styles'
import { MdNewReleases } from 'react-icons/md'
const Newsletter = () => {
    const [count, setCount] = useState(0)
    const [images, setImages] = useState([img1, img2, img3])

    const handleNextImage = () => {
        if (count < images.length - 1) {
            return setCount(count + 1)
        }
        return setCount(0)
    }
    useEffect(() => {
        setTimeout(() => {
            handleNextImage()
        }, 3000)
    })
    return (
        <Container>
            <BoxCarrosel>
                <Image src={images[count]} />
            </BoxCarrosel>
            <BoxNewsletter>
                <Title>Realize a viagem do seu sonho</Title>
                <Description>
                    O melhor local para viajar é com a Caravan, mais de 5.000 excursões concluídas.
                </Description>
            </BoxNewsletter>
        </Container>
    )
}
export default Newsletter
