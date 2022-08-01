import { Send } from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;

  ${mobile({
      height: "30vh",
      margin: "1px 5px"
      })}
`;
const Title = styled.h1`
  font-size:70px;
  margin-bottom: 20px;
  
  ${mobile({
    fontSize: "50px"
  })}
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;

  ${mobile({
    fontSize: "18px"
  })}
`;
const InputContainer = styled.div`
  width: 400px;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid gold;

  ${mobile({
    width: "250px"
  })}
`;
const Input = styled.input`
  border:none;
  flex: 8;
  padding-left: 20px;
  ${mobile({
    padding: "0px"
  })}
`;
const Button = styled.button`
flex: 1;
border: none;
background-color: teal;
color: white;
`;

const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favourite products.</Desc>
        <InputContainer>
            <Input placeholder='Your Email' />
            <Button >
                <Send />
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter