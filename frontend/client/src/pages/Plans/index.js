import React from 'react';
import headers from '~/components/Table';
import { Container } from './styles';

export default function Plans() {
  // headers.addToHeader(['Nome', 'Email', 'Senha']);
  return <Container>{headers}</Container>;
}
