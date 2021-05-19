import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import {colors} from './styles/colors';

const Stack = createStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'HVK',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontFamily: 'ShareTechMono-Regular',
          },
          headerTintColor: colors.light,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
