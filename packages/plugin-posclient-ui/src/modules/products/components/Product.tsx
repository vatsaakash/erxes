import React from 'react';
import { Item } from './style';

export default function Product() {
  return (
    <Item>
      <div className="product">
        <img
          src="https://yoshinoyabucket.s3.us-east-2.amazonaws.com/0.24390352059101983%60613-1-Copy.png"
          alt=""
        />
        <div className="product-name">Үхрийн махтай боул</div>
        <div className="product-price">17,500₮</div>
      </div>
    </Item>
  );
}
