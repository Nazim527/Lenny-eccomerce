import React, { useState } from 'react';
import style from './style.module.scss';
import { UserLogin, UserSuccessOrErrorReg } from '../..';
import { useShowModal } from '../../../store/category Provider';
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAuthRegister } from '../../../store/reducer/auth/action/authThunk';

//! Icon and Image
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { BiLogoFacebook } from 'react-icons/bi';
const SignUp = ({ SignClassName }) => {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //! Show Login
  const {setShowModal,setSuccessModal} = useShowModal()
  const handleOpenLogin = () => {
    setShowModal(false)
  }

  //! Register form Submit 
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  }); //! Validation

  //! Userin qeydiyyatdan kecdikden sonra dataya gonderirirk
  const onSubmit = (data) => {
    dispatch(fetchAuthRegister(data))
    setSuccessModal(true);
  };
  
  return (
    <div className={`${style.signUp_container} ${SignClassName}`}>
      <div className={style.signUp_title}>
        <h2>Sign Up</h2>
      </div>
      <div className={style.signUpInput}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.regUser_input}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name='username'
              placeholder="Enter your name"
              {...register("username", {
                required: "Name cannot be blank"
              })}
            />
            {errors?.username && (
              <div className={style.regError}>{errors.username.message}</div>
            )}
          </div>

          <div className={style.regUser_input}>
            <label htmlFor="email">Phone Number or Email</label>
            <input
              type="text"
              id="email"
              name='email'
              placeholder="Enter your phone number or email"
              {...register("email", {
                required: "Email cannot be blank",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: "Invalid email. Please enter a valid e-mail address"
                }
              })}
            />
            {errors?.email && (
              <div className={style.regError}>{errors.email.message}</div>
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
            <span
              className={`${style.toggle_password} ${showPassword ? style.show : ''}`}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <PiEye className={style.passIcon} />
              ) : (
                <PiEyeSlash className={style.passIcon} />
              )}
            </span>
          </div>
          <span onClick={handleOpenLogin} style={{ cursor: "pointer" }}>Sign In</span>
          <div className={style.signUpbtn}>
            <button type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className={style.signUpButtons}>
        <div className={style.methods}>
          <div className={style.leftBorder}></div>
          <span>or using other method</span>
          <div className={style.rightBorder}></div>
        </div>
        <div className={style.signfacebookbtn}>
          <button>
            <BiLogoFacebook className={style.facebookIcon} /> Sign In with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;