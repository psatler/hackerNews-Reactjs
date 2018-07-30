import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Search from './components/Search'
import Table from './components/Table'

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


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
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
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
        />
       
        }
        
      </div>
    );
  }
}

export default App;
