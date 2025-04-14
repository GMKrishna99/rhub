import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './Navigation/TabNavigator';
import {CartProvider} from './Screens/CartContext';
const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
