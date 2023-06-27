import * as React from 'react';
import ShShopIndexPage from '../Page/ShShopIndexPage';
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

const ShShopIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <ShShopIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

export const ShShopInnerNavigator = ({initialRouteName}) => (
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
      name="ShShopIndexPage"
      component={ShShopIndexPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

const ShShopNavigator = ({initialRouteName}) => (
  <SafeAreaProvider>
    <NavigationContainer>
      {ShShopInnerNavigator({initialRouteName})}
    </NavigationContainer>
  </SafeAreaProvider>
);

export default ShShopNavigator;
