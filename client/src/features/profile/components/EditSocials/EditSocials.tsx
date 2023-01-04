import { useMemo } from 'react';
import { Formik, Form, FieldArray } from 'formik';

import TitleTabSetting from '../TitleTabSetting/TitleTabSetting';
import InputFieldSocial from 'components/atoms/FormElement/InputFieldSocial/InputFieldSocial';
import Button from 'components/atoms/Button/Button';

import { schemaSocialLink } from '../../helpers/profile-setting.helpers';
import styles from './EditSocials.module.scss';
import { patchUpdateUser } from '../../redux/profile.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const SOCIALS = [
  {
    name: 'Youtube',
    icon: <i className="lab la-youtube" />,
    placeholder: 'https://www.youtube.com/channel/yourname',
    link: '',
  },
  {
    name: 'Facebook',
    icon: <i className="lab la-facebook-f" />,
    placeholder: 'https://www.facebook.com/yourname',
    link: '',
  },
  {
    name: 'Instagram',
    icon: <i className="lab la-instagram" />,
    placeholder: 'https://instagram.com/yourname',
    link: '',
  },
  {
    name: 'Github',
    icon: <i className="lab la-github" />,
    placeholder: 'https://github.com/yourname',
    link: '',
  },
];

const EditSocials = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const initSocials = useMemo(() => {
    if (userInfo?.socials.length) {
      const dataDone = SOCIALS.map((social) => {
        const hasLink = userInfo?.socials.find(
          (i) => i.name.toLowerCase() === social.name.toLowerCase()
        );
        return { name: social.name.toLowerCase(), link: hasLink?.link || '' };
      });

      return { socials: dataDone };
    }
    return { socials: [{ name: '', link: '' }] };
  }, [userInfo?.socials]);

  return (
    <>
      <TitleTabSetting
        title="Mạng xã hội của bạn"
        description="Thêm các liên kết vào hồ sơ của bạn"
      />

      <Formik
        initialValues={initSocials}
        onSubmit={(values, { setSubmitting }) => {
          const socialLinks = values.socials.filter(
            (item) => item && !Object.values(item).includes('')
          );

          dispatch(
            patchUpdateUser({
              socials: socialLinks,
            })
          ).finally(() => setSubmitting(false));
        }}
        validationSchema={schemaSocialLink}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <div className={styles.groupSocial}>
                <FieldArray
                  name="socials"
                  render={() => {
                    return (
                      <>
                        {SOCIALS.map((social, index) => (
                          <InputFieldSocial
                            key={social.name}
                            className={styles.social}
                            title={social.name}
                            placeholder={social.placeholder}
                            icon={social.icon}
                            name={`socials[${index}].link`}
                            onChange={(e) => {
                              const valueLink = e.target.value;
                              setFieldValue(`socials[${index}]`, {
                                name: valueLink
                                  ? social.name.toLowerCase()
                                  : '',
                                link: valueLink,
                              });
                            }}
                            autoComplete="off"
                          />
                        ))}
                      </>
                    );
                  }}
                />
              </div>

              <Button
                className={styles.btnForm}
                type="submit"
                disabled={isSubmitting}
              >
                Cập nhập
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditSocials;
