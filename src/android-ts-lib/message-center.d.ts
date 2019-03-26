/*
消息中心想关的定义文件
 */

// com.github.ayongw.simplemessagecenter.SimpleMessageCenter

declare namespace com {
    export namespace github {
        export namespace ayongw {
            export namespace simplemessagecenter {
                export class SimpleMessage {
                    public static class: java.lang.Class<com.github.ayongw.simplemessagecenter.SimpleMessage>;

                    constructor();
                    constructor(name: string, holder: any, userInfo: Map<string, any>);

                    public getName(): string;

                    public setName(name: string): void;

                    public getHolder(): any;

                    public setHolder(holder: any): void;

                    public getUserInfo(): Map<string, any>;

                    public setUserInfo(userInfo: Map<string, any>): void;
                }

                export class SimpleMessageObserver {
                    public static class: java.lang.Class<com.github.ayongw.simplemessagecenter.SimpleMessageObserver>;

                    constructor();
                    public constructor(implementation: {
                        onMessage(message: SimpleMessage): void;
                    });
                }

                export class SimpleMessageCenter {
                    public static class: java.lang.Class<com.github.ayongw.simplemessagecenter.SimpleMessageCenter>;

                    /**
                     * 获取默认的消息中心
                     */
                    public static getDefaultCenter(): SimpleMessageCenter;

                    /**
                     * 添加消息监听对象
                     * @param msgName 消息名称
                     * @param holder 消息发送者标识
                     * @param observer 消息监听对象，用于算是消息的
                     * @return 消息监听对象id
                     */
                    public addObserver(msgName: string, holder: any, observer: SimpleMessageObserver): string;

                    /**
                     * 移除指定消息发送者下的消息监听对象
                     * @param msgName
                     * @param holder 消息发送者标识
                     * @param observerId 消息监听对象id
                     */
                    public removeObserver(msgName: string, holder: any, observerId: string): number;

                    /**
                     * 移除指定监听对象下、指定消息的所有的监听对象
                     * @param msgName
                     * @param holder 消息发送者标识
                     */
                    public removeAllObserver(msgName: string, holder: any): number;

                    /**
                     * 一次移除holder对象上的所有监听，但不支持移除全部（holder为null）
                     * @param holder  消息发送者标识
                     */
                    public removeObserversByHolder(holder: any): number;

                    /**
                     * 发送一个消息
                     * @param msgName
                     * @param holder 消息发送者标识
                     */
                    public postMessage(msgName: string, holder: any): number;

                    /**
                     * 发送一个消息，并附加用户信息
                     * @param msgName
                     * @param holder 消息发送者标识
                     * @param userInfo 附加的用户信息
                     */
                    public postMessage(msgName: string, holder: any, userInfo: Map<string, any>): number;
                }
            }

        }
    }
}


declare namespace com {
    export namespace github {
        export namespace ayongw {
            export namespace jpushreceiver {
                export class JPushMessageCenterConts {
                    public static class: java.lang.Class<com.github.ayongw.jpushreceiver.JPushMessageCenterConts>;

                    public static OPERATE_MESSAGE_HOLDER: string;
                    public static JPUSH_API_MESSAGE_HOLDER: string;


                    public static MSG_ON_TAG_OPERATOR_RESULT: string;
                    public static MSG_ON_CHECK_TAG_OPERATOR_RESULT: string;
                    public static MSG_ON_ALIAS_OPERATOR_RESULT: string;
                    public static MSG_ON_MOBILE_NUMBER_OPERATOR_RESULT: string;
                    public static MSG_ON_RECEIVE: string;
                    public static MSG_ON_JPUSH_ACTION_PREFIX: string;


                    public static FIELD_SMC_MSG_NAME: string;
                    public static FIELD_SMC_MSG_HOLDER: string;
                    public static FIELD_ERROR_CODE: string;
                    public static FIELD_SEQUENCE: string;
                    public static FIELD_TAG_CHECK_STATE_RESULT: string;
                    public static FIELD_ALIAS: string;
                    public static FIELD_CHECK_TAG: string;
                    public static FIELD_MOBILE_NUMBER: string;
                    public static FIELD_TAGS: string;

                    public static FIELD_RECEIVE_INTENT: string;
                    public static FIELD_INTENT_ACTION: string;
                }

                export class MessageCenterJPushOperateMessageReceiver {

                }

                export class MessageCenterJPushApiReceiver {

                }
            }
        }
    }
}