/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { act, render, screen } from './test/test-utils';

import App from './App';
import { setupStore } from './store';

const setup = (jsx: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('App', () => {
  it('full app rendering/navigating', async () => {
    const history = createMemoryHistory();

    const { user } = setup(
      <HistoryRouter history={history}>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </HistoryRouter>
    );

    // Renders the catalog page
    expect(
      screen.getByRole('heading', { name: /косметика и гигиена/i })
    ).toBeInTheDocument();

    // Users by click on the product name can navigate to the product page
    await user.click(
      screen.getByRole('heading', {
        name: /ARAVIA Professional Крем для ног суперувлажняющий Super Moisture, 100 мл/i,
      })
    );

    expect(screen.getByText(/в наличии/i)).toBeInTheDocument();
    expect(screen.getByText(/При покупке от/i)).toBeInTheDocument();

    // The user is taken to the cart page when adding an item to the cart.
    await user.click(screen.getByRole('button', { name: /в корзину/i }));
    expect(screen.getByRole('heading', { name: /корзина/i }));

    // Renders the admin page
    await user.click(screen.getByRole('link', { name: /админ-панель/i }));
    expect(screen.getByRole('heading', { name: /панель управления/i }));
  });

  it('landing on a bad page', async () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');

    const { user } = setup(
      <HistoryRouter history={history}>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </HistoryRouter>
    );

    expect(
      screen.getByText(/извините, страница не найдена/i)
    ).toBeInTheDocument();

    // Users can go away from the NotFound page
    await act(async () => {
      await user.click(screen.getByRole('link', { name: /на главную/i }));
    });

    expect(
      screen.getByRole('heading', { name: /косметика и гигиена/i })
    ).toBeInTheDocument();
  });
});
