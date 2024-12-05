import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders a heading', () => {
  render(<App />);
  
  // Debugge das DOM, um zu sehen, wie es gerendert wird
  screen.debug();  // Gibt das gerenderte HTML im Test-Output aus

  // Überprüfe, ob das Heading im DOM ist
  const heading = screen.getByText(/Welcome to biztrips Happy New Year - React 2024/i);
  
  expect(heading).toBeInTheDocument();
});
