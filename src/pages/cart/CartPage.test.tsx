import { renderWithProviders, screen } from '../../test/test-utils';
import { setupStore } from '../../store';
import { addToCart } from '../../store/cart/slice';
import cartItem from '../../test/test-data';
import CartPage from './CartPage';
import Modal from '../../components/modal/Modal';

describe('CartPage ', () => {
  it('renders the Cart page with items', async () => {
    const store = setupStore();
    store.dispatch(addToCart(cartItem));

    const { user } = renderWithProviders(
      <>
        <CartPage />
        <Modal />
      </>,
      { store }
    );

    expect(
      screen.getByRole('heading', {
        name: /BIOMIO BIO-SOAP антибактериальное жидкое мыло/i,
      })
    ).toBeInTheDocument();

    // users can increase the number of selected item
    await user.click(screen.getByRole('button', { name: /увеличить/i }));
    expect(screen.getByText(/200/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /увеличить/i }));
    expect(screen.getByText(/300/i)).toBeInTheDocument();

    // users can decrease the number of selected item
    await user.click(screen.getByRole('button', { name: /уменьшить/i }));
    expect(screen.getByText(/200/i)).toBeInTheDocument();

    // users can place an order
    await user.click(screen.getByRole('button', { name: /оформить заказ/i }));
    expect(
      screen.getByRole('heading', { name: /спасибо за заказ/i })
    ).toBeInTheDocument();

    // users can close the modal
    await user.click(
      screen.getByRole('button', { name: /закрыть модальное окно/i })
    );
    expect(
      screen.queryByRole('heading', { name: /спасибо за заказ/i })
    ).not.toBeInTheDocument();
  });

  it('renders the Cart page without items', async () => {
    renderWithProviders(<CartPage />);

    expect(
      screen.getByRole('heading', {
        name: /в вашей корзине пока ничего нет/i,
      })
    ).toBeInTheDocument();
  });
});
