import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { GetApi } from '../../misc/Api';
import { InfoBlock, ShowPageWrapper } from '../../pages/Show.styled';
import Cast from './Cast';
import Details from './Details';
import Sensons from './Sensons';
import ShowMainData from './ShowMainData';


const renducer = (prevStat, action) => {
    switch (action.type) {
        case 'SUCCESS':
            {
                return { isLoading: false, error: null, show: action.show }
            }

        case 'FAILED':
            {
                return { ...prevStat, isLoading: false, error: action.error }
            }

  default:
            return prevStat;
    }
}

const intiallizeStat = {
    show: null,
    isLoading: true,
    error: null,
}

function Show() {

    const [{ show, isLoading, error }, dispach] = useReducer(renducer, intiallizeStat);

    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;

        GetApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result => {
            if (isMounted) {
                dispach({
                    type: 'SUCCESS',
                    show: result,
                })
            }
        }).catch((err) => {

            if (isMounted) {
                dispach({
                    type: 'FAILED',
                    error: err.message,
                })
            }
        })

        return () => {
            isMounted = false;
        }
    }, [id]);

    if (isLoading) {
        return <div>
            is loading the site .....
        </div>
    }
    if (error) {
        return <div> Error : {error} </div>
    }



    return (
        <ShowPageWrapper>
            <ShowMainData
                image={show.image}
                name={show.name}
                rating={show.rating}
                summary={show.summary}
                tags={show.genres}
            />

            <InfoBlock>
                <h2>Details</h2>
                <Details
                    status={show.status}
                    network={show.network}
                    premiered={show.premiered}
                />
            </InfoBlock>

            <InfoBlock>
                <h2>Cast</h2>
                <Cast
                    cast={show._embedded.cast}
                />
            </InfoBlock>

            <InfoBlock>
                <h2>Seasons</h2>
                <Sensons
                    seasons={show._embedded.seasons}
                />
            </InfoBlock>



        </ShowPageWrapper>
    )
}

export default Show;