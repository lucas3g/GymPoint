import React, { useState, useEffect } from 'react';

import { Container, ContentTable } from './styles';

export default function Table() {
  const [headers, setheaders] = useState(['']);

  useEffect(() => {
    function addToHeader(data) {
      setheaders(data);
    }
    addToHeader();
  }, [headers]);

  return (
    <Container>
      <ContentTable>
        <thead>
          <tr>
            <th>teste</th>
          </tr>
        </thead>
      </ContentTable>
    </Container>
  );
}
