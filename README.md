# NativeScript Jiguang push plugin ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)
    

## (Optional) Prerequisites / Requirements

NO

## Installation

```bash
$ tns plugin add nativescript-urlhandler
```

need to config the android receiver

```xml
<application>
    <!--JPush api核心消息接受器-->
    <receiver android:name="com.github.ayongw.jpushreceiver.MessageCenterJPushApiReceiver"
              android:exported="false"
              android:enabled="true">
        <intent-filter>
            <action android:name="cn.jpush.android.intent.REGISTRATION" /> <!--Required  用户注册SDK的intent-->
            <action android:name="cn.jpush.android.intent.MESSAGE_RECEIVED" /> <!--Required  用户接收SDK消息的intent-->
            <action android:name="cn.jpush.android.intent.NOTIFICATION_RECEIVED" /> <!--Required  用户接收SDK通知栏信息的intent-->
            <action android:name="cn.jpush.android.intent.NOTIFICATION_OPENED" /> <!--Required  用户打开自定义通知栏的intent-->
            <action android:name="cn.jpush.android.intent.CONNECTION" /><!-- 接收网络变化 连接/断开 since 1.6.3 -->

            <category android:name="__PACKAGE__" />
        </intent-filter>
    </receiver>

    <!--用于接收种操作返回-->
    <receiver android:name="com.github.ayongw.jpushreceiver.MessageCenterJPushOperateMessageReceiver">
        <intent-filter>
            <action android:name="cn.jpush.android.intent.RECEIVE_MESSAGE" />

            <category android:name="__PACKAGE__" />
        </intent-filter>
    </receiver>
</application>
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.

```javascript
Usage code snippets here
```

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

Apache License Version 2.0, January 2004
