import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Welcome from './src/modules/welcome/Welcome';
import Login from './src/modules/login/Login';
import MainTab from 'modules/main-tab/MainTab';
import ArticleDetail from 'modules/article-detail/ArticleDetail';
import SearchGoods from 'modules/search-goods/SearchGoods';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ cardStyle: { elevation: 1 } }}>
          <Stack.Screen
            name={'Welcome'}
            component={Welcome}
            options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
          />
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
          />
          <Stack.Screen
            name={'MainTab'}
            component={MainTab}
            options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
          />
          <Stack.Screen
            name={'ArticleDetail'}
            component={ArticleDetail}
            options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
          />
          <Stack.Screen
            name={'SearchGoods'}
            component={SearchGoods}
            options={{ headerShown: false, presentation: 'transparentModal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;
