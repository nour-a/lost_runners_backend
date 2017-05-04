import React from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';

import StartLocation from 'react-material-icons/icons/maps/person-pin';
import EndLocation from 'react-material-icons/icons/content/flag';
import Normal from './Polyline';

const key = 'AIzaSyCYqqDmqVZsVn_Wmqj8bdXgX71MRSM2z4Y';

// TODO: Current Location running man
// TODO: axios get function to fetch info
// TODO: react-router - CHECK
// TODO: install CORS on backend on a new branch - 
// TODO: Nour to change Longitude in backend table
// TODO: Serve front end to database route 
// TODO: Include RunnerInfo component to mapy runner and show details

// const axios = {
//      get: () => new Promise(function (resolve) {
//        setTimeout(function () {
//            resolve({
//              body: {
//                 destination: {lat: 53.342, lng: -2.56},
//                 duration: 959,
//                 path: [
//                     {id: 1, lat: 52.4802, lng: -2.23, time: 50131231},
//                     {id: 2, lat: 53.4801, lng: -2.42, time: 45234234},
//                     {id: 3, lat: 53.4800, lng: -2.21, time: 45234233},
//                     {id: 4, lat: 52.4799, lng: -2.40, time: 45234232},
//                     {id: 5, lat: 53.4798, lng: -2.29, time: 45234231},
//                     {id: 6, lat: 52.4797, lng: -2.48, time: 45234230}
//                 ]
//              }
//           });
//         });
//     }, 500)
// };

class MapRunner extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      mapLoaded: false,
      appLoaded: false,
      destination: {},
      duration: null,
      path: []
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  componentWillMount () {
       axios
        //.get()
        .get('https://lost-runner.herokuapp.com/api/runs/1')
        .then((res) => {
            this.setState({
              appLoaded: true,
              destination: res.body.destination,
              duration: res.body.duration,
              path: res.body.path
            });
        })
        .catch((error) => {
          //FIXME: Handle Error redirect to 404 page
          console.log('******/', error);
        });
  }

  handleMapLoad ({ map, maps }) {
    this.setState({ map: map, maps: maps, mapLoaded: true });
  }

  refreshState () {
      return setInterval(this.componentWillMount(),100);
  }

  render () {
    const center = {lat: this.state.destination.lat, lng: this.state.destination.lng};
    const zoom = 9;

    return (
      <div style={{ width: '90%', maxWidth: '1000px', height: '300px', margin: 'auto' }}>

        {this.state.appLoaded && <GoogleMap
          bootstrapURLKeys={{ key: key }}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={this.handleMapLoad}
          yesIWantToUseGoogleMapApiInternals={true}
        >

          <StartLocation 
            lat={this.state.path[0].lat}
            lng={this.state.path[0].lng}
          />          

          <EndLocation 
            lat={this.state.destination.lat}
            lng={this.state.destination.lng}          
          />

        </GoogleMap>}
        {this.state.mapLoaded && this.state.appLoaded && this.refreshState &&
          <Normal 
            map={this.state.map} 
            maps={this.state.maps}
            path={this.state.path}
          /> }
      </div>
    );
  }
}

export default MapRunner;

