import React from 'react'
import style from './style.module.scss'

const Btn = ({icon,contentTitle,bg, onClick}) => {
  return (
    <button className={bg && style.bg_green} onClick={onClick}>
      {icon && <span>{icon}</span>}
      {contentTitle && <p>{contentTitle}</p>}
    </button>
  )
}

export default Btn