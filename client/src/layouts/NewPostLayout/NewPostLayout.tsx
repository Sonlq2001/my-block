import HeaderLayout from 'components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/layouts/FooterLayout/FooterLayout';

import { useDetectSCrollVertical } from 'hooks/hooks';

const NewPostLayout: React.FC = ({ children }) => {
  const isScrollDown = useDetectSCrollVertical();

  return (
    <>
      <HeaderLayout showMenu hideHeader={isScrollDown} />
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </>
  );
};

export default NewPostLayout;
