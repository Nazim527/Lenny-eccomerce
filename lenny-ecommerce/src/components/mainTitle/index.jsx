import React from 'react'
import style from './style.module.scss'
import Btn from '../shared/btn'

const MainTitle = ({title, contentTitle, mainClassName}) => {
  return (
    <div className={`${style.main_header} ${mainClassName}`}>
        <h1>{title}</h1>
        {contentTitle && <Btn contentTitle={contentTitle}/>}
    </div>
  )
}

export default MainTitle