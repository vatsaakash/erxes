import styledTS from 'styled-components-ts';
import styled from 'styled-components';
import { backgroundGray, border } from '../../common/styles/constants';

const Header = styled.header`
  display: flex;
  padding: 1.25rem;
  align-items: center;
  .pos-header-wrapper {
    flex: 0 0 auto;
    display: flex;
  }
  .logo {
    padding: 0.25rem 0.75rem;
    line-height: 1;
    img {
      height: 2.5rem;
      width: auto;
      object-fit: cover;
      margin-bottom: 0;
    }
  }
  border-bottom: ${border};
`;

const GrayBorder = styled.div`
  border-radius: 0.5rem;
  background: ${backgroundGray};
  padding: 0.25rem;
  margin-right: 2rem;
  & > * {
    border-radius: 0.25rem;
    background: #fff;
  }
  &:first-child {
    margin-right: 1rem;
  }
`;

const HeaderMenu = styled.div`
  font-size: 1.5rem;
  padding: 0.75rem;
  line-height: 1em;
`;
const Container = styled.div`
  display: flex;
  min-width: 100%;
  max-width: 100%;
  overflow: hidden;
  flex-flow: row nowrap;
  height: calc(100vh - 7.5rem);
  padding-bottom: 0.75rem;
`;

const oneThird = (1 / 3) * 100;

const Content = styled.div`
  max-width: ${oneThird * 2}%;
  flex: 1 1 ${oneThird * 2}%;
  height: 100%;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
`;

export { Header, GrayBorder, HeaderMenu, Container, Content };
