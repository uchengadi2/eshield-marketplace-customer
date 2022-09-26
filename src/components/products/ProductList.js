import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts = () => {
    this.props.products.map((product) => {
      console.log("this is the product id:", product.id);
    });
  };
  render() {
    return <div>{this.renderProducts()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { products: Object.values(state.product) };
};

export default connect(mapStateToProps, { fetchProducts })(ProductList);
