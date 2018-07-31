import React, { Component } from 'react';
import axios from 'axios'
import { sortBy } from 'lodash'
import './App.css';

import Search from './components/Search'
import Table from './components/Table'
import Button from './components/Button';

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '100' //default hits per page

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

export const SORTS = { //different types of sorts, by title, author, etc
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
console.log(url)

const Loading = () => 
  <div> Loading... </div>

//HoC -> https://www.robinwieruch.de/gentle-introduction-higher-order-components/
const withLoading = (Component) => ({ isLoading, ...rest}) =>
  isLoading
  ? <Loading />
  : <Component {...rest} />

const ButtonWithLoading = withLoading(Button) //wrapping the Button component into a HoC

//####
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results} = prevState;//updating values based on previous state

    const oldHits = results && results[searchKey] 
      ? results[searchKey].hits 
      : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits,
    ]

    return {
      results: { //setting the merged hits and page in local component state
        ...results,
        [searchKey]: { hits: updatedHits, page},
        isLoading: false,
      }
    }
}

class App extends Component {
  _isMounted = false; //workaround to avoid calling setState on an unmounted component

  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '', //temporary searchKey which is used to store each result
      searchTerm: DEFAULT_QUERY, //it gets changed every time the user types a different entry at search bar
      error: null,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    
  }

  componentDidMount(){
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm, });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm] 
  }

  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm, });

    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm); //fetches only if it needs to make an async request to API
    }

    event.preventDefault(); //to avoid page reloads
  }

  setSearchTopStories(result){
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0){ //if don't provide a page, it'll fallback to the initial one
    this.setState({
      isLoading: true,
    })
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      // .then(response => response.json())
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }
  
  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey]

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      }
    })
  }

  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value, 
    })
  }


  render() {
    const { 
      results, 
      searchKey, 
      searchTerm, 
      error, 
      isLoading, 
      sortKey, 
      isSortReverse 
    } = this.state;

    const page = (
      results && //if exists
      results[searchKey] && //if exists
      results[searchKey].page //assign page number 
    ) || 0; //defaulting it to zero, so on the first load it won't crash if you press the more button

    const list = ( 
      results && 
      results[searchKey] &&
      results[searchKey].hits //if above is true, assign hits to list
    ) || []; //defaulting an empty list when there is no result by searchKey

    // if(error){
    //   return <p> Something went wrong </p>;
    // }

    return (
      <div className="page">
        <div className="interactions" >
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
  
        { error 
        ? <div className="interactions" >
            <p> Something went wrong. Reload and try searching again </p>
          </div>
        : <Table 
            list={list}
            onDismiss={this.onDismiss}
          />  
        }
        
        <div className="interactions" >
        <ButtonWithLoading 
          isLoading={isLoading}
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
        >
          More
        </ButtonWithLoading>
        {/* { isLoading
        ? <Loading />
        : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}> 
            More
          </Button>
        } */}
        </div>
      </div>
    );
  }
}

export default App;

export { //exporting for testing purposes
  Button,
  Search,
  Table,
};
