import React, { Component } from 'react';
import Header from './components/Header/Header';
import LeafMap from './components/LeafMap/LeafMap.js';
import InputBar from "./components/InputBar/InputBar";
// import Back1 from './assets/images/Austin-background.jpg';

class App extends React.Component {
  constructor() {
    super();
    this.handleLocations = this.handleLocations.bind(this);
    this.state = {
      eventLocations: [{ lat: 30.2672, lng: -97.7431, eventId: 1 }]
    };
  }
  
  handleLocations(locData) {
    this.setState({
      eventLocations: locData
    });
    console.log(this.state.eventLocations);
  }

  componentWillMount(){
    console.log(this.state.eventLocations);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <LeafMap
        markers={this.state.eventLocations}
        />
        <InputBar
        locationHandle={this.handleLocations}
        />
      </div>
    );
  }
}

export default App;
