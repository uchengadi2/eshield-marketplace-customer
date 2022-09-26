import React from "react";
import { connect } from "react-redux";
import { fetchVendors } from "../../actions";

class VendorList extends React.Component {
  componentDidMount() {
    this.props.fetchVendors();
  }

  renderVendorList = () => {
    this.props.vendors.map((vendor) => {
      console.log("this is the vendor id:", vendor.id);
    });
  };
  render() {
    return <div>{this.renderVendorList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { vendors: Object.values(state.vendor) };
};

export default connect(mapStateToProps, { fetchVendors })(VendorList);
