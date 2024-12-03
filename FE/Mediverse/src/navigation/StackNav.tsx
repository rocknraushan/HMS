import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
// import {useSelector} from 'react-redux';
import {RootStackParamList} from './navStrings';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VectorIcons, {IconSets} from '../components/Icons/VectorIcons';
import {useUser} from '../context/user';
import * as screens from '../screens';
import {rspF, rspW} from '../theme/responsive';
import BottomNav from './BottomNav';

const header = {headerShown: false};
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav = () => {
  //   const user_loggined = useSelector(state => state.auth.user_loggined);

  const {theme} = useUser();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        // animationEnabled: true,
        // ...TransitionPresets.SlideFromRightIOS,
        // cardOverlayEnabled: true,
        // presentation: 'modal',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: theme.black,
          fontSize: rspF(20),
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{
                padding: 4,
              }}
              onPress={() => navigation.goBack()}>
              <VectorIcons
                name="arrow-back-ios"
                color={theme.black}
                size={rspW(24)}
                iconSet={IconSets.MaterialIcons}
              />
            </TouchableOpacity>
          );
        },
      }}
      // initialRouteName="FILTER_BRAND"
    >
      <Stack.Screen
        name={'SPLASH'}
        component={screens.Splash}
        options={header}
      />
      <Stack.Screen
        name={'WELCOME'}
        component={screens.Welcome}
        options={header}
      />
      <Stack.Screen
        name={'SELECT_LANGUAGE'}
        component={screens.SelectLanguage}
        options={({navigation, route}) => {
          return {
            headerShown: route.params?.hideBack ? false : true,
            headerTitle: 'Preferred Language',
          };
        }}
      />
      <Stack.Screen name={'LOGIN'} component={screens.Login} options={header} />
      {/* <Stack.Screen
        name={'REGISTER'}
        component={screens.Register}
        options={header}
      /> */}
      <Stack.Screen
        name={'GST_REGISTRATION'}
        component={screens.GSTRegistration}
        options={header}
      />
      <Stack.Screen
        name={'SELECT_CATEGORIES'}
        component={screens.SelectCategories}
        options={({navigation, route}) => {
          return {
            headerShown: route.params?.hideBack ? false : true,
            headerTitle: '',
          };
        }}
      />
      <Stack.Screen
        name={'ESTABLISHMENT_PHOTOS'}
        component={screens.EstablishmentPhotos}
        options={({navigation, route}) => {
          return {
            headerShown: route.params?.hideBack ? false : true,
            headerTitle: '',
          };
        }}
      />
      <Stack.Screen
        name={'CERTIFICATE_AUTHORIZATION'}
        component={screens.CertificateAuthorization}
        options={({navigation, route}) => {
          return {
            headerShown: route.params?.hideBack ? false : true,
            headerTitle: '',
          };
        }}
      />

      <Stack.Screen name={'HOME'} component={BottomNav} options={header} />
      <Stack.Screen
        name={'NOTIFICATIONS'}
        component={screens.Notifications}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'MYORDERS'}
        component={screens.MyOrders}
        options={{
          headerTitle: 'Orders',
        }}
      />
      <Stack.Screen
        name={'MYWISHLIST'}
        component={screens.MyWishlist}
        options={{
          headerTitle: 'My Wishlists',
        }}
      />
      <Stack.Screen
        name={'MYSAVINGS'}
        component={screens.MySavings}
        options={{
          headerTitle: 'My Savings',
        }}
      />
      <Stack.Screen
        name={'MYPAYMENTS'}
        component={screens.MyPayments}
        options={{
          headerTitle: 'Payments',
        }}
      />
      <Stack.Screen
        name={'MYCART'}
        component={screens.MyCart}
        options={{
          headerTitle: 'My Cart',
        }}
      />
      <Stack.Screen
        name={'PLACE_ORDER'}
        component={screens.PlaceOrder}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'SELLERPROFILE'}
        component={screens.SellerProfile}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'COMMENTS'}
        component={screens.Comments}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'PLACE_ORDER_STEPS'}
        component={screens.PlaceOrderSteps}
        options={{
          headerTitle: 'Place Order',
        }}
      />
      <Stack.Screen
        name={'SELECT_ADDRESS'}
        component={screens.SelectAddress}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'FILTER_BRAND'}
        component={screens.FilterBrand}
        options={{
          headerTitle: '',
        }}
      />

      <Stack.Screen
        name={'EDIT_TEMPLATE'}
        component={screens.EditTemplate}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'ADD_POST_DETAILS'}
        component={screens.AddPostDetails}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'CREATE_INNER_POST'}
        component={screens.CreateInnerPost}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'SELECT_PRODUCTS'}
        component={screens.SelectProducts}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'PREVIEW_POST'}
        component={screens.PreviewPost}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'SCHEDULE_POST'}
        component={screens.SchedulePost}
        options={{
          headerTitle: '',
        }}
      />

      {/* PROFILE Stack */}
      <Stack.Screen
        name={'MYPROFILE'}
        component={screens.MyProfile}
        options={{
          headerTitle: 'My Profile',
        }}
      />
      <Stack.Screen
        name={'MYSAVEDPOSTS'}
        component={screens.MySavedPosts}
        options={{
          headerTitle: 'My Saved Posts',
        }}
      />
      <Stack.Screen
        name={'WALLET'}
        component={screens.Wallet}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'ADD_MONEY'}
        component={screens.AddMoney}
        options={{
          headerTitle: '',
          headerShown: false
        }}
      />
      <Stack.Screen
        name={'FAQ'}
        component={screens.Faq}
        options={{
          headerTitle: "FAQ's",
        }}
      />
      <Stack.Screen
        name={'POST_DETAILS'}
        component={screens.PostDetails}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'ORDER_VALUE'}
        component={screens.OrderValue}
        options={{
          headerTitle: 'My Order Value',
        }}
      />
      <Stack.Screen
        name={'INVENTORY'}
        component={screens.Inventory}
        options={{
          headerTitle: 'Inventory',
        }}
      />

      <Stack.Screen
        name={'POST_INSIGHTS'}
        component={screens.PostInsights}
        options={{
          headerTitle: 'My Posts',
        }}
      />
      <Stack.Screen
        name={'COLLECTIONS'}
        component={screens.Collections}
        options={{
          headerTitle: 'Collections',
        }}
      />
      <Stack.Screen
        name={'OrderValueDetails'}
        component={screens.OrderValueDetails}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'SAVED_DRAFTS'}
        component={screens.SavedDrafts}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'DEACTIVATE_DELETE'}
        component={screens.DeleteAccount}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
