import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Form, Item, Label, Input, Picker, Icon, Button } from 'native-base';
import axios from 'axios';
import { baseUri } from '../config/dbUri';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderSelect: null,
            gradeSelect: null,
            positionSelect: null,
            id: null,
            password: null,
            name: null,
            phone: null,
        };
    }

    _onSelect = (value) => {
        if(value == "남자" || value == "여자") {
            this.setState({
                genderSelect: value,
            });
        } else if(value == "1학년" || value == "2학년" || value == "3학년") {
            this.setState({
                gradeSelect: value
            })
        } else {
            this.setState({
                positionSelect: value
            })
        }
    }

    _signInBtn = () => {
        var gender;
        var grade;
        if(this.state.genderSelect == "남자") 
            gender = 0;
        else 
            gender = 1;

        if(this.state.gradeSelect == "1학년")
            grade = 1;
        else if(this.state.gradeSelect == "2학년")
            grade = 2;
        else
            grade = 3;
        
        const data = {
            id: this.state.id,
            password: this.state.password,
            name: this.state.name,
            phone: this.state.phone,
            gender: gender,
            grade: grade,
            position: this.state.positionSelect
        };

        axios.post(`${baseUri}/auth/register`, data)
        .then(res => {
            if(res.status == 200) {
                this.props.navigation.navigate('LoginScreen');
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <Text style={style.mainText}>도란도란</Text>
                <Form style={style.formCard}>
                    <Item floatingLabel>
                        <Label>아이디</Label>
                        <Input onChangeText={(value) => this.setState({id: value})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>비밀번호</Label>
                        <Input secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>이름</Label>
                        <Input onChangeText={(value) => this.setState({name: value})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>휴대폰</Label>
                        <Input onChangeText={(value) => this.setState({phone: value})}/>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="성별"
                            selectedValue={this.state.genderSelect}
                            onValueChange={(value) => this._onSelect(value)}
                        >
                            <Picker.Item label="성별" />
                            <Picker.Item label="남자" value="남자" />
                            <Picker.Item label="여자" value="여자" />
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="학년"
                            selectedValue={this.state.gradeSelect}
                            onValueChange={(value) => this._onSelect(value)}
                        >
                            <Picker.Item label="학년" />
                            <Picker.Item label="1학년" value="1학년" />
                            <Picker.Item label="2학년" value="2학년" />
                            <Picker.Item label="3학년" value="3학년" />
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="개발분야"
                            selectedValue={this.state.positionSelect}
                            onValueChange={(value) => this._onSelect(value)}
                        >
                            <Picker.Item label="분야" />
                            <Picker.Item label="웹" value="웹" />
                            <Picker.Item label="앱" value="앱" />
                            <Picker.Item label="서버" value="서버" />
                            <Picker.Item label="디자인" value="디자인" />
                        </Picker>
                    </Item>
                    <Button rounded light style={style.formBtn} onPress={() => this._signInBtn()}>
                        <Text>회원가입</Text>
                    </Button>
                </Form>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    mainText: {
        fontSize: 24,
        alignSelf: 'center'
    },

    formCard: {
        flex: 1,
    },

    formBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    }
});
