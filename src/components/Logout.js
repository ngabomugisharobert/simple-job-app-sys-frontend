import React from 'react';
import auth from "../services/authService";

class Logout extends React.Component {
    componentDidMount() {
        //remove email from local storage
        localStorage.removeItem("email");
        auth.logout();
        window.location = '/';
    }

    render() {
        return null;
    }
}

export default Logout;