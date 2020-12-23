import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import CompanyReg from './CompanyReg';
import Phone from './Phone';
import AdminDash from './AdminDash';
import CompDash from './CompDash';
import CompLogin from './CompLogin';
import Jobs from './Jobs';
import CV from './CV';
import CompHome from './CompHome';
import Lists from './Lists';
import Apply from './Apply';
import AdminComp from './AdminComp';
import a from './a';
import Applied from './Applied';
import AdminHome from './AdminHome';
import StdHome from './StdHome';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CompanyReg" component={CompanyReg} />
            <Stack.Screen name="Phone" component={Phone} />
            <Stack.Screen name="AdminDash" component={AdminDash} />
            <Stack.Screen name="CompDash" component={CompDash} />
            <Stack.Screen name="CompLogin" component={CompLogin} />
            <Stack.Screen name="Jobs" component={Jobs} />
            <Stack.Screen name="CV" component={CV} />
            <Stack.Screen name="CompHome" component={CompHome} />
            <Stack.Screen name="Lists" component={Lists} />
            <Stack.Screen name="Apply" component={Apply} />
            <Stack.Screen name="AdminComp" component={AdminComp} />
            <Stack.Screen name="a" component={a} />
            <Stack.Screen name="Applied" component={Applied} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="StdHome" component={StdHome} />
        </Stack.Navigator>
    );
}