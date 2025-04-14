import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import CartScreen from '../Screens/CartScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

// Move tabBarIcon function outside to avoid re-creation on every render
const renderTabBarIcon = (routeName, color, size) => {
  let iconName;
  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Cart':
      iconName = 'shopping-cart';
      break;
    case 'Orders':
      iconName = 'receipt';
      break;
    case 'Profile':
      iconName = 'person';
      break;
    default:
      iconName = 'circle';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) =>
          renderTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#0A5EB0',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
