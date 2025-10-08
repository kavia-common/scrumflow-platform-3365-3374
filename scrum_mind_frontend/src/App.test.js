import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';
import { BrowserRouter } from 'react-router-dom';

test('renders topbar brand', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Scrum Mind/i)).toBeInTheDocument();
});
