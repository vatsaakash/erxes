import styled from 'styled-components';

const Container = styled.div`
  max-width: 100%;
  position: relative;
  .react-horizontal-scrolling-menu--arrow {
    &-left {
      left: 0;
      button {
        &::after {
          content: '';
          pointer-events: none;
          width: 50px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          position: absolute;
          height: 100%;
          right: -50px;
          top: 0;
        }
      }
    }
    &-right {
      right: 0;
      button {
        &::after {
          content: '';
          pointer-events: none;
          width: 50px;
          background: linear-gradient(
            to left,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          position: absolute;
          height: 100%;
          left: -50px;
          top: 0;
        }
      }
    }
  }

  .react-horizontal-scrolling-menu--arrow-left,
  .react-horizontal-scrolling-menu--arrow-right {
    position: absolute;
    z-index: 100;
    min-height: 100%;
    top: 0;
    transition: all 0.5s;
    button {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      user-select: 'none';
      background-color: rgba(256, 256, 256, 0.98);
      border-radius: 0;
      transition: all 0.3s;
      position: relative;
      overflow: visible;
      i {
        line-height: 1rem;
        font-size: 1.4rem;
      }
      :disabled {
        display: none;
        width: 0;
      }
    }
  }
  &.categories {
    .react-horizontal-scrolling-menu--separator {
      padding-left: 0.75rem;
    }
  }
`;

export { Container };
