import React from "react";
import style from "./style.module.scss";
import { Btn, TitleContent } from "../../../components/shared";
import { useShowModal } from "../../../store/category Provider";
import { useSelector } from "react-redux";

//!Image and Icon
import successImages from "../../../assets/images/header/tick-circle.png";
import errorImage from "../../../assets/images/header/X-circle.png";
import FadeLoader from "react-spinners/FadeLoader";

const SuccessRegister = () => {
  const { setShowModal, setSuccessModal } = useShowModal();

  const handleSignIn = () => {
    setShowModal(false);
  };
  const handleSignUp = () => {
    setShowModal(true)
    setSuccessModal(false)
  }

  //! Userin Qeydiyyati ugursuz olarsa
  const { status, userDatas } = useSelector((state) => state.auth);
  console.log(userDatas);

  if (status == "Loading") {
    return (
      <div className={`${style.success_register} ${style.error_register}`}>
        <FadeLoader color={"#10322b"} size={100} />
      </div>
    );
  }
  return (
    <div className={style.success_register}>
      <div className={style.success_header}>
        <div className={style.images}>
          {status == "Success" ? (
            <img src={successImages} alt="" />
          ) : (
            <img src={errorImage} />
          )}
        </div>
        {status == "Success" ? (
          <TitleContent
            classNames={style.succes_content}
            title={"Create Account Successfull!"}
            content={`Your Account has been Created Successfully. Welcome, ${userDatas.username}! Please log in to the created account`}
          />
        ) : (
          <TitleContent
            classNames={style.succes_content}
            title={"New Account could not be created"}
            content={
              "You don't need to re-register, you already have an account."
            }
          />
        )}
      </div>
      <div className={style.success_footer}>
        {status == "Success" ? (
          <Btn bg={true} contentTitle={"Sign In"} onClick={handleSignIn} />
        ) : (
          <div className={style.btns}>
            <Btn bg={true} contentTitle={"Sign In"} onClick={handleSignIn} />
            <Btn contentTitle={"Sign Up"} onClick={handleSignUp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessRegister;
