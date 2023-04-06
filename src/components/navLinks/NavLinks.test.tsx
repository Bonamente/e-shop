import { vi } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import NavLinks from './NavLinks';

describe('NavLinks', () => {
  it('renders NavLinks', () => {
    renderWithProviders(<NavLinks />);

    expect(
      screen.getByRole('link', { name: /о компании/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /доставка и оплата/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /возврат/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /контакты/i })).toBeInTheDocument();
  });

  it('calls the callback handler', async () => {
    const handler = vi.fn();

    const { user } = renderWithProviders(
      <NavLinks closeMobileNavMenu={handler} />
    );

    await user.click(screen.getByRole('link', { name: /о компании/i }));

    expect(handler).toHaveBeenCalled();
  });
});
