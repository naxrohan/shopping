import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    flex:1;
    margin: 3px;
    height: 70vh;
    position: relative;

    ${mobile({
      height: "50vh",
      margin: "1px"
      })}
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${mobile({
      height: "50%",
      width: "90%"
      })}
`;
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h1`
    color: white;
    background-color: gray;
    opacity: 0.9;
    margin-bottom: 20px;
    padding: 5px 10px;
`;
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`;



const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`} >
        <Image src={item.img} />
        <Info>
            <Title>{item.title}</Title>
            <Button>Shop Now</Button>
        </Info>
        </Link>
    </Container>
  );
}

export default CategoryItem;