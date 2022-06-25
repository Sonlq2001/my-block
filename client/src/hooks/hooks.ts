import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { useAppSelector } from 'redux/store';
import { AccessTokenType } from 'types/access-token.types';

export const useDataToken = (token?: any) => {
  const { accessToken } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
  }));
  try {
    const dataToken =
      (accessToken || token) &&
      jwtDecode<AccessTokenType>(accessToken || token);

    return dataToken;
  } catch (error) {}
};

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debounceValue;
};
