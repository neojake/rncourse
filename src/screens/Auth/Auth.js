import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs'

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }
    render () {
        return (
            <View>
                <Text>Please Log In</Text>
                <Button title="Switch to Login" />
                <TextInput placeholder="Your E-Mail Address" />
                <TextInput placeholder="Password" />
                <TextInput placeholder="Confirm Password" />
                <Button title="Submit" onPress={this.loginHandler} />
            </View>
        );
    }
}

export default AuthScreen;