import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";

class UserList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsersList = () => {
    this.props.users.map((user) => {
      console.log("this is the user id:", user.id);
    });
  };
  render() {
    return <div>{this.renderUsersList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { users: Object.values(state.user) };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
