import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application shell', () => {
  render(<App />);
  // Sidebar brand badge "S" and app name "Scrum Mind" are part of the shell
  const brand = screen.getByText(/Scrum Mind/i);
  expect(brand).toBeInTheDocument();
});
