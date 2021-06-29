import React from 'react'
import Documentos from '../../../assets/bagagens.svg'
import {
    Container,
    BoxContent,
    SubTitle,
    Title,
    BoxListAdvantages,
    BoxAdvantage,
    TitleItem,
    DescriptionItem,
    Image
} from './styles'

const Advantage = () => {
    return (
        <Container>
            <BoxContent>
                <SubTitle>TUDO DE MELHOR PARA VOCÊ</SubTitle>
                <Title>Aproveite as vantagens</Title>

                <BoxListAdvantages>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                    <BoxAdvantage>
                        <Image src={Documentos} />
                        <TitleItem>Documentos</TitleItem>
                        <DescriptionItem>
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit. Illo, nemo nulla
                            </DescriptionItem>
                    </BoxAdvantage>
                </BoxListAdvantages>
            </BoxContent>
        </Container>
    )
}
export default Advantage



