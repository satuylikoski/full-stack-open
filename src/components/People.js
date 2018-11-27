import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../common/Button';

function People({ personsList, toggleDelete, toggleImportance }) {
  return (
    <Table>
      <tbody>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Number</TableHeader>
          <TableHeader>Options</TableHeader>
        </TableRow>
        {personsList.map(person => (
          <TableRow key={person.id}>
            <TableData>{person.name}</TableData>
            <TableData>{person.number}</TableData>
            <TableData options>
              <Button small important={person.important} onClick={toggleImportance(person.id)}>
                {person.important ? 'important' : 'what ever'}
              </Button>
              <Button small onClick={toggleDelete(person.id, person.name)}>Remove</Button>
            </TableData>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  border: 1px solid white;
  width: 80%;
`;

const TableHeader = styled.th`
  color:	#303030;
  font-size: 18px;
  padding: 12px;
  text-align: left;
`;

const TableData = styled.td`
  padding: 8px 12px;
  font-size: 16px;
  text-transform: capitalize;

  ${props => props.options && css`
    width: 80px;
  `}
`;

const TableRow = styled.tr`
  background-color: #E8E8E8;
  height: 30px;
`;

export default People;