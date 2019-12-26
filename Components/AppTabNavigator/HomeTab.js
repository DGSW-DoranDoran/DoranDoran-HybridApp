import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import CardComponent from '../CardComponent';

export default class HomeTab extends Component {

    state = {
        feeds: [],
        key: [],
    }

    componentWillMount() {
        this.fetchFeeds().then(feeds => {
            this.setState({feeds});
        })
    }

    fetchFeeds() {
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_discussions_by_created",
              [{ tag: "kr", limit: 5 }]
            ]
        };
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <Container style={style.container}>
                <Content>
                {
                    this.state.feeds.map(feed => <CardComponent data={feed} key={feed.post_id}/>)
                }
                </Content>
            </Container>
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