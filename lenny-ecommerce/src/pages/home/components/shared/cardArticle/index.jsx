import React from 'react'
import style from './style.module.scss'
import TitleContent from '../../../../../components/shared/tittleContent'

const CardArticle = ({image, title, content,date}) => {
  return (
    <div className={style.cart_article}>
        <div className={style.article_header}>
            <img src={image}/>
        </div>
        <div className={style.article_footer}>
            <p>{date}</p>
            <TitleContent title={title} content={content}/>
        </div>
    </div>
  )
}

export default CardArticle