import styledTS from 'styled-components-ts';
import styled from 'styled-components';
import { backgroundGray, border, COLORS } from '../../common/styles/constants';

const { success } = COLORS;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  overflow: hidden;

  .slot-number {
    background-color: ${success.medium};
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 800;
    margin: 0.25rem 0;
    &:hover {
      background-color: ${success.darker};
    }
    &::after {
      content: '';
    }
  }
  .react-horizontal-scrolling-menu--separator {
    padding: 0 0.5rem;
  }
`;
const Dropdown = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: 0.3s;
  margin-right: 1rem;
  flex: 0 0 auto;
  cursor: pointer;
  flex: 0 0 auto;
  i {
    margin-left: 0.5rem;
    font-size: 1.25rem;
    line-height: 1;
  }
  p {
    line-height: 1.15rem;
  }
  &:hover {
    background-color: ${backgroundGray};
  }
`;

export { Header, Dropdown };
