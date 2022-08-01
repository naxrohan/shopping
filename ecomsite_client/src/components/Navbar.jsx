import React from 'react'
import styled from 'styled-components';
import {Search, ShoppingBasketOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core';
import {mobile} from '../responsive';
import { useSelector} from "react-redux"
import { Link } from 'react-router-dom';


const Container = styled.div`
    height: 60px;

    ${mobile({height: "40px"})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({padding: "5px 10px"})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const SearchContainer = styled.div`
    flex: 1;
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left:25px;
    padding: 5px 5px;
`
const Input = styled.input`
    border: none;
    flex: 1;
    
    ${mobile({
      width: "12px",
      })}
`

const Language = styled.span`
    cursor:pointer;
    font-size: 14px;
    ${mobile({display: "none"})}
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    
    ${mobile({
      fontSize: "20px",
      })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: flex-end;
    
    ${mobile({
      flex: "3",
      justifyContent: "flex-start"
      })}
`
const MenuItem = styled.div`
    flex: 1;
    cursor:pointer;
    margin-left: 15px;
    max-width:40px;

    ${mobile({
      maxWidth: "30px",
      fontSize: "12px",
    })}
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input />
                    <Search style={{color:"gray", fontSize:16}} />
                </SearchContainer>
            </Left>
            <Center>
                <Logo>SSS.</Logo>
            </Center>
            <Right>
                <Link to={'/cart'}>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary" >
                            <ShoppingBasketOutlined />
                        </Badge>
                    </MenuItem>
                </Link>
                <Link to={'/register'}>
                    <MenuItem>Register</MenuItem>
                </Link>
                <Link to={'/login'}>
                    <MenuItem>SignIn</MenuItem>
                </Link>
                <Link to={'/logout'}>
                    <MenuItem>Logout</MenuItem>
                </Link>
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar