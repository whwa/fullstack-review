import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  componentDidMount() {
    // $.ajax({
    //   type: 'GET',
    //   url: 'http://localhost:1128/repos',
    //   // data: JSON.stringify({handle : `${term}`}),
    //   success: (data) => {
    //     data = JSON.parse(data);
    //     this.setState({repos : data});
    //   },
    //   contentType: 'application/json'
    // });
    this.refresh();
  }

  refresh() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1128/repos',
      // data: JSON.stringify({handle : `${term}`}),
      success: (data) => {
        data = JSON.parse(data);
        this.setState({repos : data});
      },
      contentType: 'application/json'
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //send post to server endpoint /repos
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({handle : `${term}`}),
      success: (data) => {
        data = JSON.parse(data);
        console.log('data length', typeof data)
        this.setState({repos : data});
        console.log(this.state)
      },
      contentType: 'application/json'
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} onRef={this.refresh.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));