import React from 'react';
import { Container, Content } from '../modules/pos/components/styles';
import ProductCategories from '../modules/products/components/Categories';
import Products from '../modules/products/components/Products';

type Props = {};

class PosHome extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Content>
          <ProductCategories />
          <Products />
        </Content>
      </Container>
    );
  }
}

export default PosHome;
