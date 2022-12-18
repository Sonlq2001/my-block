import { useState, useCallback } from 'react';

import qs from 'qs';

const useQueryState = <T = unknown>(
  initValue: T,
  parseOptions?: qs.IParseOptions,
  keys?: string[]
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

  const setQuery = useCallback(
    (newQueries: T) => {
      const keyQueries = Object.keys(newQueries as Object).filter(
        (item) => !keys?.includes(item)
      );
      const valueQueries = Object.values(newQueries as Object);

      const filterQueries = Object.fromEntries(
        keyQueries.map((item, index) => [item, valueQueries[index]])
      );
      setQueries(newQueries);
      const queryString = qs.stringify(filterQueries, {
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
    },
    [keys]
  );

  return [queries, setQuery];
};

export default useQueryState;
