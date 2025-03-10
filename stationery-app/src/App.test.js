import { render, screen } from '@testing-library/react';
import RouterCustom from './router';

test('renders learn react link', () => {
  render(<RouterCustom />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
