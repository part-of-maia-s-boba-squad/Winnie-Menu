import React from 'react';
import Description from './Description.jsx';
import { review_icon, price_icon, cuisine_icon, crossStreet_icon, diningStyle_icon, neighborhood_icon, crossSt_icon, hours_icon } from './Icons.jsx';
import styled from 'styled-components';
import StarSymbol from './StarSymbol.jsx';

const H = {};
H.Button = styled.button`
  border: 1px solid #d8d9db;
  font-family: 'Montserrat',sans-serif;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1;
  border-radius: 1rem;
  :hover {
    border: 2px solid red;
  }
  &:focus {outline:0};
  color: black;
  margin: 0 0.5em;
  padding: 0.25em 1em;
`
H.ReviewIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-repeat: no-repeat;
  background-position: 50%;
  display: inline-block;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='30' height='30' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style='background:%23fff'%3E%3Ctitle%3Eicon/ic_review%3C/title%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath d='M19 4H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h6l4.36 3.63a1 1 0 0 0 1.64-.77V17h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 11h-4v2.73L11.72 15H5V6h14v9z' fill='%23333' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")
`
H.Des = styled.section`
  padding: 0.5rem;
  padding-bottom: 2rem;
  text-align: left;

`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
H.Title = styled.h2`
  font-size: 3em;
  text-align: left;
`;
const Wrapper = styled.section`
  padding: 0.75rem;
  border-bottom: 1px solid #d8d9db;
  margin: 0 0 0.25rem;
`;

const Block = styled.div`
  height: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem;

`;
const BlockItem = styled.span`
  margin-right: 1rem;
  color: tomato;
  font-weight: bold;
  align-self: center;

`
const BlockText = styled.span`
  margin-right: 1rem;
`

H.Tag = styled.div`
  height: 1.5rem;
  margin-bottom: 1rem;
  display: flex-wrap;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem;

`;

var Header = ({ res }) => {
  var pricelevel_verbal;
  switch (res.priceLevel) {
    case 0: pricelevel_verbal = '$0 to $30'
    case 1: pricelevel_verbal = '$31 to $50'
    case 2: pricelevel_verbal = '$51 to 80'
    case 3: pricelevel_verbal = '$80 to $100'
    case 4: pricelevel_verbal = 'Over $100'
  }
  var item = <div></div>;

  if (res[0].top_tags !== undefined) {
    // item = res.topTags.map((i, idx) => (
    //   <H.Button key={idx.toString()}>{i}</H.Button>
    // ))
    item = <H.Button key={res[0].top_tags}>{res[0].top_tags}</H.Button>
  }
  return (
    <Container>
      <Wrapper>
        <H.Title>{res[0].res_name}</H.Title>
      </Wrapper>
      <Block>
        <StarSymbol stars={res.star}> {res.star} </StarSymbol><BlockText> </BlockText>
        <BlockItem> <H.ReviewIcon /></BlockItem> <BlockText>{res[0].review_count} reviews </BlockText>
        <BlockItem>{price_icon}</BlockItem> <BlockText>{pricelevel_verbal}</BlockText>
        <BlockItem>{cuisine_icon}</BlockItem> <BlockText>{res[0].cuisine}</BlockText>
      </Block>
      <H.Tag>
        Top Tags: {item}
      </H.Tag>
      <H.Des>
        <Description description={res[0].res_info} />
      </H.Des>
    </Container>
  );
}


export default Header;