import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    
    ${mobile({
      display: "none"
      })}
`
const Arrow = styled.div`
    width: 50px;
    height: 30px;
    background-color: #ffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${ props => props.direction === 'left' && "10px"};
    right: ${ props => props.direction === 'right' && "10px"};
    margin: auto;
    opacity: 0.5;
    z-index: 2;
`
const Wrapper = styled.div`
    height: 100%;
    display:flex;
    transition: all 1.5s ease;
    transform: translateX(${props=>props.slideIndex * -100}vw);
`;
const Slide = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    width:100vw;
    height:100vh;
    background-color: #${props => props.bg}
`;
const ImageContainer = styled.div`
    flex:1;
    padding-left:50px;
`;
const Image = styled.img`
    height:80%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;
const Title = styled.h1`
    font-size:50px;
`
const Desc = styled.p`
    margin: 10px 0px;
    font-size:20px;
    font-weight: 500;
    letter-spacing:3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [sliderItems, setSliderItems] = useState([]);

    useEffect(() => {
        const getSlides = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/slides/`
                );
                setSliderItems(res.data);
            }catch (error) {
                console.log(error)
            }
        };
        getSlides();
    },[]);

    const handleClick = (direction) => {
        const totalSlide = sliderItems.length -1;
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : totalSlide);
        } else {
            setSlideIndex(slideIndex < totalSlide ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map( (item) => (
                    <Slide bg={item.bgColor} key={item._id}>
                        <ImageContainer>
                            <Image src={item.img}/>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.shortDesc}</Desc>
                            <Button>Show Now</Button>
                        </InfoContainer>
                    </Slide>
                 ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider