import { createPortal } from 'react-dom';
import { useRef, FC, ReactNode, useEffect, memo } from 'react';

interface PortalProps {
  children: ReactNode;
  open: Boolean;
}

const Portal: FC<PortalProps> = ({ open, children }) => {
  const divRef = useRef(document.createElement('div'));

  useEffect(() => {
    const divElement = divRef.current;
    if (open) {
      document.body.style.overflow = 'hidden';
      divElement.setAttribute('id', 'portal-app');
      document.body.appendChild(divElement);
    }

    return () => {
      divElement.remove();
      document.body.style.overflow = 'initial';
    };
  }, [open]);

  return divRef.current && open ? createPortal(children, divRef.current) : null;
};

export default memo(Portal);
