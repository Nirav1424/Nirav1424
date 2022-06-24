import React, { useEffect, useState } from 'react';
import MainPage from '../componets/MainPage';
import { useShows } from '../misc/custom-hooks';
import { GetApi } from '../misc/Api'
import ShowGrid from '../componets/show/ShowGrid';

function Starred() {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{
    if(starred && starred.length> 0){
      const promises = starred.map(showId => GetApi(`/shows/${showId}`));

      Promise.all(promises)
      .then(apiData => apiData.map(show =>({show})))
      .then(results=>{
        setShows(results);
        setIsLoading(false);
      }).catch(err=>{
        setError(err.message);
        setIsLoading(false);
      })
    }else{
      setIsLoading(false);
    }
  },[starred])

  return (
    <MainPage>
     {isLoading && <div>Show are loading...</div>}
     {error && <div> Error : {error}</div>}
     {!isLoading && !shows && <div>No show Added</div>}
     {!isLoading && !error && shows && <ShowGrid data={shows}/>}

    </MainPage>
  )
}

export default Starred;