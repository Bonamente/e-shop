import { renderWithProviders, screen } from '../../test/test-utils';
import Sort from './Sort';

describe('Sort', () => {
  it('renders Sort component', () => {
    renderWithProviders(<Sort />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display the correct number of options', () => {
    renderWithProviders(<Sort />);

    expect(screen.getAllByRole('option').length).toBe(4);
  });

  it('default option has been selected', () => {
    renderWithProviders(<Sort />);

    const defaultOption = screen.getByRole<HTMLOptionElement>('option', {
      name: /название \(а - я\)/i,
    });

    expect(defaultOption.selected).toBe(true);
  });

  it('user can select sort options', async () => {
    const { user } = renderWithProviders(<Sort />);

    const defaultOption = screen.getByRole<HTMLOptionElement>('option', {
      name: /название \(а - я\)/i,
    });

    expect(defaultOption.selected).toBe(true);

    await user.selectOptions(screen.getByRole('combobox'), 'price-highest');

    expect(
      screen.getByRole<HTMLOptionElement>('option', {
        name: /цена \(по убыванию\)/i,
      }).selected
    ).toBe(true);

    expect(defaultOption.selected).toBe(false);
  });
});
