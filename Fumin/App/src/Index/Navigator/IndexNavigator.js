import * as React from 'react';
import IndexPage from '../Page/IndexPage';
import ShopDetailPage from '../Page/ShopDetailPage';
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

const IndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <IndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const ShopDetailPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <ShopDetailPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

export const IndexInnerNavigator = ({initialRouteName}) => (
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
      name="IndexPage"
      component={IndexPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="ShopDetailPage"
      component={ShopDetailPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

const IndexNavigator = ({initialRouteName}) => (
  <SafeAreaProvider>
    <NavigationContainer>
      {IndexInnerNavigator({initialRouteName})}
    </NavigationContainer>
  </SafeAreaProvider>
);

export default IndexNavigator;
