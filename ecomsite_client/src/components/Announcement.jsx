import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;

    ${mobile({
      fontSize: "12px",
      alignItem: "start",
      justifyContent: "start",
      padding : "2px"
      })}
`

const Announcement = () => {
  return (
    <Container>
        Announcement: Super Deals!! Free Shipping in the UK & IE
    </Container>
  )
}

export default Announcement