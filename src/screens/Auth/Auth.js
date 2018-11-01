import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainText from '../../component/UI/MainText/MainText';
import ButtonWithBackground from '../../component/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/1.png';
import validate from '../../utility/validation'

class AuthScreen extends Component {

    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false,
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false,
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false,
            }
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key == 'password') {           
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value : value,
                        valid : validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true,                    
                    },                    
                }
            }
        });
    }

    loginHandler = () => {
        startMainTabs();
    }
    render() {
        let headingText = null;
        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello~!!')}>Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            placeholder="Your E-Mail Address" 
                            style={styles.input} 
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                        />
                        <View
                            style={this.state.viewMode === "portrait"
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer}>
                            <View
                                style={this.state.viewMode === "portrait"
                                    ? styles.portraitPasswordWraper
                                    : styles.landscapePasswordWraper}>
                                <View style={styles.passwordWraper}>
                                    <DefaultInput 
                                        placeholder="Password" 
                                        style={styles.input} 
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState('password', val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                    />
                                </View>
                            </View>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWraper : styles.landscapePasswordWraper}>
                                <View style={styles.passwordWraper}>
                                    <DefaultInput 
                                        placeholder="Confirm Password" 
                                        style={styles.input} 
                                        value={this.state.controls.confirmPassword.value}
                                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                                        valid={this.state.controls.confirmPassword.valid}
                                        touched={this.state.controls.confirmPassword.touched}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground 
                        color="#29aaf4" onPress={this.loginHandler}
                        onPress={this.loginHandler}
                        disabled={!this.state.controls.confirmPassword.valid || !this.state.controls.email.valid || !this.state.controls.password.valid}
                    >
                        Submit
                    </ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWraper: {
        width: "45%"
    },
    portraitPasswordWraper: {
        width: "100%"
    }
});

export default AuthScreen;