import React from 'react'
import "../css/Course.css"

function course({course}) { //Course fonksiyonuna props (değişken) olarak course objesini alıyoruz

    const {id,title,description,price,image,link} = course; //course objesinden id,title,description,image değişkenlerini alıyoruz
  return (
    <div className='course'>
        <img src={image} width={250} height={150}/>
        <h4 className='course-title'>{title}</h4>
        <p className='course-desc'>{description}</p>
        <h3 className='course-price'>{price} ₺</h3>
        <div className='course-link'><a href={link}><button>Satın Al</button></a></div>
    </div>
  )
}

export default course