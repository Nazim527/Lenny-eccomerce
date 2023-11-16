import React, { useState } from 'react';
import style from './style.module.scss';
import { Header, UserRegister } from '../..';
import { useForm } from 'react-hook-form';
import { useShowModal } from '../../../store/category Provider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthLogin } from '../../../store/reducer/auth/action/authThunk';

//!Icon and image
import { BiLogoFacebook } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignIn = ({ SignInClassName }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  //! Show Regiter
  const { setShowModal, setShowOverlayModal} = useShowModal()

  const handleOpenRegisterModal = () => {
    setShowModal(true)
  }

  //! Login Auth data conifgration
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    {mode: "onChange"}
  );

  //! JWT datasin gonderirik Login giris elemesi ucun
  const [signError, setSignError] = React.useState(true)
  const Logtoken = useSelector((state) => state.auth.logToken)
  const LogFetchStatus = useSelector((state) => state.auth.status)
  const LogFetchError = useSelector((state) => state.auth.error)

  const onSubmit = (data) => {
    dispatch(fetchAuthLogin({data, Logtoken}))
  }

  React.useEffect(() => {
    if (LogFetchStatus === "Error" && LogFetchError !== "Qeydiyyat olarken xeta bas verdi!") {
      setSignError(false);
    } else if (LogFetchStatus === "Success") {
      setShowOverlayModal(true);
    }
  }, [LogFetchStatus]);

  return (
    <div className={style.signInContainer}>
      <div className={style.containerTitle}>
        <h2>Sign In</h2>
      </div>
      <div className={style.containerInput}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.regUser_input}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name='identifier'
              placeholder="Enter your email"
              {...register("identifier", {
                required: "Email cannot be blank",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: "Invalid email. Please enter a valid e-mail address"
                }
              })}
            />
            {errors?.identifier && (
              <div className={style.regError}>{errors.identifier.message}</div>
            )}
          </div>

          <div className={`${style.passwordInpt} ${style.regUser_input}`}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "password cannot be blank",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "Invalid password. Please use lowercase, uppercase letters and numbers"
                }
              })}
            />
            {errors?.password && (
              <div className={style.regError}>{errors.password.message}</div>
            )}
            {!signError && (
              <div className={style.regError}>Incorrect entry. Please check your username and password.</div>
            )}
            <span
              className={`${style.togglePassword} ${
                showPassword ? style.show : ''
              }`}
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEye className={style.passIcon} /> : <FaEyeSlash className={style.passIcon} />}
            </span>
          </div>
          <span onClick={handleOpenRegisterModal}>{"Don't have an account?"}</span>
          <div className={style.signInBtn}>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <div className={style.containerButtons}>
        <div className={style.otherMethod}>
          <div className={style.leftBorder}></div>
          <span>or using other method</span>
          <div className={style.rightBorder}></div>
        </div>
        <div className={style.signFacebookBtn}>
          <button>
            <BiLogoFacebook className={style.facebookIcon} /> Sign In with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
