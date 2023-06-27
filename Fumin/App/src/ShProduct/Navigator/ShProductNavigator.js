import * as React from 'react';
import ShProductListPage from '../Page/ShProductListPage';
import ShProductAddPage from '../Page/ShProductAddPage';
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
const isAndroid = Platform.OS === 'android';
const Stack = createStackNavigator();

const ShProductListPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <ShProductListPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const ShProductAddPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <ShProductAddPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

export const ShProductInnerNavigator = ({initialRouteName}) => (
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
      name="ShProductListPage"
      component={ShProductListPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="ShProductAddPage"
      component={ShProductAddPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

const ShProductNavigator = ({initialRouteName}) => (
  <SafeAreaProvider>
    <NavigationContainer>
      {ShProductInnerNavigator({initialRouteName})}
    </NavigationContainer>
  </SafeAreaProvider>
);

export default ShProductNavigator;
