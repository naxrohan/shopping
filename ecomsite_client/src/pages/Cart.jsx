import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { Add, Remove } from "@material-ui/icons"
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 24px;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props)=> props.type === "filled" && "none"};
    background-color: ${(props)=> props.type === "filled" ? "black" : "transparent"};
    color: ${(props)=> props.type === "filled" && "white"};

`
const TopTexts = styled.div`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`


const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Info = styled.div`
    flex: 3;
    margin-top: 20px;
`
const ProductDesc = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    margin: 5px;
    border-bottom: 1px solid #ccc;
`
const ProductImageContainer = styled.div`
    flex:2;
    margin: 20px;
`
const ProductImage = styled.img`
    width: 200px;
    width: 200px;
`
const ProductDetails = styled.div`
    flex:3;
    display: flex;
    flex-direction: column;
`
const ProductName = styled.div`
    flex: 1;
    margin: 10px 0px;
    font-weight: 500;
`
const ProductId = styled.div`
    flex: 1;
    margin: 10px 0px;
    font-weight: 500;
`
const ProductColor = styled.span`
    width: 30px;
    height:30px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 10px 0px;
`
const ProductSize = styled.div`
    flex: 1;
    margin: 10px 0px;
    font-weight: 500;
`

const PriceDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductCountContainer = styled.div`
    display: felx;
    justify-content: space-between;
    width: 100px;
    padding-bottom: 20px;
`
const ProductAmount = styled.div`
    width: 30px;
    height: 30px;
    font-weight: 700;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid teal;
    display: flex;
    margin: 0px 5px;
`
const ProductTotalPrice = styled.div`
    font-weight: 700;
    font-size: 24px;
`
const Hr = styled.hr``

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin: 20px 10px;
    height: 100%;
`
const SummaryTitle = styled.div`
    font-weight: 400;
    font-size: 24px;
    text-align: center;
    padding-bottom: 20px;
    `
const SummaryItem = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    width: 100%;

    border-bottom: 1px solid ${(props) => props.type === "total" ? "white" : "gray"};
    font-size: ${(props) => props.type === "total" ? "24px" : "18px"};

`
const SummaryItemText = styled.div`
    flex: 2;
    font-weight: 500;
`
const SummaryItemDesc = styled.div`
    flex: 1;
`

const CartCheckout = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 10px 0px;
    align-items: flex-end;
`


const Cart = () => {
 const cart = useSelector(state => state.cart);
    return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title >Your Bag</Title>
            <Top>
                <Link to="/">
                    <TopButton>Continue Shopping</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Shopping Bar(2)</TopText>
                    <TopText>Your Whishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">Checkout Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                        <ProductDesc>
                            <ProductImageContainer>
                                <ProductImage src={product.img}/>
                            </ProductImageContainer>
                            <ProductDetails>
                                <ProductName><b>Name:&nbsp;</b>{product.title}</ProductName>
                                <ProductId><b>Id:&nbsp;</b>{product._id}</ProductId>
                                <ProductColor color={product.color} />
                                <ProductSize>
                                    <b>Size:&nbsp;</b>{product.size}
                                </ProductSize>
                            </ProductDetails>
                            <PriceDetails>
                                <ProductCountContainer>
                                    <Add />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove/>
                                </ProductCountContainer>
                                <ProductTotalPrice>
                                    ${product.price * product.quantity}
                                </ProductTotalPrice>
                            </PriceDetails>
                        </ProductDesc>
                    ))}
                </Info>
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal&nbsp;</SummaryItemText>
                        <SummaryItemDesc>$ {cart.total}</SummaryItemDesc>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Charges&nbsp;</SummaryItemText>
                        <SummaryItemDesc>$ 4.5</SummaryItemDesc>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total&nbsp;</SummaryItemText>
                        <SummaryItemDesc>$ {cart.total + 4.5}</SummaryItemDesc>
                    </SummaryItem>
                    <CartCheckout>
                        Checkout Now
                    </CartCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart