import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a heading', () => {
  render(<App />);
  
  // Verwende getByText() anstelle von getByRole()
  const heading = screen.getByText(/Welcome to biztrips Happy New Year - React 2024/i);

  // Überprüfe, ob das Heading-Element im DOM vorhanden ist
  expect(heading).toBeInTheDocument();
});
