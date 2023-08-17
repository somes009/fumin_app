import * as React from 'react';
import {Platform} from 'react-native';
import {
  NavigationContainer,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionSpecs, CardStyleInterpolators} from '@react-navigation/stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoginIndexPage from '../Page/LoginIndexPage';
import LoginSignInPage from '../Page//LoginSignInPage';
import LoginYinsiPage from '../Page//LoginYinsiPage';
import LoginLogoutPage from '../Page//LoginLogoutPage';
import LoginFindMmPage from '../Page//LoginFindMmPage';

const isAndroid = Platform.OS === 'android';
const Stack = createStackNavigator();

const LoginIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <LoginIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const LoginSignInPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <LoginSignInPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const LoginYinsiPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <LoginYinsiPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const LoginLogoutPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <LoginLogoutPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const LoginFindMmPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <LoginFindMmPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

export const LoginInnerNavigator = ({initialRouteName}) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={{
      cardStyleInterpolator: isAndroid
        ? CardStyleInterpolators.forScaleFromCenterAndroid
        : CardStyleInterpolators.forScaleFromCenterAndroid,
      cardOverlayEnabled: true,
      transitionConfig: () => ({
        // 只要修改最后的forVertical就可以实现不同的动画了。
        ...TransitionSpecs.TransitionIOSSpec,
      }),
    }}>
    <Stack.Screen
      name="LoginIndexPage"
      component={LoginIndexPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LoginSignInPage"
      component={LoginSignInPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LoginYinsiPage"
      component={LoginYinsiPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LoginLogoutPage"
      component={LoginLogoutPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LoginFindMmPage"
      component={LoginFindMmPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

const LoginNavigator = ({initialRouteName}) => (
  <SafeAreaProvider>
    <NavigationContainer>
      {LoginInnerNavigator({initialRouteName})}
    </NavigationContainer>
  </SafeAreaProvider>
);

export default LoginNavigator;
