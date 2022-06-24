import React, { useCallback, useState } from 'react'
import ActerGrid from '../componets/acter/ActerGrid';
import CustomRadio from '../componets/CustomRadio';
import MainPage from '../componets/MainPage';
import ShowGrid from '../componets/show/ShowGrid';
import { GetApi } from '../misc/Api';
import { useLastQueary } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';


const Home = () => {

  const [input, setInput] = useLastQueary();
  const [results, setResults] = useState(null);
  const [radioButton, setRadioButton] = useState('shows');

  const isRadioButton = radioButton === 'shows';
  const onSearch = () => {
    GetApi(`/search/${radioButton}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputechange =  useCallback( ev => {
    setInput(ev.target.value);
  },[setInput]) 

  const onKeyDown = (ev) => {
    if (ev.onKeyDown === 13) {
      onSearch();
    }
  }

  const renderResults = () => {
    if (results && results.length > 0) {
      return results[0].show ?
        <ShowGrid data={results} /> :
        <ActerGrid data={results} />
    }
    if (results && results.length === 0) {
      return <div> No Results</div>
    }
    return null;
  }



  const onRadioChang = useCallback(
    ev => {
      setRadioButton(ev.target.value);
    },[]
  ) ;

  return (
    <MainPage>
      <SearchInput type="text" placeholder='Search...' onKeyDown={onKeyDown} onChange={onInputechange} value={input} />
      
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isRadioButton}
            onChange={onRadioChang}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isRadioButton}
            onChange={onRadioChang}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
      <button type='button' onClick={onSearch} >Search</button>
      </SearchButtonWrapper>


      {renderResults()}
    </MainPage>

  );
};

export default Home;