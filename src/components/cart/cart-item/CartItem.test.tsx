import { vi } from 'vitest';
import * as reduxHooks from 'react-redux';
import * as actions from '../../../store/cart/slice';
import { renderWithProviders, screen } from '../../../test/test-utils';
import cartItem from '../../../test/test-data';
import CartItem from './CartItem';

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('CartItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    mockedDispatch.mockClear();
  });

  it('renders CartItem', () => {
    renderWithProviders(<CartItem {...cartItem} />);

    expect(
      screen.getByRole('heading', {
        name: /BIOMIO BIO-SOAP антибактериальное жидкое мыло/i,
      })
    ).toBeInTheDocument();
  });

  it(`clicking the '+' or the '-' button invokes the 'updateCartItemAmount' action`, async () => {
    const dummyDispatch = vi.fn();
    const mockedUpdateCartItemAmount = vi.spyOn(
      actions,
      'updateCartItemAmount'
    );
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<CartItem {...cartItem} />);

    await user.click(screen.getByRole('button', { name: /\+/i }));
    expect(mockedUpdateCartItemAmount).toHaveBeenCalledWith({
      id: 4604049097502,
      value: 'inc',
    });

    await user.click(screen.getByRole('button', { name: /-/i }));
    expect(mockedUpdateCartItemAmount).toHaveBeenCalledWith({
      id: 4604049097502,
      value: 'dec',
    });
  });

  it(`clicking the remove button invokes the 'mockedRemoveFromCart' action`, async () => {
    const dummyDispatch = vi.fn();
    const mockedRemoveFromCart = vi.spyOn(actions, 'removeFromCart');
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<CartItem {...cartItem} />);

    await user.click(screen.getByRole('button', { name: /удалить товар/i }));
    expect(mockedRemoveFromCart).toHaveBeenCalledWith(4604049097502);
  });
});
