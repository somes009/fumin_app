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
const isAndroid = Platform.OS === 'android';
// navigator
// import {MagicInnerNavigator} from '../../Magic/Navigator/MagicNavigator';
import {LoginInnerNavigator} from '../Login/Navigator/LoginNavigator';
import {SingleManager} from '../../SingleManager/SingleManager';
// import {MsgNavigatorInner} from '../../Msg/Navigator/MsgNavigator';
import {IndexInnerNavigator} from '../Index/Navigator/IndexNavigator';
// import {useDarkMode} from 'react-native-dynamic';

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
      initialRouteName={'Today'}
      tabBarOptions={{
        showLabel: false,
      }}
      tabBar={(props) => <CustomTabbar {...props} />}>
      <Tab.Screen
        name="Grow"
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
        name="IndexNav"
        component={IndexInnerNavigator}
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
