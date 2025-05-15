import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets/icons';
import VectorIcons, { IconSets } from '../../components/Icons/VectorIcons';
import { useUser } from '../../context/user';
import * as screens from '../../screens';
import { rspF, rspW } from '../../theme/responsive';
import { RootStackParamList } from '../navStrings';
import { CalendarIc, FilledCalendarIc, FilledProfileIc, HomeFilledIc, HomeIc, LocFilledIc, LocIc, ProfileIc } from '../../svg';
import { fetchProfile } from '../../screens/profile/ProfileFunctions';

const TabBarIcon = ({
  color,
  focused,
  size,
  icon,
  iconSet,
  image,
  SvgImg,
  FocusedSvg
}: {
  color: string;
  size: number;
  focused: boolean;
  icon?: string;
  iconSet?: IconSets;
  image?: number;
  SvgImg?: any;
  FocusedSvg?: any;

}) => {
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
          backgroundColor: '#F3F4F6',
        },
      ]}>
      <>
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
        {icon && iconSet && (
          <VectorIcons iconSet={iconSet} name={icon} size={size} color={color} />
        )}
        {SvgImg && (
          focused ? <FocusedSvg /> : <SvgImg />
        )
        }
      </>

    </View>
  );
};

const Tab = createBottomTabNavigator();
type Props = {
  navigation: NavigationProp<RootStackParamList, 'BOTTOMTAB'>;
};
const BottomNav = ({ navigation }: Props) => {

  const  isFocused  = navigation.isFocused();

  async function getUserProfile() {
    try {
      const userData = await fetchProfile();
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [isFocused]);
  return (
    <Tab.Navigator
      screenOptions={{
        animation: 'none',
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: '#A59D84',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'black',
          fontSize: rspF(20),
        },
        tabBarStyle:{
          paddingTop: 5,
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
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              SvgImg={HomeIc}
              FocusedSvg={HomeFilledIc}
            // icon={'home'}
            // iconSet={IconSets.MaterialCommunityIcons}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NearbyHospitalsMap"
        component={screens.NearbyHospitalsMap}
        options={{
          
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              SvgImg={LocIc}
              FocusedSvg={LocFilledIc}
              
              
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={screens.MyBookings}
        options={{
          title: 'My Bookings',
          
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              SvgImg={CalendarIc}
              FocusedSvg={FilledCalendarIc}              
            // icon={'search'}
            // iconSet={IconSets.FontAwesome}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={screens.ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              focused={focused}
              SvgImg={ProfileIc}
              FocusedSvg={FilledProfileIc}
            // icon={'user-alt'}
            // iconSet={IconSets.FontAwesome5}
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
