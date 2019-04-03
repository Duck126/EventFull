// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import styles from '../../styles/LeafMapStyle';


class LeafMap extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            lat: 30.2672,
            lng: -97.7431,
            zoom: 10,
            markers: []
        };
    }

    componentWillMount(){
        this.setState({
          markers: this.props.markers
        });
    }
    
    componentDidMount() {
        console.log(this.state.markers);
    }

    componentDidUpdate(prevProps){
      console.log(prevProps, "previous locations");
      if(prevProps.markers !== this.props.markers){
        this.setState({
          markers: this.props.markers
        });
      }
    }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} style={styles.Map} markers={this.state.markers}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          markers={this.state.markers}
        />
          {this.state.markers.map(marker  =>  (
              <Marker
                position={{ lat: marker.lat, lng: marker.lng }}
                key={marker.eventId}
              >
                <Popup>{marker.eventId}: {marker.name}</Popup>
                <Tooltip direction={"center"} opacity={1} permanent>{marker.eventId}</Tooltip>
              </Marker>
          ))}
      </Map>
    )
  }
}

export default LeafMap;