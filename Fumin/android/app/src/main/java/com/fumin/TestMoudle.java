package com.fumin;

import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.MediatorLiveData;

import com.beizi.fusion.FullScreenVideoAd;
import com.beizi.fusion.FullScreenVideoAdListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class TestMoudle extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private ReactApplicationContext mContext;
    private static final String TAG = "FullScreenVideoActivity";
    static int type=0;
    static int sn=0;
    public TestMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        //rn代码需要这个名字来调用该类的方法
        return "TestMoudle";
    }
    
    public static void sendEventToRn(String eventName, @Nullable WritableMap param)
    {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, param);
    }

    private FullScreenVideoAd mFullScreenVideoAd;
    //函数不能有返回值，因为被调用的原生代码是异步的；原生代码执行结束之后只能通过回调函数或者发送消息给rn侧
    @ReactMethod
    public void fullScreenVideo(int rntype,int rnsn) {
        Log.i("BeiZisDemo===>begin", rntype + " ====>"+rnsn);
        type=rntype;
        sn=rnsn;
        //同一个FullScreenVideoAd对象，假如调用多次，建议先释放资源
        if (mFullScreenVideoAd != null) {
            mFullScreenVideoAd.destroy();
            mFullScreenVideoAd = null;
        }

        //加载全屏视频广告
        loadAd();
    }
    //退出页面的时候 销毁sdk
    @ReactMethod
    public void destoryVideo() {
        type=0;
        sn=0;
        if (mFullScreenVideoAd != null) {
            mFullScreenVideoAd.destroy();
        }
    }
    private void loadAd() {
        /**
         * context 必须传入 Activity类型
         */
        mFullScreenVideoAd = new FullScreenVideoAd(mContext.getCurrentActivity(), "103225",
                new FullScreenVideoAdListener() {
                    @Override
                    public void onAdFailed(int code) {
                        Log.i("BeiZisDemo", TAG + " onAdFailed " + code);
//                        Toast.makeText(FullScreenVideoActivity.this, R.string.load_ad_successd_fail,
//                                Toast.LENGTH_LONG).show();
                    }

                    @Override
                    public void onAdLoaded() {
                        Log.i("BeiZisDemo", TAG + " onAdLoaded");
                        if (mFullScreenVideoAd != null && mFullScreenVideoAd.isLoaded()) {
                            //广告展示需要传入Activity类型
                            mFullScreenVideoAd.showAd(mContext.getCurrentActivity());
                        }
                    }

                    @Override
                    public void onAdShown() {
                        Log.i("BeiZisDemo", TAG + " onAdShown");
                    }

                    @Override
                    public void onAdClosed() {
                        VideoBean videoBean = new VideoBean();
                        videoBean.setType(type);
                        videoBean.setSn(sn);
                        Log.i("BeiZisDemo===>finish", type + " ====>"+sn);
                        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("showFinish", type+"="+sn);

                        Log.i("BeiZisDemo", TAG + " onAdClosed");
                    }

                    @Override
                    public void onAdClick() {
                        Log.i("BeiZisDemo", TAG + " onAdClick");
                    }
                }, 10000);

        //广告版本：1表示平台模板；2表示平台模板2.0
        mFullScreenVideoAd.setAdVersion(1);

        //加载广告
        mFullScreenVideoAd.loadAd();
    }
}
