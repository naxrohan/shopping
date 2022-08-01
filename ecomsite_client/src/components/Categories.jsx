import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { categories } from '../slideData';
import CategoryItem from './CategoryItem';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({
      flexDirection: "column",
      padding: "0px"
      })}
`;

export const Categories = () => {
  return (
    <Container>
        {categories.map( (item) => (
            <CategoryItem item={item} key={item.id} />
        ))}
    </Container>
  )
}
