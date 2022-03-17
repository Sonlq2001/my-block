import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useAppDispatch } from 'redux/store';

import styles from './LoginScreen.module.scss';
import { authLoginGoogle } from './../../redux/auth.slice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const responseGoogle = async (response: any) => {
    if (response.tokenId) {
      const res = await dispatch(authLoginGoogle(response.tokenId));
      if (authLoginGoogle.fulfilled.match(res)) {
        history.push('/');
      } else {
        alert(res.payload);
      }
    }
  };

  return (
    <div className={styles.authBg}>
      <div className="container">
        <div className={styles.formAuth}>
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID as string}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
