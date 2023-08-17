package com.fumin;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.beizi.fusion.FullScreenVideoAd;
import com.beizi.fusion.FullScreenVideoAdListener;

public class TestActivity extends AppCompatActivity{
    private static final String TAG = "FullScreenVideoActivity";
    private FullScreenVideoAd mFullScreenVideoAd;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        @SuppressLint({"MissingInflatedId", "LocalSuppress"}) Button bt_full = (Button) findViewById(R.id.bt_full_screen);
        bt_full.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //同一个FullScreenVideoAd对象，假如调用多次，建议先释放资源
                if (mFullScreenVideoAd != null) {
                    mFullScreenVideoAd.destroy();
                    mFullScreenVideoAd = null;
                }

                //加载全屏视频广告
                loadAd();
            }
        });
    }

    private void loadAd() {
        /**
         * context 必须传入 Activity类型
         */
        mFullScreenVideoAd = new FullScreenVideoAd(this, "103225",
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
//                        Toast.makeText(FullScreenVideoActivity.this, R.string.load_ad_success,
//                                Toast.LENGTH_LONG).show();
                        if (mFullScreenVideoAd != null && mFullScreenVideoAd.isLoaded()) {
                            //广告展示需要传入Activity类型
                            mFullScreenVideoAd.showAd(TestActivity.this);
                        }
                    }

                    @Override
                    public void onAdShown() {
                        Log.i("BeiZisDemo", TAG + " onAdShown");
                    }

                    @Override
                    public void onAdClosed() {
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

    @Override
    protected void onDestroy() {
        if (mFullScreenVideoAd != null) {
            mFullScreenVideoAd.destroy();
        }
        super.onDestroy();
    }
}