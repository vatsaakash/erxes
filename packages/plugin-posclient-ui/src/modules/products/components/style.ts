import styled from 'styled-components';
import Button from '@erxes/ui/src/components/Button';
import { border } from '../../common/styles/constants';

const Category = styled(Button)`
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.68) !important;
  margin: 1.5rem 0;
  border: ${border} !important;
  padding: 0.75rem 1.5rem;
  font-size: 0.825rem;
  font-weight: 600;
  flex: 0 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: -0.625rem;
  overflow-y: auto;
  flex: 1 1 auto;
`;
const Item = styled.div`
  flex: 1 1 25%;
  max-width: 25%;
  padding: 0.625rem;
  .product {
    border: ${border};
    border-radius: 0.5rem;
    padding: 0.75rem;
    img {
      max-width: 100%;
      aspect-ratio: 16 / 12;
      object-fit: contain;
      margin-bottom: 0.75rem;
    }
    &-name,
    &-price {
      font-weight: 700;
      line-height: 1.5;
      text-align: center;
      letter-spacing: 0.15px;
    }
    &-price {
      margin-top: 0.25rem;
    }
  }
`;

export { Category, Row, Item };
