import { Add, Remove } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import {publicRequest} from "../requestMethods";
import {addProduct} from "../redux/cartRedux"
import {useDispatch} from "react-redux"

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImageContainer = styled.div`
    padding: 0px 50px;
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 10px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0px;
`
const Filter = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin: 0px 10px;
`
const Filtercolor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 5px;
    background-color: ${(props) => props.color};
    cursor: pointer;
    border: 0.5px solid #00a;
`
const FilterSize = styled.select`
    margin: 0px 10px;
    padding: 5px 0px;
`
const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: felx;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0px;
`
const AmountContainer = styled.div`
    display: felx;
    justify-content: space-between;
    width: 100px;
    /* padding-bottom: 20px; */
`
const Amount = styled.span`
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
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid teal;
    cursor: pointer;
    &:hover {
        background-color: #e9e3e3;
    }
`

const Product = () => {
    const location = useLocation();
    let pathParts = location.pathname.split("/");
    const productId = pathParts.length === 3 ? pathParts[2] : "";

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const gotProducts = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${productId}`);
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        gotProducts();
    },[productId]);

    const handleQuantity = (type) => {
        if (type === "inc") {
            setQuantity(quantity + 1);
        } else if(type === "dec"){
            setQuantity(quantity===1 ? 1: quantity-1);
        }
    }

    const handleAddCart = () => {
        dispatch(addProduct({ ...product, quantity, color, size}));
    }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper >
            <ImageContainer>
                <Image src={product.img} />
            </ImageContainer>
            <InfoContainer >
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>{`$ ${product.price}`}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                         { product.color?.map((c) =>
                            <Filtercolor
                                onClick={() => setColor(c)}
                                color={c}
                                key={c}/>
                        ) }
                    </Filter>
                    <Filter onChange={(e) => setSize(e.target.value)}>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                        <FilterSizeOption value="">Size</FilterSizeOption>
                            { product.size?.map((s) => 
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ) } 
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={() => handleQuantity("dec")} />
                        <Amount>{quantity}</Amount>
                        <Add onClick={() => handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleAddCart}>Add to Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Product