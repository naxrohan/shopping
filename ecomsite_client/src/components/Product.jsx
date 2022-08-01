import styled from 'styled-components';
import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined} from '@material-ui/icons'
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Info = styled.div`
    opacity: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    top:0 ;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 250px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #dcdccd;
    position: relative;

    &:hover ${Info} {
        opacity:1;
    }

    ${mobile({
        height: "90%",
        alignItems: "start",
        justifyContent: "start",
        margin: "1px 5px"
      })}
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;

`
const Image = styled.img`
    height: 90%;
    width: 90%;
    z-index: 2;

    ${mobile({
        height: "70%",
        width: "80%"
      })}
`

const Icon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #9Fafff;
        transform: scale(1.1);
    }
`

const Product = ({item}) => {
  return (
    <Container>
        <Circle />
        <Image src={item.img} />
        <Info>
            <Icon>
                <ShoppingBasketOutlined />
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`} >
                    <SearchOutlined />
                </Link>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined />
            </Icon>
        </Info>
    </Container>
  )
}


export default Product;