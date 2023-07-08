import { useEffect, useState, useRef, useCallback } from 'react';
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

export const useAutoFocus = (open?: boolean) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return inputRef;
};

export const useDetectSCrollVertical = () => {
  const [y, setY] = useState(document?.scrollingElement?.scrollHeight || 0);
  const [scrollDirection, setScrollDirection] = useState<boolean>(false);

  const handleNavigation = useCallback(() => {
    if (y > window.scrollY) {
      setScrollDirection(false);
    } else if (y < window.scrollY) {
      setScrollDirection(true);
    }
    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return scrollDirection;
};
