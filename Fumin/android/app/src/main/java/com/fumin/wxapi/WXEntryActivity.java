package com.fumin.wxapi;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.fumin.TestMoudle;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;


public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    private IWXAPI api = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        api = WXAPIFactory.createWXAPI(this, "wx4da22a07da9d5a7a");
        api.handleIntent(getIntent(), this);
    }

//    @Override
//    protected void onNewIntent(Intent intent) {
//
//        super.onNewIntent(intent);
//
//        setIntent(intent);
//
//        api.handleIntent(intent, this);
//    }

    @Override
    protected void onStart() {
        super.onStart();
        finish();
    }

    @Override
    // 微信请求应用的响应结果回调
    public void onReq(BaseReq baseReq) {

    }

 @Override
    public void onResp(BaseResp baseResp) {
        //得到code值,需要使用该值和后台交互*/
        switch (baseResp.errCode) {
            case BaseResp.ErrCode.ERR_OK://点击确认登录
                Log.i("wx_share","BaseResp.ErrCode.ERR_OK");
                //得到code值，需要使用该值和后台交
                 WritableMap map = Arguments.createMap();
                map.putString("wxinfo", JSON.toJSONString(baseResp));
                TestMoudle.sendEventToRn("ThirdLogin", map);
                //到底要不要加
                finish();
                break;

            case BaseResp.ErrCode.ERR_AUTH_DENIED://用户拒绝授权
                Log.i("wx_share","BaseResp.ErrCode.ERR_AUTH_DENIED:");
                finish();
                break;
            case BaseResp.ErrCode.ERR_USER_CANCEL://用户取消
                Log.i("wx_share","BaseResp.ErrCode.ERR_USER_CANCEL");
                finish();
                break;
            default:
                //点击的取消，根据自身业务处理
                Log.i("wx_share","default");
                finish();
                break;
        }
    }
}