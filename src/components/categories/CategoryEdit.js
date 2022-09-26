import React from "react";
import { connect } from "react-redux";
import { fetchCategory, editCategory } from "../../actions";

class CategoryEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }
  render() {
    return <div>Categorty Edit</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { category: state.category[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchCategory, editCategory })(
  CategoryEdit
);
