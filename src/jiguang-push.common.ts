// import * as app from 'tns-core-modules/application';
// import * as dialogs from 'tns-core-modules/ui/dialogs';
/**
 * 用户进行别名、标签操作后返回的参数
 */
export class AliasTagCallBackData {
    /**
     * 对应操作的返回码，0 为成功，其他返回码请参考错误码定义。
     */
    errorCode: number;
    /**
     * 开发者调用接口时传入的 sequence，
     * 通过该 sequence 开发者可以从开发者自己缓存中获取到对应的操作。
     */
    sequence: number;
    /**
     * 开发者传或查询得到的 alias。
     */
    alias?: string;
    /**
     * 开发者传或查询得到的 tags。
     */
    tags?: string[];
    /**
     * 开发者想要查询的 tag 与当前用户绑定的状态。
     */
    tagCheckStateResult?: boolean;
    /**
     * 开发者想要查询绑定状态的 tag。
     */
    checkTag?: string;
    /**
     * 开发者调用设置接口时传入的手机号码。
     */
    mobileNumber?: string;
}


export class Common {
    private static apiSeq: number = 0;

    private static aliasTagCallbacks: { [key: number]: any } = {};

    /**
     * 获取当前请求序列号
     */
    static getSequence(): number {
        return Common.apiSeq;
    }

    /**
     * 获取下一个请求序列号
     */
    static nextSequence(): number {
        return ++Common.apiSeq;
    }

    /**
     * 注册操作的回调函数，
     *
     * 注册后，需要在回调方法中的第一行进行回调函数删除
     * @param sequence  开发者调用接口时传入的 sequence，
     * @param callback 对应的请求sequence的回调函数
     */
    static addAliasTagCallback(sequence: number, callback: (respData: AliasTagCallBackData) => void): void {
        this.aliasTagCallbacks[sequence] = callback;
    }

    /**
     * 移除指定请求序列对应的回调。
     *
     * @param sequence 开发者调用接口时传入的 sequence，
     */
    static removeAliasTagCallback(sequence: number): void {
        delete this.aliasTagCallbacks[sequence];
    }

    /**
     * 调用指定回调函数
     * @param sequence 请求序列
     * @param respData 返回值
     */
    static callAliasTagCallback(sequence: number, respData: AliasTagCallBackData) {
        this.aliasTagCallbacks[sequence](respData);
    }
}

/**
 * Jpush sdk 初始化参数
 */
export class InitOption {
    badge?: boolean;
    sound?: boolean;
    alert?: boolean;
    clearBadge?: boolean;

    callbacks?: {
        /**
         * SDK 向 JPush Server 注册所得到的注册 ID。
         * @param userInfo
         */
        onRegistration?: (userInfo: { [p: string]: any }) => void;
        /**
         * 接受到了自定义消息 Push
         * @param userInfo
         */
        onMessageReceived?: (userInfo: { [p: string]: any }) => void;
        /**
         * 收到了通知 Push。
         *
         * 如果消息内容为空，不会在通知栏上展示。但是此在接口中还是可以获取其它信息的。
         * @param userInfo
         */
        onNotificationReceived?: (userInfo: { [p: string]: any }) => void;
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
        onNotificationOpened?: (userInfo: { [p: string]: any }) => void;
        /**
         * 用户点击了通知栏中自定义的按钮。（SDK 3.0.0 以上版本支持）
         * 使用普通通知的开发者不需要配置此 receiver action。
         *  只有开发者使用了 MultiActionsNotificationBuilder 构建携带按钮的通知栏的通知时，
         *  可通过该 action 捕获到用户点击通知栏按钮的操作，并自行处理。
         *
         * @param userInfo
         */
        onNotificationClickedAction?: (userInfo: { [p: string]: any }) => void;

        /**
         *JPush 服务的连接状态发生变化。
         *
         * @param userInfo
         */
        onConnectionChange?: (userInfo: { [p: string]: any }) => void;
    };
}
