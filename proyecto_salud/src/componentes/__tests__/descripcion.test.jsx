/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Description from '../descripcion';

test('Description muestra el título principal', () => {
  render(
    <MemoryRouter>
      <Description />
    </MemoryRouter>
  );
  expect(screen.getByText(/Salud Mental/i)).toBeInTheDocument();
});