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

import IndexPage from '../Index/Page/IndexPage';
import MineIndexPage from '../Mine/Page/MineIndexPage';
import ShopIndexPage from '../Shop/Page/ShopIndexPage';
import TaskIndexPage from '../Task/Page/TaskIndexPage';
const isAndroid = Platform.OS === 'android';
import {SingleManager} from '../../SingleManager/SingleManager';
// navigator
import {LoginInnerNavigator} from '../Login/Navigator/LoginNavigator';
import {MineInnerNavigator} from '../Mine/Navigator/MineNavigator';
import {IndexInnerNavigator} from '../Index/Navigator/IndexNavigator';
import {ShopInnerNavigator} from '../Shop/Navigator/ShopNavigator';
import {TaskInnerNavigator} from '../Task/Navigator/TaskNavigator';

import CustomTabbar from './CustomTabbar';

import AppStore, {setTabFocused} from '../../Store/AppStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const IndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <IndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const MineIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <MineIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const ShopIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <ShopIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
      tabBarHeight={tabBarHeight}
    />
  );
};
const TaskIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  // isFocused && Utils.showVideoBox(false);
  const tabBarHeight = useBottomTabBarHeight();
  SingleManager.tabHeight = tabBarHeight;
  return (
    <TaskIndexPage
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
        name="Index"
        component={IndexPageWithNavigation}
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
        name="Shop"
        component={ShopIndexPageWithNavigation}
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
        name="Task"
        component={TaskIndexPageWithNavigation}
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
        name="Mine"
        component={MineIndexPageWithNavigation}
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
        name="IndexNav"
        component={IndexInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ShopNav"
        component={ShopInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="TaskNav"
        component={TaskInnerNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MineNav"
        component={MineInnerNavigator}
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
