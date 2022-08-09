import React from 'react';
import { Row } from './style';
import Product from './Product';

export default function Products() {
  return (
    <Row>
      {Array.from({ length: 30 }).map((_, index) => (
        <Product key={index} />
      ))}
    </Row>
  );
}
