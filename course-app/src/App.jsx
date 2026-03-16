import React from 'react'
import Header from './component/Header'
import { courses } from './Data'
import Course from './component/course'


function App() {
  return (
    <div>
      <Header/>
      <div className='course-main'>
              {
        //Courses listesi varsa map ile dön ve her bir course için course componentini render et
        courses?.map((course)=>(
          //course componentine course propunu gönder.Key hatası almamak için key propunu da ekle
          <Course key={course.id} course={course} />
        ))
      }
      </div>
    </div>
  )
}

export default App