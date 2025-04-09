import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icons } from '../assets/icons';
import VectorIcons, { IconSets } from '../components/Icons/VectorIcons';
import { useUser } from '../context/user';
import * as screens from '../screens';
import { rspF, rspW } from '../theme/responsive';
import { RootStackParamList } from './navStrings';

const TabBarIcon = ({
  color,
  focused,
  size,
  icon,
  iconSet,
  image,
}: {
  color: string;
  size: number;
  focused: boolean;
  icon?: string;
  iconSet: IconSets;
  image?: number;
}) => {
  const {theme} = useUser();
  return (
    <View
      style={[
        {
          width: size + 15,
          height: size + 15,
          alignItems: 'center',
          justifyContent: 'center',
        },
        focused && {
          borderRadius: size + 15,
          backgroundColor: '#F2F9FF',
        },
      ]}>
      {image && (
        <Image
          source={image}
          style={{
            tintColor: color,
            width: size,
            height: size,
          }}
        />
      )}
      {icon && (
        <VectorIcons iconSet={iconSet} name={icon} size={size} color={color} />
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();
type Props = {
  navigation: NavigationProp<RootStackParamList, 'BOTTOMTAB'>;
};
const BottomNav = ({navigation}:Props) => {

  useEffect(() => {
    console.log('BottomNav mounted',navigation.getState().routes);
  }, [navigation.getState().routes]);
  return (
    <Tab.Navigator
      screenOptions={{
        animation:'none',
        tabBarShowLabel: false,
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'#A59D84',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color:'black',
          fontSize: rspF(20),
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{
                padding: 4,
                marginStart: 12,
              }}
              onPress={() => navigation.goBack()}>
              <VectorIcons
                name="arrow-back-ios"
                color={'black'}
                size={rspW(24)}
                iconSet={IconSets.MaterialIcons}
              />
            </TouchableOpacity>
          );
        },
      }}
      backBehavior="order"
      >
      <Tab.Screen
        name="BOTTOM_HOME"
        component={screens.Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              icon={'home'}
              iconSet={IconSets.MaterialCommunityIcons}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={screens.DashBoard}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabBarIcon
              image={Icons.Dashboard}
              color={color}
              size={size}
              focused={focused}
              iconSet={IconSets.FontAwesome}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={screens.Search}
        options={{
          title: '',
          tabBarIcon: ({color, size, focused}) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              icon={'search'}
              iconSet={IconSets.FontAwesome}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={screens.ProfileScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              icon={'user-alt'}
              iconSet={IconSets.FontAwesome5}
            />
          ),
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNav;
