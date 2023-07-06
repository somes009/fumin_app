import * as React from 'react';
import {Image, Platform} from 'react-native';
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import Images from '../../Images';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';
import {
  TransitionSpecs,
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import ShShopIndexPage from '../ShShop/Page/ShShopIndexPage';
import ShMineIndexPage from '../ShMine/Page/ShMineIndexPage';
import ShProductListPage from '../ShProduct/Page/ShProductListPage';
import ShOrderIndexPage from '../ShOrder/Page/ShOrderIndexPage';
const isAndroid = Platform.OS === 'android';
import {SingleManager} from '../../SingleManager/SingleManager';
// navigator
import {LoginInnerNavigator} from '../Login/Navigator/LoginNavigator';
import {ShMineInnerNavigator} from '../ShMine/Navigator/ShMineNavigator';
import {ShShopInnerNavigator} from '../ShShop/Navigator/ShShopNavigator';
import {ShProductInnerNavigator} from '../ShProduct/Navigator/ShProductNavigator';
import {ShOrderInnerNavigator} from '../ShOrder/Navigator/ShOrderNavigator';

import CustomTabbar from './CustomTabbar';

import AppStore, {setTabFocused} from '../../Store/AppStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShShopIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <ShShopIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const ShMineIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <ShMineIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const ShProductListPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <ShProductListPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const ShOrderIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <ShOrderIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};

const HomeTabsWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  AppStore.isTabFocused = isFocused;
  setTabFocused(isFocused);
  return (
    <HomeTabs
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'Index'}
      tabBarOptions={{
        showLabel: false,
      }}
      tabBar={(props) => <CustomTabbar {...props} />}>
      <Tab.Screen
        name="ShShop"
        component={ShShopIndexPageWithNavigation}
        options={{
          showLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                resizeMode="contain"
                source={focused ? Images.tab5focus : Images.tab5}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ShProduct"
        component={ShProductListPageWithNavigation}
        options={{
          showLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                resizeMode="contain"
                source={focused ? Images.tab5focus : Images.tab5}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ShOrder"
        component={ShOrderIndexPageWithNavigation}
        options={{
          showLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                resizeMode="contain"
                source={focused ? Images.tab5focus : Images.tab5}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ShMine"
        component={ShMineIndexPageWithNavigation}
        options={{
          showLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                resizeMode="contain"
                source={focused ? Images.tab5focus : Images.tab5}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const TabNavigatorInner = ({initialRouteName}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        cardStyleInterpolator: isAndroid
          ? CardStyleInterpolators.forScaleFromCenterAndroid
          : CardStyleInterpolators.forScaleFromCenterAndroid,
        cardOverlayEnabled: true,
        transitionConfig: () => ({
          ...TransitionSpecs.TransitionIOSSpec,
        }),
      }}>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsWithNavigation}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShShopNav"
        component={ShShopInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShProductNav"
        component={ShProductInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShOrderNav"
        component={ShOrderInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShMineNav"
        component={ShMineInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="LoginNav"
        component={LoginInnerNavigator}
        options={{
          header: () => null,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = ({initialRouteName}) => {
  const navigationRef = React.useRef(null);
  global.navigationRef = navigationRef;
  return (
    // <View style={{flex: 1}}>
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        {TabNavigatorInner({initialRouteName})}
      </NavigationContainer>
    </SafeAreaProvider>
    // </View>
  );
};

export default TabNavigator;
