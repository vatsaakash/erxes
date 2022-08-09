import { injectGlobal } from 'styled-components';

const style = `
 body {
  //  *{
    font-size: 14px !important;  
    // overflow: hidden;
    @media only screen and (min-width: 1200px) and (max-width: 1399px) {
      font-size: 1.2vw !important;
    }
    @media only screen and (min-width: 1400px) and (max-width: 1599px) {
      font-size: 1vw !important;
    }
  //  }
 }
 
  .horizontal-scroll {
    max-width: 100%
  }
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .react-horizontal-scrolling-menu--item:first-child {
    margin-left: 1rem;
  }
  
`;

const globalStyle = [`${style}`] as any;

globalStyle.raw = [`${style}`];

injectGlobal(globalStyle);
