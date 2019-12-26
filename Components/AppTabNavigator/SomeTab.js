import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class SomeTab extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>SomeTab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});