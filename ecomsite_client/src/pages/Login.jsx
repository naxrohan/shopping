import { useState } from "react"
import styled from "styled-components"
import { login , logout} from "../redux/apiCall"
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255,200,200,0.3)
    ), url("https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=1000&h=700&dpr=1")
    center;
    /* background-size: cover; */
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 24px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 20%;
    margin: 20px 0px 0px 0px;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 10px 0px;

    &:disabled {
        cursor: none;
        background-color: gray;
    }
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { isFetching, error} = useSelector((state) => state.user)

    const handleLoginClick = (e) => {
        e.preventDefault();
        login(dispatch,{username,password});
    }

    // logout logic
    const location = useLocation();
    let pathParts = location.pathname.split("/");
    const logoutAction = pathParts.length === 2 ? pathParts[1] : "";
        console.log(pathParts);
    if(logoutAction === "logout"){
        logout(dispatch);
    }

  return (
    <Container>
        <Wrapper>
        <Title>Sign-In</Title>
            <Form >
                <Input placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                <Button
                    onClick={handleLoginClick} disabled={isFetching}>
                        Login</Button>
                {error && <Error>Something went wrong!!</Error>}
                
                <Link>Forgot Password ?</Link>
                <Link>Create Account</Link>
            </Form>
        </Wrapper>

    </Container>
  )
}

export default Login