import React, { Component } from "react";
import { auth, generateUserDocument } from "../utils/firebase";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      if (user) { 
        const mongoUser = await API.getUser(user.email);
        user.mongo = mongoUser.data[0];
      }
      this.setState({ user });
     
    });
  };


  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;