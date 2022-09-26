import React from "react";
import { connect } from "react-redux";
import { fetchCities } from "../../actions";

class CityList extends React.Component {
  componentDidMount() {
    this.props.fetchCities();
  }
  renderCities = () => {
    this.props.cities.map((city) => {
      console.log("this is the city:", city.name);
      console.log("this is the city id:", city.id);
    });
  };

  render() {
    return <div>{this.renderCities()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { cities: Object.values(state.city) };
};

export default connect(mapStateToProps, { fetchCities })(CityList);
