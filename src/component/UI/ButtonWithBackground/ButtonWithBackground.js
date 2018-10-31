import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const buttonWithBackground = (
    props
) => (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, {backgroundColor: props.color}]}>
                <Text>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "black",
    }
});

export default buttonWithBackground;
