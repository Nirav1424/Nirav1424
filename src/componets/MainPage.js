import React from 'react'
import Navs from './Navs';
import Title from './Title';


function MainPage({children}) {
  return (
    <>
    <div>
        <Title 
        title='Box office'
        subTitle='free moive in this box office'
        />
        <Navs/>
        {children}
    </div>
    </>
  )
}

export default MainPage;