/// <reference path="./android-ts-lib/types.d.ts" />
/// <reference path="./android-ts-lib/message-center.d.ts" />

import {AliasTagCallBackData, Common, InitOption} from './jiguang-push.common';
import * as application from 'tns-core-modules/application';

// import * as utils from "utils/utils";

export class JiguangPush extends Common {
    private static JPushMessage_SUCCESSS_CODE = 0;
    private static callbacks: {
        onNotificationReceived: (userInfo: { [p: string]: any }) => void;
        onNotificationOpened: (userInfo: { [p: string]: any }) => void;
        onNotificationClickedAction: (userInfo: { [p: string]: any }) => void;
        onConnectionChange: (userInfo: { [p: string]: any }) => void;
        onRegistration: (userInfo: { [p: string]: any }) => void;
        onMessageReceived: (userInfo: { [p: string]: any }) => void
    };

    /**
     * 默认的JPush事件回调处理。
     */
    private static _defaultAdCallbacks = {
        /**
         * SDK 向 JPush Server 注册所得到的注册 ID。
         * @param userInfo
         */
        onRegistration: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            let registrationId: string = userInfo[api.EXTRA_REGISTRATION_ID];
            console.log("new Registraction id is:" + registrationId);
        },
        /**
         * 接受到了自定义消息 Push
         * @param userInfo
         */
        onMessageReceived: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            // 唯一标识消息的 ID EXTRA_MSG_ID
            let logData = {
                title: userInfo[api.EXTRA_TITLE],
                msg: userInfo[api.EXTRA_MESSAGE],
                extraJson: userInfo[api.EXTRA_EXTRA],
                msgId: userInfo[api.EXTRA_MSG_ID]
            };
            console.log("接受到自定义消息");
            console.dir(logData);
        },
        /**
         * 收到了通知 Push。
         *
         * 如果消息内容为空，不会在通知栏上展示。但是此在接口中还是可以获取其它信息的。
         * @param userInfo
         */
        onNotificationReceived: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            // 唯一标识消息的 ID EXTRA_MSG_ID

            let logData = {
                title: userInfo[api.EXTRA_NOTIFICATION_TITLE], // 保存服务器推送下来的通知的标题。
                content: userInfo[api.EXTRA_ALERT], // 对应 Portal 推送通知界面上的“通知内容”字段。
                extraJson: userInfo[api.EXTRA_EXTRA], // 保存服务器推送下来的附加字段。这是个 JSON 字符串。
                msgId: userInfo[api.EXTRA_MSG_ID], // 唯一标识调整消息的 ID，可用于上报统计等。
                notificationId: userInfo[api.EXTRA_NOTIFICATION_ID], // 通知栏的 Notification ID，可以用于清除 Notification
                htmlPath: userInfo[api.EXTRA_RICHPUSH_HTML_PATH], // 富媒体通知推送下载的 HTML 的文件路径，用于展现 WebView。
                htmlRes: userInfo[api.EXTRA_RICHPUSH_HTML_RES], // 富媒体通知推送下载的图片资源的文件名，多个文件名用 “，” 分开。
                                                                // 与 “JPushInterface.EXTRA_RICHPUSH_HTML_PATH” 位于同一个路径。
                bigText: userInfo[api.EXTRA_BIG_TEXT], // 大文本通知样式中大文本的内容。
                bigPicPath: userInfo[api.EXTRA_BIG_PIC_PATH], // 大图片通知样式中大图片的路径/地址。可支持本地图片的路径，或者填网络图片地址。
                inboxJson: userInfo[api.EXTRA_INBOX], // 收件箱通知样式中收件箱的内容。json 的每个 key 对应的 value 会被当作文本条目逐条展示。
                priority: userInfo[api.EXTRA_NOTI_PRIORITY], // 通知的优先级。默认为 0，范围为 -2～2，其他值将会被忽略而采用默认。
                category: userInfo[api.EXTRA_NOTI_CATEGORY], // 通知分类。完全依赖 rom 厂商对每个 category 的处理策略，比如通知栏的排序。
            };
            console.log("接受到通知消息");
            console.dir(logData);
        },
        /**
         * 用户点击了通知。 一般情况下，用户不需要配置此 receiver action。
         * 如果开发者在 AndroidManifest.xml 里未配置此 receiver action，
         *   那么，SDK 会默认打开应用程序的主 Activity，相当于用户点击桌面图标的效果。

         * 如果开发者在 AndroidManifest.xml 里配置了此 receiver action，
         *   那么，当用户点击通知时，SDK 不会做动作。
         *   开发者应该在自己写的 BroadcastReceiver 类里处理，比如打开某 Activity 。
         *
         * @param userInfo
         */
        onNotificationOpened: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            // 唯一标识消息的 ID EXTRA_MSG_ID

            let logData = {
                title: userInfo[api.EXTRA_NOTIFICATION_TITLE], // 保存服务器推送下来的通知的标题。
                content: userInfo[api.EXTRA_ALERT], // 对应 Portal 推送通知界面上的“通知内容”字段。
                extraJson: userInfo[api.EXTRA_EXTRA], // 保存服务器推送下来的附加字段。这是个 JSON 字符串。
                msgId: userInfo[api.EXTRA_MSG_ID], // 唯一标识调整消息的 ID，可用于上报统计等。
                notificationId: userInfo[api.EXTRA_NOTIFICATION_ID], // 通知栏的 Notification ID，可以用于清除 Notification
            };
            console.log("用户打开消息通知");
            console.dir(logData);
        },
        /**用户点击了通知栏中自定义的按钮。（SDK 3.0.0 以上版本支持）
         * 使用普通通知的开发者不需要配置此 receiver action。
         *  只有开发者使用了 MultiActionsNotificationBuilder 构建携带按钮的通知栏的通知时，
         *  可通过该 action 捕获到用户点击通知栏按钮的操作，并自行处理。
         *
         * @param userInfo
         */
        onNotificationClickedAction: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            // 唯一标识消息的 ID EXTRA_MSG_ID

            let logData = {
                actionExtra: userInfo[api.EXTRA_NOTIFICATION_ACTION_EXTRA], // 获取通知栏按钮点击事件携带的附加信息。对应使用 MultiActionsNotificationBuilder.addJPushAction 添加的按钮信息。
            };
            console.log("用户点击了通知栏按键");
            console.dir(logData);
        },
        /**
         *JPush 服务的连接状态发生变化。
         *
         * @param userInfo
         */
        onConnectionChange: function (userInfo: { [key: string]: any }): void {
            let api = cn.jpush.android.api.JPushInterface;
            // 唯一标识消息的 ID EXTRA_MSG_ID

            let logData = {
                connected: userInfo[api.EXTRA_CONNECTION_CHANGE], // 获取当前 JPush 服务的连接状态。
            };
            console.dir(logData, "JPush当前的连接状态 ");
        }
    };

    /**
     * 获取SDK版本号
     */
    public static getVersion(): string {
        return "3.1.8";
    }

    /**
     * 初始化sdk
     */
    public static init(options: InitOption): void {
        // 初始化监听对象
        this.callbacks = Object.assign({}, this._defaultAdCallbacks, options.callbacks);
        this.initMessageReceiver();

        // 初始化连接
        cn.jpush.android.api.JPushInterface.init(application.android.context);
    }

    private static initMessageReceiver(): void {
        let MSG_CONTS = com.github.ayongw.jpushreceiver.JPushMessageCenterConts;
        let messageCenter = com.github.ayongw.simplemessagecenter.SimpleMessageCenter.getDefaultCenter();
        let api = cn.jpush.android.api.JPushInterface;

        // 用户操作消息监听
        let messageObserver = new com.github.ayongw.simplemessagecenter.SimpleMessageObserver({
            onMessage(message: com.github.ayongw.simplemessagecenter.SimpleMessage): void {
                let userInfo = message.getUserInfo();
                let seq = userInfo.get(MSG_CONTS.FIELD_SEQUENCE);

                // let callbackData: AliasTagsCallbackData = userInfo;

                let callbackData: AliasTagCallBackData = Object.assign(new AliasTagCallBackData(), userInfo);
                JiguangPush.callAliasTagCallback(seq, callbackData);
            }
        });

        let operateHolder = MSG_CONTS.OPERATE_MESSAGE_HOLDER;
        messageCenter.removeAllObserver(MSG_CONTS.MSG_ON_ALIAS_OPERATOR_RESULT, operateHolder);
        messageCenter.removeAllObserver(MSG_CONTS.MSG_ON_CHECK_TAG_OPERATOR_RESULT, operateHolder);
        messageCenter.removeAllObserver(MSG_CONTS.MSG_ON_MOBILE_NUMBER_OPERATOR_RESULT, operateHolder);
        messageCenter.removeAllObserver(MSG_CONTS.MSG_ON_TAG_OPERATOR_RESULT, operateHolder);

        messageCenter.addObserver(MSG_CONTS.MSG_ON_ALIAS_OPERATOR_RESULT, operateHolder, messageObserver);
        messageCenter.addObserver(MSG_CONTS.MSG_ON_CHECK_TAG_OPERATOR_RESULT, operateHolder, messageObserver);
        messageCenter.addObserver(MSG_CONTS.MSG_ON_MOBILE_NUMBER_OPERATOR_RESULT, operateHolder, messageObserver);
        messageCenter.addObserver(MSG_CONTS.MSG_ON_TAG_OPERATOR_RESULT, operateHolder, messageObserver);


        let msgNameOnRegistration = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_REGISTRATION_ID;
        let msgNameOnConnectionChange = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_CONNECTION_CHANGE;
        let msgNameOnNotificationReceived = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_NOTIFICATION_RECEIVED;
        let msgNameOnNotificationOpened = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_NOTIFICATION_OPENED;
        let msgNameOnNotificationClicked = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_NOTIFICATION_CLICK_ACTION;
        let msgNameOnMessageReceived = MSG_CONTS.MSG_ON_JPUSH_ACTION_PREFIX + api.ACTION_MESSAGE_RECEIVED;

        // JPush核心接口消息监听
        let coreApiObserver = new com.github.ayongw.simplemessagecenter.SimpleMessageObserver({
            onMessage(message: com.github.ayongw.simplemessagecenter.SimpleMessage): void {
                let msgName = message.getName();
                let userInfo = message.getUserInfo();
                console.log("接收到消息：" + msgName);

                if (msgNameOnRegistration === msgName) {
                    JiguangPush.callbacks.onRegistration(userInfo);
                } else if (msgNameOnConnectionChange === msgName) {
                    JiguangPush.callbacks.onConnectionChange(userInfo);
                } else if (msgNameOnNotificationReceived === msgName) {
                    JiguangPush.callbacks.onNotificationReceived(userInfo);
                } else if (msgNameOnNotificationOpened === msgName) {
                    JiguangPush.callbacks.onNotificationOpened(userInfo);
                } else if (msgNameOnNotificationClicked === msgName) {
                    JiguangPush.callbacks.onNotificationClickedAction(userInfo);
                } else if (msgNameOnMessageReceived === msgName) {
                    JiguangPush.callbacks.onMessageReceived(userInfo);
                } else {
                    console.dir(userInfo, "未支持的消息类型");
                }
            }
        });
        let apiHolder = MSG_CONTS.JPUSH_API_MESSAGE_HOLDER;

        messageCenter.removeAllObserver(msgNameOnRegistration, apiHolder);
        messageCenter.removeAllObserver(msgNameOnConnectionChange, apiHolder);
        messageCenter.removeAllObserver(msgNameOnNotificationReceived, apiHolder);
        messageCenter.removeAllObserver(msgNameOnNotificationOpened, apiHolder);
        messageCenter.removeAllObserver(msgNameOnNotificationClicked, apiHolder);
        messageCenter.removeAllObserver(msgNameOnMessageReceived, apiHolder);

        messageCenter.addObserver(msgNameOnRegistration, apiHolder, coreApiObserver);
        messageCenter.addObserver(msgNameOnConnectionChange, apiHolder, coreApiObserver);
        messageCenter.addObserver(msgNameOnNotificationReceived, apiHolder, coreApiObserver);
        messageCenter.addObserver(msgNameOnNotificationOpened, apiHolder, coreApiObserver);
        messageCenter.addObserver(msgNameOnNotificationClicked, apiHolder, coreApiObserver);
        messageCenter.addObserver(msgNameOnMessageReceived, apiHolder, coreApiObserver);
    }


    /**
     * 获取别名
     */
    public static getAlias(): Promise<AliasTagCallBackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagCallBackData>((resolve, reject) => {
            JiguangPush.addAliasTagCallback(sequence, (respData: AliasTagCallBackData) => {
                resolve(respData);
                JiguangPush.removeAliasTagCallback(sequence);
            });

            cn.jpush.android.api.JPushInterface.getAlias(application.android.context, sequence);
        });
    }

    /**
     * 设置别名
     * @param alias 新的别名
     */
    public static setAlias(alias: string): Promise<AliasTagCallBackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagCallBackData>((resolve, reject) => {
            JiguangPush.addAliasTagCallback(sequence, (respData: AliasTagCallBackData) => {
                resolve(respData);
                JiguangPush.removeAliasTagCallback(sequence);
            });

            cn.jpush.android.api.JPushInterface.setAlias(application.android.context, sequence, alias);
        });
    }

    /**
     * 删除别名
     */
    public static deleteAlias(): Promise<AliasTagCallBackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagCallBackData>((resolve, reject) => {
            JiguangPush.addAliasTagCallback(sequence, (respData: AliasTagCallBackData) => {
                resolve(respData);
                JiguangPush.removeAliasTagCallback(sequence);
            });

            cn.jpush.android.api.JPushInterface.deleteAlias(application.android.context, sequence);
        });
    }

}
