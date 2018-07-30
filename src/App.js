import React, { Component } from 'react';
import logo from './logo.svg';
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

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

console.log(url)

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault(); //to avoid page reloads
  }

  setSearchTopStories(result){
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits 
      : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits,
    ]

    this.setState({
      result: { //setting the merged hits and page in local component state
        hits: updatedHits, 
        page
      }
    })
  }

  fetchSearchTopStories(searchTerm, page = 0){ //if don't provide a page, it'll fallback to the initial one
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}${PARAM_HPP}${DEFAULT_HPP}`)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }
  
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    // this.setState({
    //   result: Object.assign({}, this.state.result, { hits: updatedHits})
    // })
    this.setState({ //using the spread operator
      result: {...this.state.result, hits: updatedHits }
    })
  }

  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value, 
    })
  }


  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0; //defaulting it to zero, so on the first load it won't crash if you press the more button

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
        {result && //if it is not null, show table
        <Table 
          list={result.hits}
          onDismiss={this.onDismiss}
        />}
        <div className="interactions" >
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}> 
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
