import React from 'react';
import ShowCard from './ShowCard';
import IMG_NOT_FOUND from '../../images/not.png'
import { FlexGrid } from '../styled';
import {useShows} from '../../misc/custom-hooks'

function ShowGrid({ data }) {
    const [starredShows, dispachStarred] = useShows()
    return (
        <FlexGrid>
            {
                data.map(({ show }) => {
                    const isStarred = starredShows.includes(show.id);
                    const onStarredClick = ( ) => {
                        if(isStarred){
                            dispachStarred({type : 'REMOVE',showId : show.id})
                        }else{
                            dispachStarred({type : 'ADD',showId : show.id})
                        }
                    }
                    return (
                        <ShowCard
                        key={show.id}
                        id={show.id}
                        name={show.name}
                        summary={show.summary}
                        image={show.image ? show.image.medium : IMG_NOT_FOUND}
                        onStarredClick={onStarredClick}
                        isStarred={isStarred}
                    />
                    );
                }
              
                )
            }
        </FlexGrid>
    )
}

export default ShowGrid;