// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Image, TouchableOpacity, View } from 'react-native';
// import { Icons } from '../assets/icons';
// import VectorIcons, { IconSets } from '../components/Icons/VectorIcons';
// import { useUser } from '../context/user';
// import { UserType } from '../interfaces/User';
// import * as screens from '../screens';
// import { userTypeAtom } from '../store/atoms';
// import { rspF, rspW } from '../theme/responsive';

// const Sample = () => {
//   return <></>;
// };

// const TabBarIcon = ({
//   color,
//   focused,
//   size,
//   icon,
//   iconSet,
//   image,
// }: {
//   color: string;
//   size: number;
//   focused: boolean;
//   icon?: string;
//   iconSet: IconSets;
//   image?: number;
// }) => {
//   const {theme} = useUser();
//   return (
//     <View
//       style={[
//         {
//           width: size + 15,
//           height: size + 15,
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         focused && {
//           borderRadius: size + 15,
//           backgroundColor: theme.blue,
//         },
//       ]}>
//       {image && (
//         <Image
//           source={image}
//           style={{
//             tintColor: color,
//             width: size,
//             height: size,
//           }}
//         />
//       )}
//       {icon && (
//         <VectorIcons iconSet={iconSet} name={icon} size={size} color={color} />
//       )}
//     </View>
//   );
// };

// const Tab = createBottomTabNavigator();

// const BottomNav = () => {
//   const {theme} = useUser();
//   const navigation = useNavigation();
//   const userType = useAtomValue(userTypeAtom);

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarActiveTintColor: theme.white,
//         tabBarInactiveTintColor: theme.black,
//         headerTitleAlign: 'center',
//         headerTitleStyle: {
//           color: theme.black,
//           fontSize: rspF(20),
//         },
//         headerLeft: () => {
//           return (
//             <TouchableOpacity
//               style={{
//                 padding: 4,
//                 marginStart: 12,
//               }}
//               onPress={() => navigation.goBack()}>
//               <VectorIcons
//                 name="arrow-back-ios"
//                 color={theme.black}
//                 size={rspW(24)}
//                 iconSet={IconSets.MaterialIcons}
//               />
//             </TouchableOpacity>
//           );
//         },
//       }}
//       backBehavior="order"
//       >
//       <Tab.Screen
//         name="BOTTOM_HOME"
//         component={Home}
//         options={{
//           tabBarIcon: ({color, size, focused}) => (
//             <TabBarIcon
//               color={color}
//               size={size}
//               focused={focused}
//               icon={'home'}
//               iconSet={IconSets.MaterialCommunityIcons}
//             />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{
//           tabBarIcon: ({color, size, focused}) => (
//             <TabBarIcon
//               image={Icons.Dashboard}
//               color={color}
//               size={size}
//               focused={focused}
//               iconSet={IconSets.FontAwesome}
//             />
//           ),
//         }}
//       />
//       {(!userType || userType === UserType.SELLER) && (
//         <Tab.Screen
//           name="CHOOSE_TEMPLATE"
//           component={screens.PostTemplate}
//           options={{
//             title: '',
//             tabBarIcon: ({color, size, focused}) => (
//               <TabBarIcon
//                 color={color}
//                 size={size}
//                 focused={focused}
//                 icon={'add'}
//                 iconSet={IconSets.MaterialIcons}
//               />
//             ),
//           }}
//         />
//       )}
//       <Tab.Screen
//         name="Search"
//         component={Search}
//         options={{
//           title: '',
//           tabBarIcon: ({color, size, focused}) => (
//             <TabBarIcon
//               color={color}
//               size={size}
//               focused={focused}
//               icon={'search'}
//               iconSet={IconSets.FontAwesome}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={screens.Profile}
//         options={{
//           tabBarIcon: ({color, size, focused}) => (
//             <TabBarIcon
//               color={color}
//               size={size}
//               focused={focused}
//               icon={'user-alt'}
//               iconSet={IconSets.FontAwesome5}
//             />
//           ),
//           title: '',
//           headerShown: false,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
// export default BottomNav;
