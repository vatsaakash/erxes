import React from 'react';
import PosHeader from './PosHeader';
import { Container } from './styles';

type Props = {
  children: any;
};

function PosLayout({ children }: Props) {
  return (
    <>
      <PosHeader />
      <Container>{children}</Container>
    </>
  );
}

export default PosLayout;
