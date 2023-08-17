package com.fumin;

import android.app.Application;
import android.content.Context;

import com.beizi.fusion.BeiZiCustomController;
import com.beizi.fusion.BeiZis;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.theweflex.react.WeChatPackage;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import cn.reactnative.httpcache.HttpCachePackage;

public class MainApplication extends Application implements ReactApplication{


  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
             packages.add(new MyReactPackage());
             packages.add(new WeChatPackage());
            return packages;
//            return Arrays.<ReactPackage>asList(
//                    new MainReactPackage(),
//                    new MyReactPackage()
//            );
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      initBeiZi();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.fumin.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
  public void initBeiZi(){

      //建议开发者在此处调用初始化的方法，且此方法只需要一次调用
//        BeiZis.init(this,"20159");
      //如无需控制sdk对敏感权限的使用，建议使用不带BeiZiCustomController参数的初始化方法 自定义广告测试时使用20681  其它类型广告测试的时候使用20159
      BeiZis.init(this, "20159", new BeiZiCustomController() {
          /**
           * 是否允许SDK主动使用地理位置信息
           *
           * @return true可以获取，false禁止获取。默认为true
           */
          @Override
          public boolean isCanUseLocation() {
              return true;
          }

          /**
           * 是否允许SDK主动使用ACCESS_WIFI_STATE权限
           *
           * @return true可以使用，false禁止使用。默认为true
           */
          @Override
          public boolean isCanUseWifiState() {
              return true;
          }

          /**
           * 是否允许SDK主动使用手机硬件参数，如：imei，imsi
           *
           * @return true可以使用，false禁止使用。默认为true
           */
          @Override
          public boolean isCanUsePhoneState() {
              return true;
          }

          /**
           * 是否能使用Oaid
           *
           * @return true可以使用，false禁止使用。默认为true
           */
          @Override
          public boolean isCanUseOaid() {
              return true;
          }

          /**
           * 是否能使用Gaid
           *
           * @return true可以使用，false禁止使用。默认为true
           */
          @Override
          public boolean isCanUseGaid() {
              return true;
          }
      });
  }
}
