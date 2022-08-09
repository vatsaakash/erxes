import React from 'react';
import HorizontalScroll from '../../common/components/scrollMenu';
import { Category } from './style';

export default function Categories() {
  return (
    <HorizontalScroll
      className="categories"
      items={[
        { id: 'Favorite' },
        { id: 'All' },
        { id: 'Breakfast' },
        { id: 'Lunch' },
        { id: 'Dinner' },
        { id: 'Drinks' },
        { id: 'Dessert' },
        { id: 'Snacks' },
        { id: 'Bakery' },
        { id: 'Coffee' },
        { id: 'Juice' },
        { id: 'Tea' },
        { id: 'Cake' },
        { id: 'Cupcake' },
        { id: 'Candy' },
        { id: 'Cookies' },
        { id: 'Chips' }
      ]}
      ItemComponent={({ id }) => <Category btnStyle="link">{id}</Category>}
    ></HorizontalScroll>
  );
}
