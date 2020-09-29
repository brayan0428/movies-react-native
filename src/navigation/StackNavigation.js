import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import Popular from '../screens/Popular';
import News from '../screens/News';
import Search from '../screens/Search';
import {IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

export default function StackNavigation({navigation}) {
  const headerLeft = (screen) => {
    if (screen) {
      return <IconButton icon="arrow-left" onPress={navigation.goBack} />;
    }
    return <IconButton icon="menu" onPress={navigation.openDrawer} />;
  };

  const headerRight = () => (
    <IconButton icon="magnify" onPress={() => navigation.navigate('Search')} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Movies App',
          headerLeft: () => headerLeft(),
          headerRight,
        }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{
          title: '',
          headerLeft: () => headerLeft('movie'),
          headerRight,
          headerTransparent:true
        }}
      />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{
          title: 'Peliculas Populares',
          headerLeft: () => headerLeft(),
          headerRight,
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          title: 'Nuevas Peliculas',
          headerLeft: () => headerLeft(),
          headerRight,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{title: '',headerTransparent:true, headerLeft: () => headerLeft('search')}}
      />
    </Stack.Navigator>
  );
}
