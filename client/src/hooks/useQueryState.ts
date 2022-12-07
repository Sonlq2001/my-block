import { useState, useCallback } from 'react';

import qs from 'qs';

const useQueryState = <T = unknown>(
  initValue: T,
  parseOptions?: qs.IParseOptions
): [T, (newQueries: T) => void] => {
  const [queries, setQueries] = useState<T>(() => {
    const parsedQuery = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
      ...parseOptions,
    });
    return {
      ...initValue,
      ...parsedQuery,
    };
  });

  const setQuery = useCallback((newQueries: T) => {
    setQueries(newQueries);
    const queryString = qs.stringify(newQueries, {
      arrayFormat: 'brackets',
      filter: (prefix, value) => {
        return value ?? undefined;
      },
    });
    const newSearch = queryString ? `?${queryString}` : '';

    window.history.pushState(
      '',
      document.title,
      `${window.location.pathname}${newSearch}`
    );
  }, []);

  return [queries, setQuery];
};

export default useQueryState;
