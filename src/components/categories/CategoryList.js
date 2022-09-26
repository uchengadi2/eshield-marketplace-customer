import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions";

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderList = () => {
    this.props.categories.map((category) => {
      //console.log("this is the id:", category._id);
      //console.log("this is the name:", category.name);
    });
  };
  render() {
    //console.log("the props is", this.props.categories);
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { categories: Object.values(state.category) };
};
export default connect(mapStateToProps, { fetchCategories })(CategoryList);
