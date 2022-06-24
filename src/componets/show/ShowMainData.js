import React from 'react';

import IMG_PLACEHOLDER from '../../images/not.png';
import { Star } from '../styled';
import { MainDataWrapper } from './ShowMainData.styled';

const ShowMainData = ({ name, rating, summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className='text-side'>
        <div>
          <h1>{name}</h1>
          <div>
            <Star active/>
            <span>{rating.average || 'N/A'}</span>
          </div>
        </div>
        <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />

        <div>
          Tags:{' '}
          <div>
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </MainDataWrapper>
  );
};
export default ShowMainData;
