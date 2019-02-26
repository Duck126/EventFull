import React from "react"
import { compose, withProps} from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import whtMarker from "../../assets/images/whtMarker.png";
import Mstyle from "../../styles/MapStyle";
import Grid from "@material-ui/core/Grid"


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyARmxUruzWQJU1DBb66rWeoSjwlucOiHfg",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={Mstyle.Map} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
    defaultOptions={{ styles: Mstyle.themeStyles }}
  >
    {props.markers.map(marker  =>  (
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        defaultOptions={
          {
          icon: whtMarker,
          label: marker.eventId + "",
          }
        }
        // labelAnchor= {{point:(0,0)}}
        // labelStyle={{backgroundColor: "#4444", fontSize: "16px", padding: "10px"}}
      >
        {/* <div>{marker.eventId}</div> */}
      </Marker>
    ))}
  </GoogleMap>
)

class MyMap extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isMarkerShown: false,
      markers: []
    };
  }
  
  componentWillMount(){
    this.setState({
      markers: this.props.markers
    });
    console.log(this.state.markers);
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

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    // this.delayedShowMarker()
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
            <MyMapComponent
              isMarkerShown={this.state.isMarkerShown}
              markers={this.state.markers}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MyMap;

