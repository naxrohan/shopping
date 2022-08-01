import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``
const Title = styled.h1`
    margin: 0px 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: left;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin: 0px 10px;
`
const Select = styled.select`
    border: none;
    margin: 5px;
    padding: 10px;
`
const Option = styled.option``

const ProductList = () => {
    const location = useLocation();
    let pathParts = location.pathname.split("/");
    const cat = pathParts.length === 3 ? pathParts[2] : "";
    
    const [filter, setFilter] = useState({});
    const [sort, setSorter] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value
        });
    };

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{cat.toUpperCase()}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter product:</FilterText>
                <Select defaultValue={'Color'} onChange={handleFilters} name="color">
                    <Option>Colors</Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Green</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                </Select>
                <Select defaultValue={"Size"} onChange={handleFilters} name="size">
                    <Option>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort product:</FilterText>
                <Select defaultValue={"Sort"} onChange={(e) => setSorter(e.target.value)}>
                    <Option >Sort</Option>
                    <Option value="newest">Recently added</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filter={filter} sort={sort} />
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList