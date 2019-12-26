import React from 'react';
import {
    Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import SomeTab from './AppTabNavigator/SomeTab'

const HomeStack = createStackNavigator(
    {
        HomeTab,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'DoranDoran',
        }),
    }
);

const SearchStack = createStackNavigator(
    {
        SearchTab,
        SomeTab
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Search'
        }),

        initialRouteName: 'SearchTab',
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Search: SearchStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let icon = "▲";

                if(routeName === 'Home'){
                    icon = "🌈";
                } else if(routeName === 'Search'){
                    icon = "🌙"
                } 

                // can use react-native-vector-icons
                // <Icon name={iconName} size={iconSize} color={iconColor} />
                return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888",
        },
    }
)

const AppStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            }
        },
        RegisterScreen: RegisterScreen,
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
    }
);

export default createAppContainer(AppStack);