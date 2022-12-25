import { Formik, Form, FieldArray } from 'formik';

import TitleTabSetting from '../TitleTabSetting/TitleTabSetting';
import InputFieldSocial from 'components/atoms/FormElement/InputFieldSocial/InputFieldSocial';
import Button from 'components/atoms/Button/Button';

import { schemaSocialLink } from '../../helpers/profile-setting.helpers';
import styles from './EditSocials.module.scss';

const SOCIALS = [
  {
    name: 'Youtube',
    icon: <i className="lab la-youtube" />,
    placeholder: 'https://www.youtube.com/channel/yourname',
  },
  {
    name: 'Facebook',
    icon: <i className="lab la-facebook-f" />,
    placeholder: 'https://www.facebook.com/yourname',
  },
  {
    name: 'Instagram',
    icon: <i className="lab la-instagram" />,
    placeholder: 'https://instagram.com/yourname',
  },
  {
    name: 'Github',
    icon: <i className="lab la-github" />,
    placeholder: 'https://github.com/yourname',
  },
];

const EditSocials = () => {
  return (
    <>
      <TitleTabSetting
        title="Mạng xã hội của bạn"
        description="Thêm các liên kết vào hồ sơ của bạn"
      />

      <Formik
        initialValues={{ socials: [{ name: '', link: '' }] }}
        onSubmit={(values) => {
          const socialLinks = values.socials.filter(
            (item) => item && !Object.values(item).includes('')
          );
          if (socialLinks.length > 0) {
            console.log(socialLinks);
          }
        }}
        validationSchema={schemaSocialLink}
      >
        {({ setFieldValue }) => {
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
                          />
                        ))}
                      </>
                    );
                  }}
                />
              </div>

              <Button className={styles.btnForm} type="submit">
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
