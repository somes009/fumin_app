import * as React from 'react';
import MineIndexPage from '../Page/MineIndexPage';
import MineOrderPage from '../Page/MineOrderPage';
import MineFansPage from '../Page/MineFansPage';
import MineSetUpPage from '../Page/MineSetUpPage';
import MineOrderScorePage from '../Page/MineOrderScorePage';
import MinePlaceListPage from '../Page/MinePlaceListPage';
import MineShopPage from '../Page/MineShopPage';
import MineContributeScorePage from '../Page/MineContributeScorePage';
import MineCartPage from '../Page/MineCartPage';
import MineCreatePlacePage from '../Page/MineCreatePlacePage';
import MineFuDouPage from '../Page/MineFuDouPage';
import MineHongBaoPage from '../Page/MineHongBaoPage';
import MineHongBaoJinPage from '../Page/MineHongBaoJinPage';
import MineOrderDetailPage from '../Page/MineOrderDetailPage';
import MineApplyLSPage from '../Page/MineApplyLSPage';
import MineApplyJLPage from '../Page/MineApplyJLPage';
import MinebindInfoPage from '../Page/MinebindInfoPage';
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

const MineIndexPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineIndexPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineOrderPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineOrderPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineFansPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineFansPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineSetUpPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineSetUpPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineOrderScorePageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineOrderScorePage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MinePlaceListPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MinePlaceListPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineShopPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineShopPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineContributeScorePageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineContributeScorePage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineCartPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineCartPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineCreatePlacePageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineCreatePlacePage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineFuDouPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineFuDouPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineHongBaoPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineHongBaoPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineHongBaoJinPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineHongBaoJinPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineOrderDetailPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineOrderDetailPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineApplyLSPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineApplyLSPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MineApplyJLPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MineApplyJLPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};
const MinebindInfoPageWithNavigation = (props) => {
  const isFocused = useIsFocused();
  const routesLength = useNavigationState((state) => state.routes.length);
  const insets = useSafeAreaInsets();
  return (
    <MinebindInfoPage
      {...props}
      routesLength={routesLength}
      safeAreaInsets={insets}
      isFocused={isFocused}
    />
  );
};

export const MineInnerNavigator = ({initialRouteName}) => (
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
      name="MineIndexPage"
      component={MineIndexPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineOrderPage"
      component={MineOrderPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineFansPage"
      component={MineFansPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineSetUpPage"
      component={MineSetUpPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineOrderScorePage"
      component={MineOrderScorePageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MinePlaceListPage"
      component={MinePlaceListPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineShopPage"
      component={MineShopPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineContributeScorePage"
      component={MineContributeScorePageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineCartPage"
      component={MineCartPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineCreatePlacePage"
      component={MineCreatePlacePageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineFuDouPage"
      component={MineFuDouPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineHongBaoPage"
      component={MineHongBaoPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineHongBaoJinPage"
      component={MineHongBaoJinPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineOrderDetailPage"
      component={MineOrderDetailPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineApplyLSPage"
      component={MineApplyLSPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MineApplyJLPage"
      component={MineApplyJLPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="MinebindInfoPage"
      component={MinebindInfoPageWithNavigation}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

const MineNavigator = ({initialRouteName}) => (
  <SafeAreaProvider>
    <NavigationContainer>
      {MineInnerNavigator({initialRouteName})}
    </NavigationContainer>
  </SafeAreaProvider>
);

export default MineNavigator;
