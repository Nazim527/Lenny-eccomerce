import React from 'react'
import style from './style.module.scss'
import { MainTitle } from '../../../../components'
import { CardArticles } from '..'

//! Image and icon import
import { GetBlogs } from '../../../../hooks/useBlogs'


const LenysArticle = () => {
  //! Blogs Fetch data
  const blogs = GetBlogs()

  return (
    <section className={style.articles}>
      <div className={style.article_header}>
        <MainTitle title={"Lenny's Article"} contentTitle={"View Detail"}/>
      </div>

      {/*//! Apiyle gelmelidir datamiz */}
      <div className={style.article_footer}>
        {blogs?.data?.map(({id, attributes}) => {
          return (
            <CardArticles key={id}
            date={attributes.date}
            image={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.image?.data.attributes.url}`} 
            title={attributes.title}
            content={attributes.description}/>
          )
        })}
      </div>
    </section>
  )
}

export default LenysArticle