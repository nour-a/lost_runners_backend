import React from 'react';
import propTypes from 'prop-types';

class Polyline extends React.PureComponent {

  componentWillUpdate() {
    this.line.setMap(null);
  }

  componentWillUnmount() {
    this.line.setMap(null);
  }

  render() {
    const Polyline = this.props.maps.Polyline;

    const renderedPolyline = this.renderPolyline();
    const paths = { path: this.props.path };

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths));

    this.line.setMap(this.props.map);

    return null;
  }

  renderPolyline() {
    throw new Error('Implement renderPolyline method');
  }

}

class Normal extends Polyline {

  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || 'blue',
      strokeOpacity: 1,
      strokeWeight: 4
    };
  }
}

Polyline.propTypes = {
  maps: React.PropTypes.object.isRequired,
  map: React.PropTypes.object.isRequired,
  path: React.PropTypes.array.isRequired
};

export default Normal;