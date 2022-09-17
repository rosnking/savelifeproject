import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../pages/Home'
import Chatbot from '../pages/Chatbot'
import Settings from '../pages/Settings';

const Bottomtabs = createBottomTabNavigator();

export default function HomeNavigation(props) {
    return (
        <Bottomtabs.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false,
        }}>
          <Bottomtabs.Screen name='Home' component={Home}/>
          <Bottomtabs.Screen name='Chatbot' component={Chatbot}/>
          <Bottomtabs.Screen name='Settings' component={Settings}/>
        </Bottomtabs.Navigator>
    );
}