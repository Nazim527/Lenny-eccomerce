import React from "react";
import _, { get } from 'lodash'
import logoDesktop from "../../assets/icon/header/Logo.svg";
import logoMobile from "../../assets/icon/header/Logo (mobileV).svg";
import search from "../../assets/icon/header/search-normal.svg";
import shopping_cart from "../../assets/icon/header/shopping-cart.svg";
import notification from "../../assets/icon/header/notification.svg";
import message from "../../assets/icon/header/sms.svg";
import menubar from "../../assets/icon/header/menu.svg";
import user from "../../assets/icon/header/user.svg";
import userImage from '../../assets/images/header/Frame 3.png';
import style from "./style.module.scss";
import { SearchResultContent, UserLogin, UserRegister, UserSuccessOrErrorReg } from "..";
import { useProductFilters } from "../../hooks/useFilterPriceProducts";
import { useSelector } from "react-redux";
import { useShowModal } from "../../store/category Provider";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "./components/user popUp";

//!MUI
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getProfileUserData } from "../../api/getProfileData";

const Header = ({ isAuthed }) => {
  const SearchValue = React.useRef()
  const navigation = useNavigate()
  const [menuVisible, setMenuVisible] = React.useState(false)
  const [searchName, setSearchName] = React.useState("")
  const [getFilterProducts, setgetFilterProducts] = React.useState({})
  const [showSearchResult, setShowSearchResult] = React.useState(false);

  const handleMenu = () => {
    setMenuVisible(!menuVisible)
  }


  //! User Popup show
  const [showUserPopup, setShowUserPopUp] = React.useState(false)

  const handleUserPopup = () => {
    setShowUserPopUp(!showUserPopup)
  }
  

  //! Search Filteration
  const handleNameInputValue = (e) => {
    SearchValue.current = e.target.value
    const {current} = SearchValue
    setSearchName(current)
    setShowSearchResult(true)
  }

  const { filterProductsData} = useProductFilters({
    searchFilteration: searchName,
  });

  const debouncedFilterProductsData = _.debounce(() => {
    setgetFilterProducts(filterProductsData)
  }, 2000);
  
  React.useEffect(() => {
    debouncedFilterProductsData(searchName);
  }, [searchName]);

  //* Get Products
  const searchProducts = getFilterProducts?.data || [];

  //* Producta Klikledikde Searchin Avtomatik baglanmasi ucun
  const handleShowSearch = (e) => { //! Producta daxil olduqda ShowSearch Close olur
    setSearchName("")
  }

  //* Her hansi bir yere klik eledikde SearchResult Deakdiv Olsun 
  const handleGlobalClick = (e) => {
    if (SearchValue.current && e.target.className !== "_search_result_box_1ep6n_1") {
      setShowSearchResult(false);
    } else if(e.target.className == "_search_result_box_1ep6n_1") {
      setSearchName("")
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  //* Her hansi bir yere klik etdikde Popup qapanmasi
  const UserPopupRef = useRef(null);
  const UserAvatarRef = useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (UserPopupRef.current && !UserPopupRef.current.contains(event.target) &&
          UserAvatarRef.current && !UserAvatarRef.current.contains(event.target)) {
        setShowUserPopUp(false);
        setShowOverlay(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //! Auth And Authed
  const [showOverlay, setShowOverlay] = React.useState(false)
  //!  Modallarin gorsenmesinin secilmesi ucun
  const {showModal,successModal, setSuccessModal,setShowModal, showOverlayModal, setShowOverlayModal} = useShowModal()

  const handleAccountRegister = () => {
    if(!showOverlay || showOverlay) {
      setShowOverlay(true)
      setShowUserPopUp(false)
      setShowOverlayModal(true)
      setShowModal(false)
      setSuccessModal(false)
    }
  }

  //! Redux ShoppingCart total count;
  const ShoppingCartCount = useSelector((state) => state.cart.cart);

  //!User Daxil olandan sonra icazesi olan girisler
  const { logToken } = useSelector((state) => state.auth)

  //! header scroll ederken fonksiyonluq
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [visible, setVisible] =React. useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset
      if(currentScrollPos > lastScrollTop || (currentScrollPos == 0)) {
        setVisible(false)
      } else {
        setVisible(true)
        setShowUserPopUp(false)
      }
      setLastScrollTop(currentScrollPos < 0 ? 0 : currentScrollPos);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop])

  //! Sehife yenilendikde usePopup acilmasinda qarsilasilan cetinlik aradan qaldirmaq ucun
  React.useEffect(() => {
    setVisible(false)
  },[])
  

  //! Input Focus anlaminda notifactionun idare olunmasi
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  
  React.useEffect(() => {
    if(window.innerWidth > 1024) {
      setIsFocused(false)
    }
  }, [window.innerWidth])

  //! Hamburger Menu Active veziyyetde qaldiqda ekrani boyuderken qarsiya cixan problemin helli
  React.useEffect(() => {
    const handleWindowWidth = () => {
      if(window.innerWidth > 1024){
        setMenuVisible(false)
      }
    }
    handleWindowWidth()

    window.addEventListener("resize", handleWindowWidth)
    return () => {
      window.removeEventListener("resize", handleWindowWidth)
    }
  },[])

  //! User Avatar get
  const [userData, setUserData] = React.useState("")
  const [update, setUpdate] = React.useState(false)

  React.useEffect(() => {
    const getProfileData = async () => {
      try {
        const resultUser = await getProfileUserData(logToken)
        setUserData(resultUser)
        setUpdate(true)
      } catch (error) {
        console.log(error);
      }
    }
    getProfileData()
  }, [logToken, setUpdate])

  return (
    <>
      <header className={`${style.header} ${visible ? style.visible : ""}`}>
        <div className={style.left} style={menuVisible ? {display: "none"} : null}>
          <Link to={'/'}>
            <div className={style.logo_mobile}>
              <img src={logoMobile} />
            </div>
            <div className={style.logo_desktop}>
              <img src={logoDesktop} />
            </div>
          </Link>
        </div>

        {/* //! Search */}
        <div className={style.center}>
          <form className={`${menuVisible && style.show_form}`}>

            <input type="text" placeholder="Search in Product" 
            className={isFocused ? style.focused_input : style.normal_input}
            onFocus={window.innerWidth < 1024 && handleFocus}
            onBlur={window.innerWidth < 1024 && handleBlur}
            onChange={handleNameInputValue}
            onClick={() => setShowSearchResult(true)}
            value={searchName}
            name="SearchValue"
            autoComplete="off"
            ref={SearchValue}/>
            <div className={style.header_icon}>
              <img src={search} />
            </div>
          </form>
          {showSearchResult && searchName && ( 
              <div className={style.search_result} onClick={handleShowSearch}>
                {searchProducts.length === 0 ? (
                  <div className={style.notFound_search}>
                    <p>Sorry, we couldn't find the product.</p>
                  </div>
                ) : (
                  searchProducts.map(({id, attributes}) => (
                    <SearchResultContent
                      key={id}
                      id={id}
                      productsImage={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.images?.data[0].attributes.url}`}
                      productsPrice={attributes.price}
                      productsTitle={attributes.title}
                      productCategoryId={attributes.categories.data[0].id}
                    />
                  ))
                )}
              </div>
          )}
        </div>

        <div className={style.right}>
          {/*//? Notifactions */}
          <div className={`${style.account_notifactions} ${menuVisible && style.show_notifications}`}>
            <Link to={'/shoppingcart'}>
              <div className={style.header_icon}>
                <img src={shopping_cart} />
                {ShoppingCartCount.length > 0 && (
                  <span>{ShoppingCartCount.length}</span>
                )}
              </div>
            </Link>
            {(logToken != "") && (
              <div className={style.header_icon} style={isFocused ? {display: "none"} : null}>
                <img src={notification} />
              </div>
            )}
            {(logToken != "") && (
              <div className={style.header_icon } style={isFocused ? {display: "none"} : null}>
                <img src={message} />
              </div>
            )}
          </div>

          <div className={`${style.line} ${menuVisible && style.show_line}`}></div>

          {/*//? Hamburger Menu  */}
          <div className={style.hamburger_menu} onClick={handleMenu}>
            <img src={menubar} />
          </div>

          {/*//? Profile  */}
          <div className={style.profile_account}>
            {(logToken != "") == true ? (
              <div className={style.profile_user}>
                <div className={style.userAvatar} ref={UserAvatarRef} onClick={handleUserPopup}>
                {userData?.avatarURL ? (
                  <img src={`${import.meta.env.VITE_UPLOAD_IMG}${userData.avatarURL}`} alt="" />
                  ) : (
                    <Avatar
                    sx={{ width: "35px", height: "35px" }}
                    alt="Remy Sharp"
                    />
                  )}
                </div>

                {/* //? User Popup */}
                {showUserPopup  && (
                 <div ref={UserPopupRef} style={visible ? {display: "none"} : null}>
                    <UserPopup/>
                 </div>
                )}
              </div>
            ) : (
              <div className={style.header_icon} 
              onClick={handleAccountRegister}
              style={{cursor: "pointer"}}>
                <img src={user} />
              </div>
            )}
          </div>
        </div>

      {/* //!Register Modal Show */}
      </header>
      {showOverlay &&  showOverlayModal && logToken == "" && (
       <>
         <div className={style.overlay} onClick={() => setShowOverlay(false)}></div>
          {(!showModal) ? (
            <UserLogin SignClassName={style.header_SignUp}/>
          ) : ( successModal ? 
            <>
              <UserSuccessOrErrorReg/>
            </>
          : (<UserRegister/>)
          )}
       </>
      )}
    </>
  );
};

export default Header;
