import React from "react";
import { connect } from "react-redux";
import { fetchCategory, deleteCategory } from "../../actions";

class CategoryDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  renderCategoryList = (id) => {};

  render() {
    return <div>Category Delete</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { category: state.category[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchCategory, deleteCategory })(
  CategoryDelete
);
