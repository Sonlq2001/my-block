import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { useAppSelector } from 'redux/store';
import { AccessTokenType } from 'types/access-token.types';

export const useDataToken = (): {
  name?: string;
  email?: string;
  _id?: string;
  avatar?: string;
} => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return {};
  }

  try {
    const { name, email, _id, avatar } =
      jwtDecode<AccessTokenType>(accessToken);

    return { name, email, _id, avatar };
  } catch (error) {
    return {};
  }
};

export const useDebounce = <T = unknown>(value: T, delay = 500) => {
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
