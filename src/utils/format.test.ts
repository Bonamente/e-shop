import format from './format';

describe('format function', () => {
  it('works correctly for integers', () => {
    const integer = 100;
    const result = format(integer);

    expect(result).toBe('100');
  });

  it('works correctly for decimals', () => {
    const decimal = 10.75;
    const result = format(decimal);

    expect(result).toBe('10,75');
  });

  it('works correctly for 4-digit and lager numbers', () => {
    const integer = 1000;
    const fiveDigitInteger = 12555;
    const decimal = 1000.55;
    const fiveDigitDecimal = 12555.35;

    const result1 = format(integer);
    expect(result1).toBe('1 000');

    const result2 = format(decimal);
    expect(result2).toBe('1 000,55');

    const result3 = format(fiveDigitInteger);
    expect(result3).toBe('12 555');

    const result4 = format(fiveDigitDecimal);
    expect(result4).toBe('12 555,35');
  });

  it('works correctly for numbers less than 1', () => {
    const number = 0.55;
    const result = format(number);

    expect(result).toBe('0,55');
  });
});
