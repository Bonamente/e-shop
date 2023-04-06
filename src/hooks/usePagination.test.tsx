import { renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('returns pagination range', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 50,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      })
    );

    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });
});
