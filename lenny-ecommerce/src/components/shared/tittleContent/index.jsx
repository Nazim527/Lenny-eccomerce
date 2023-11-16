import React from 'react'
import style from './style.module.scss'

const TitleContent = ({title, content, classNames}) => {

  return (
    <div className={`${style.box_titles} ${classNames}`}>
        <h1>{title}</h1>
        <p>{content}</p>
    </div>
  )
}

export default TitleContent