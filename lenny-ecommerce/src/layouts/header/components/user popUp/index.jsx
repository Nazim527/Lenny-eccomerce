import React from "react";
import style from "./style.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { CartModals, TitleContent } from "../../../../components/shared";
import UserLineSubContent from "../user popUp line";
import { logoutAuth, logoutQuery } from "../../../../store/reducer/auth";


//!MUI
import userImage from "../../../../assets/images/header/Frame 3.png";
import signOutIcon from '../../../../assets/icon/header/User/logout.svg'
import Coinsİcon from '../../../../assets/icon/header/User/coin.svg'
import Balanceİcon from '../../../../assets/icon/header/User/moneys.svg'
import Purchaseİcon from '../../../../assets/icon/header/User/receipt-item.svg'
import Heartİcon from '../../../../assets/icon/header/User/heart.svg'
import Settingsİcon from '../../../../assets/icon/header/User/setting-2.svg'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useShowOverlayModal } from "../../../../store/category Provider";
import { instance } from "../../../../api";
import { UserUpdateAvatar } from "../../..";
import { getProfileUserData } from "../../../../api/getProfileData";

const UserPopup = () => {
  //! Userin Logut olmasi ucun
  const dispatch = useDispatch()
  const {setShowOverlayModal} = useShowOverlayModal()

  const handleUserLogout = () => {
    dispatch(logoutAuth(""))
    dispatch(logoutQuery(false))  
    setShowOverlayModal(false)

    localStorage.clear()
    window.location.reload()
  }

  //!Isdifadecinin adinin gorsenmesi ucun
  const {logUserDatas} = useSelector((state) => state.auth)

  //! user images change and upload
  const {logToken} = useSelector((state) => state.auth)
  const [user, setUser] = React.useState({})
  const [isUserDataUpdate, setIsUserDataUpdate] = React.useState(false)

  React.useEffect(() => {
    const getProfileData = async () => {
      try {
        const resultUser = await getProfileUserData(logToken)
        setUser(resultUser)
        setIsUserDataUpdate(true)
      } catch (error) {
        console.log(error);
      }
    }
    getProfileData()
  }, [logToken, setIsUserDataUpdate])

  return (
    <CartModals className={style.user_popup}>
      <div className={style.user_info}>
        <div className={style.user_avatar}>
          {user?.avatarURL ? (
              <img src={`${import.meta.env.VITE_UPLOAD_IMG}${user.avatarURL}`} alt="" />
          ) : (
            <Avatar
            sx={{ width: "90px", height: "90px" }}
            alt="Remy Sharp"
            />
          )}
        </div>

        <div className={style.user_content}>
          <TitleContent
            classNames={style.user_infoText}
            title={logUserDatas.username}
            content={"Platanium Member"}
          />
          <UserUpdateAvatar
            token = {logToken}
            userId = {user?.id}
            userName = {user?.username}
            avatarURL = {user?.avatarURL}
            isUserDataUpdate={isUserDataUpdate}
            setIsUserDataUpdate = {setIsUserDataUpdate}
          />
        </div>
        
      </div>

      <div className={`${style.user_payment} ${style.user_contentDefault}`}>
        <h5>Wallet</h5>
        <div className={style.user_subContent}>
          {/* //? User Wallet */}
          <UserLineSubContent
            icon={Balanceİcon}
            text={"Lenny Balance"}
            rightShow={true}
            price={"$9505"}
          />
          <UserLineSubContent
            icon={Coinsİcon}
            text={"Lenny Coins"}
            rightShow={true}
            price={"$0.092"}
          />
        </div>
      </div>

      {/* //?user Menus */}
      <div className={`${style.user_menu} ${style.user_contentDefault}`}>
        <h5>Menu</h5>
        <div className={style.user_subContent}>
          <UserLineSubContent text={"Purchase"} icon={Purchaseİcon}/>
          <UserLineSubContent text={"Wishlist"} icon={Heartİcon}/>
          <UserLineSubContent text={"Settings"} icon={Settingsİcon}/>
        </div>
      </div>

      <div className={style.user_signOut} onClick={handleUserLogout}>
        <div className={style.icon}>
            <img src={signOutIcon} alt="" />
        </div>
        <p>Sign Out</p>
      </div>
    </CartModals>
  );
};

export default UserPopup;
