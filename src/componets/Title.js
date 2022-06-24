import React,{memo} from 'react'
import { TitleWrapper } from './Title.styled';

function Title({title,subTitle}) {
  return (
  <TitleWrapper>
<h1>{title}</h1>
<p>{subTitle}</p>
</TitleWrapper>
    )

}

export default memo(Title);