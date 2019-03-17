/// <reference path="./android-ts-lib/types.d.ts" />

import {Common, InitOption} from './jiguang-push.common';
import * as application from 'tns-core-modules/application';
// import * as utils from "utils/utils";

// import {JPush} from './android-ts-lib/types';

export class MessagerReceiverCallback {
    aliaTagsCallBacks: { [key: number]: any };

    constructor(callbacks: { [key: number]: any }) {
        this.aliaTagsCallBacks = callbacks;
    }

    public onMessage(context: android.content.Context, intent: android.content.Intent): void {
        // TODO 收到消息的处理

    }

}

/**
 * 操作标签、别名时的回调参数封装对象
 */
export class AliasTagsCallbackData {
    respCode: string;
    seq: number;
    alias: string;
    checkTag: string;
    mobileNumber: string;
    tagCheckStateResult: boolean;
    tags: string[];
}

export class JiguangPush extends Common {
    private static JPushMessage_SUCCESSS_CODE = 0;

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
        cn.jpush.android.api.JPushInterface.init(application.android.context);
    }

    private initReceiver(): void {
        
        let callback = (context: globalAndroid.content.Context, intent: globalAndroid.content.Intent) => {

        };
        
        application.android.registerBroadcastReceiver("cn.jpush.android.intent.RECEIVE_MESSAGE", callback);
        
        
    }


    /**
     * 获取别名
     */
    public static getAlias(): Promise<AliasTagsCallbackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagsCallbackData>((resolve, reject) => {
            com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver
                .addSeqCallback(sequence, (respData: AliasTagsCallbackData) => {
                    resolve(respData);
                });

            cn.jpush.android.api.JPushInterface.getAlias(application.android.context, sequence);
        });
    }

    /**
     * 设置别名
     * @param alias 新的别名
     */
    public static setAlias(alias: string): Promise<AliasTagsCallbackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagsCallbackData>((resolve, reject) => {
            com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver
                .addSeqCallback(sequence, (respData: AliasTagsCallbackData) => {
                    resolve(respData);
                });

            cn.jpush.android.api.JPushInterface.setAlias(application.android.context, sequence, alias);
        });
    }

    /**
     * 删除别名
     */
    public static deleteAlias(): Promise<AliasTagsCallbackData> {
        let sequence = this.nextSequence();

        return new Promise<AliasTagsCallbackData>((resolve, reject) => {
            com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver
                .addSeqCallback(sequence, (respData: AliasTagsCallbackData) => {
                    resolve(respData);
                });

            cn.jpush.android.api.JPushInterface.deleteAlias(application.android.context, sequence);
        });
    }

}
