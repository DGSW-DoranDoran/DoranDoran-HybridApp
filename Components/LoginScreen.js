import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card, Form, Container, Item, Input, Label, Button, CardItem, CheckBox, Body } from 'native-base';
import axios from 'axios';
import { baseUri } from '../config/dbUri';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            id: null,
            password: null
        };
    }

    _keepLoginCheck = () => {
        if(this.state.checked) {
            this.setState({
                checked: false,
            })
        } else {
            this.setState({
                checked: true,
            })
        }
    }

    _signInBtn = () => {
        this.props.navigation.navigate('RegisterScreen');
    }

    _signUpBtn = () => {
        const { id, password } = this.state;
        const data = {
            id: id,
            password: password
        }
        
        axios.post(`${baseUri}/auth/login`, data)
        .then(res => {
            if(res.status == 200) {
                this.props.navigation.navigate('HomeTab', res);
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <Card style={{height:"40%"}}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={{height:"100%", width:"100%"}}
                    />
                </Card>
                <Form style={{width: "100%", flex: 1}}>
                    <Item floatingLabel>
                        <Label>ID</Label>
                        <Input onChangeText={(value) => this.setState({id: value})}/>
                    </Item>
                    <Item floatingLabel last style={{marginBottom: 30}}>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
                    </Item>
                    {/* <Item>
                        <CheckBox checked={this.state.checked} onPress={() => this._keepLoginCheck()}/>
                        <Body>
                            <Text>로그인 상태 유지</Text>
                        </Body>
                    </Item> */}
                    <Button rounded light style={style.formBtn}>
                        <Text style={{alignItems: 'center', fontSize: 24}} onPress={() => this._signUpBtn()}>로그인</Text>
                    </Button>
                </Form>
                <Card style={style.registerCard}>
                    <CardItem>
                        <Text>계정이 없으신가요?</Text>
                    </CardItem>
                    <CardItem>
                        <Button style={{width: "50%", flex: 1, alignItems: 'center', fontSize: 24}} rounded light onPress={() => this._signInBtn()}>
                            <Text>회원가입</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    formBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24
    },

    registerCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        width: "100%",
        height: "20%",
        position: 'absolute',
        bottom: 0
    }
})