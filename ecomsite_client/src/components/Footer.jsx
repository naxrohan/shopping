import { Facebook, GitHub, Instagram, MailOutline, PaymentOutlined, PaymentSharp, PaymentTwoTone, Phone, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"
import { mobile } from "../responsive"


const Container = styled.div`
    display: flex;
    margin: 20px;
    ${mobile({
        margin:"5px",
        flexDirection: "column"
    })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const Logo = styled.h1`
    font-weight: bold;
`
const Desc = styled.p`
    margin: 20px 0px;
    ${mobile({
        margin:"10px 0px",
        width: "85%"
    })}
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        margin:"10px 0px",
        width: "85%",
        padding: "5px"
    })}
`
const Title = styled.div`
margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        margin:"10px 0px",
        width: "85%",
        padding: "5px"
    })}
`
const ContactItem = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content:left;
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>SSS.</Logo>
            <Desc>
                This is a sample ecommerse site [SSS | Simply Shopping Site].
                This site is developed using reactJS & styled components.
                This is a sample ecommerse site [SSS | Simply Shopping Site].
                This site is developed using reactJS & styled components. 
            </Desc>
            <SocialContainer>
                <SocialIcon bg="3b5999">
                    <Facebook  />
                </SocialIcon>
                <SocialIcon bg="e4405f">
                    <Instagram  />
                </SocialIcon>
                <SocialIcon bg="cccccc">
                    <GitHub  />
                </SocialIcon>
                <SocialIcon bg="55acee">
                    <Twitter  />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order tracking</ListItem>
                <ListItem>Whishlist</ListItem>
                <ListItem>Terms</ListItem>
                <ListItem>Gents Fashion</ListItem>
                <ListItem>Ladies Fashion</ListItem>
                
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight: "10px"}} />
                6 Currys, Foody Road, IR, H91 KRX9 </ContactItem>
            <ContactItem>
                <Phone style={{marginRight: "10px"}}/>
                +353 098 9882922
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight: "10px"}}/>
                contact@sss.dev
            </ContactItem>
            <ContactItem>
                <PaymentSharp /> 
                <PaymentOutlined />
                <PaymentTwoTone style={{marginRight: "10px"}}/>
                Payment Options
            </ContactItem>
        </Right>
    </Container>
  )
}

export default Footer