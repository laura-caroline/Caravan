import React from 'react'
import Documentos from '../../../../assets/bagagens.svg'
import {
    Container,
    BoxListAdvantages,
    SubTitle,
    Title,
    BoxAdvantage,
    TitleItem,
    Description,
    Image
} from './styles'

const Advantage = () => {
    return (
        <Container>
            <SubTitle>TUDO DE MELHOR PARA VOCÊ</SubTitle>
            <Title>Aproveite as vantagens</Title>
            <BoxListAdvantages>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
                <BoxAdvantage>
                    <Image source={Documentos} />
                    <TitleItem>Documentos</TitleItem>
                    <Description>
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                    </Description>
                </BoxAdvantage>
            </BoxListAdvantages>
        </Container>
    )
}
export default Advantage



