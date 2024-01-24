import React from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
  onChange: () => void;
  query: string;
};

export const SearchInput: React.FC<Props> = ({ onChange, query }) => (
  <Form.Control
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
    value={query}
    onChange={onChange}
  />
);
