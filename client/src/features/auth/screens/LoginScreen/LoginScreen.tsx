import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/store';

import styles from './LoginScreen.module.scss';
import { authLogin } from './../../redux/auth.slice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [dataUser, setDataUser] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(authLogin(dataUser));
    if (authLogin.fulfilled.match(response)) {
      history.push('/');
    } else {
      alert(response.payload);
    }
  };

  return (
    <div className={styles.authBg}>
      <div className="container">
        <div className={styles.formAuth}>
          <h1 className={styles.formTitle}>Đăng nhập</h1>
          <div className={styles.formDes}>
            <h3 className={styles.formCaption}>Xin chào</h3>
            <p>
              Bạn chưa có tài khoản ?
              <Link to="/register" className={styles.register}>
                Đăng ký
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formBox}>
            <div className={styles.formGroup}>
              <label htmlFor="" className={styles.formLabel}>
                Email
              </label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Địa chỉ email"
                value={dataUser.email}
                onChange={(e) =>
                  setDataUser({ ...dataUser, email: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="" className={styles.formLabel}>
                Mật khẩu
              </label>
              <div className={styles.formGroupPassword}>
                <input
                  type={`${isPassword ? 'text' : 'password'}`}
                  className={styles.formInput}
                  placeholder="Mật khẩu"
                  value={dataUser.password}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, password: e.target.value })
                  }
                />
                <span
                  className={styles.formIconEye}
                  onClick={() => setIsPassword(!isPassword)}
                >
                  {isPassword ? (
                    <i className="las la-eye-slash" />
                  ) : (
                    <i className="las la-eye" />
                  )}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <button className={styles.formBtn}>Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
