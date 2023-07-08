import { FC } from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';
import HeaderInfo from 'components/atoms/HeaderInfo/HeaderInfo';
import { useDetectSCrollVertical } from 'hooks/hooks';

const HeaderProgressBar: FC = ({ children }) => {
  const isScrollDown = useDetectSCrollVertical();
  return (
    <div id="app-layout">
      <HeaderLayout showMenu hideHeader={isScrollDown} />
      <HeaderInfo existHeaderMain={!isScrollDown} />
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default HeaderProgressBar;
