import React from "react";
import { connect } from "react-redux";
import AboutUsForm from "./AboutUsForm";

class AboutUsFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  handleDialogOpenStatus = () => {
    this.setState({
      open: true,
    });
  };

  onSubmit = (formValues) => {
    // this.props.createCity(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <AboutUsForm onSubmit={this.onSubmit} token={this.props.token} />
      </>
    );
  }
}

// CategoryFormContainer.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   //return { token: state.auth.token };
//   return null;
// };

export default connect(null, {})(AboutUsFormContainer);
