import React from "react";
import { connect } from "react-redux";
import { fetchPolicies } from "../../actions";

class PolicyList extends React.Component {
  componentDidMount() {
    this.props.fetchPolicies();
  }

  renderPolicies = () => {
    this.props.policies.map((policy) => {
      console.log("this is the policy id", policy.id);
    });
  };
  render() {
    return <div>{this.renderPolicies()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { policies: Object.values(state.policy) };
};

export default connect(mapStateToProps, { fetchPolicies })(PolicyList);
