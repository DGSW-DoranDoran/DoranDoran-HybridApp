import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import axios from 'axios';
import { baseUri } from '../../config/dbUri';

export default class ProfileTab extends Component {
    componentWillMount() {
        this._getUser();
    }

    _getUser = async() => {
        const memberId = sessionStorage.getItem('id');
        await axios.get(`${baseUri}/auth/info?member_id=${memberId}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Container style={{ flex:1, backgroundColor: 'white'}}>
                <Content>
                    <View style={{flexDirection:'row', paddingTop:10}}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Image source={{ url: 'https://steemitimages.com/u/anpigon/avatar' }}
                                    style={{width:75, height:75, borderRadius:37.5}}
                            />
                        </View>
                        <View style={{flex:3}}>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <View style={{alignItems:'center'}}>
                                <Text>167</Text>
                                <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                <Text>346</Text>
                                <Text style={{fontSize:10, color:'gray'}}>follower</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                <Text>192</Text>
                                <Text style={{fontSize:10, color:'gray'}}>following</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button bordered dark
                                        style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                                <Text>Edit Profile</Text>
                                </Button>
                                <Button bordered dark small icon
                                        style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
                                <Icon name="settings" />
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:10, paddingVertical:10}}>
                        <Text style={{fontWeight:'bold'}}>안피곤</Text>
                        <Text>Lark | Computer Jock | Commercial Pilot</Text>
                        <Text>www.steemit.com/@anpigon</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}