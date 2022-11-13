import HeaderLayout from 'components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/layouts/FooterLayout/FooterLayout';

import { useHideHeaderScroll } from 'hooks/useScrollHeader';

const NewPostLayout: React.FC = ({ children }) => {
  const isHideHeader = useHideHeaderScroll();

  return (
    <>
      <HeaderLayout showMenu hideHeader={isHideHeader} />
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </>
  );
};

export default NewPostLayout;
