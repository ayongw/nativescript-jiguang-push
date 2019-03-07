// cn.jpush.android.api.JPushInterface
/**
 * JPush SDK 收到推送，通过广播的方式，转发给开发者 App，这样开发者就可以灵活地进行处理。

 这个动作不是必须的。用户有需要才定义 Receiver 类来处理 SDK 过来的广播。

 如果不做这个动作，即不写自定义 Receiver，也不在 AndroidManifest.xml 里配置这个 Receiver，则默认的行为是：

 接收到推送的自定义消息，则没有被处理
 可以正常收到通知，用户点击打开应用主界面
 */

declare namespace com {
    export namespace ayongw {
        export namespace nativescript {
            export namespace jiguangpush {
                export class SequenceMessageReceiver {
                    static aliaTagsCallBacks: { [key: number]: any } = {};

                    /**
                     * 添加指定序列的回调函数
                     * @param seq
                     * @param callback
                     */
                    public static addSeqCallback(seq: number, callback: any): void;

                    /**
                     * 回调完成后用于删除回调函数
                     * @param seq
                     */
                    public static removeSeqCallback(seq: number): void;
                }
            }
        }
    }
}

declare namespace cn {
    export namespace jpush {
        export namespace android {
            export namespace api {
                export class JPushMessage {
                    public static class: java.lang.Class<cn.jpush.android.api.JPushMessage>;

                    /**
                     * 对应操作的返回码，0 为成功，其他返回码请参考错误码定义。
                     */
                    getErrorCode(): number;

                    /**
                     * 开发者调用接口时传入的 sequence，通过该 sequence 开发者可以从开发者自己缓存中获取到对应的操作。
                     */
                    getSequence(): number;

                    /**
                     * 开发者传或查询得到的 alias。
                     */
                    getAlias(): string;

                    /**
                     * 开发者传或查询得到的 tags。
                     */
                    getTags(): Set<string>;

                    /**
                     * 开发者想要查询的 tag 与当前用户绑定的状态。
                     */
                    getTagCheckStateResult(): boolean;

                    /**
                     * 开发者想要查询绑定状态的 tag。
                     */
                    getCheckTag(): string;

                    /**
                     * 开发者调用设置接口时传入的手机号码。
                     */
                    getMobileNumber(): string;
                }
            }
        }
    }
}

declare namespace cn {
    export namespace jpush {
        export namespace android {
            export namespace data {
                /**
                 * 本地通知消息
                 */
                export class JPushLocalNotification {
                    public static class: java.lang.Class<cn.jpush.android.data.JPushLocalNotification>;

                    /**
                     * 设置本地通知的 ID
                     * @param id
                     */
                    setNotificationId(id: number): void;

                    /**
                     * 设置本地通知样式
                     * @param id
                     */
                    setBuilderId(id: number): void;

                    /**
                     * 设置本地通知的 title
                     * @param title
                     */
                    setTitle(title: string): void;

                    /**
                     * 设置本地通知的 content
                     * @param title
                     */
                    setContent(title: string): void;

                    /**
                     * 设置本地通知的 ID
                     */
                    getNotificationId(): number;

                    /**
                     * 设置本地通知触发时间
                     * @param broadcastTime
                     */
                    setBroadcastTime(broadcastTime: number): void;

                    /**
                     * 设置本地通知触发时间
                     * @param broadcastTime
                     */
                    setBroadcastTime(broadcastTime: Date);

                    /**
                     * 设置本地通知触发时间
                     * @param year
                     * @param month
                     * @param day
                     * @param hour
                     * @param minute
                     * @param second
                     */
                    setBroadcastTime(year: number, month: number, day: number, hour: number, minute: number, second: number): void;

                    /**
                     * 设置额外的数据信息 extras 为 json 字符串
                     * @param extras
                     */
                    setExtras(extras: string): void;
                }
            }
        }
    }
}

declare namespace cn {
    export namespace jpush {
        export namespace android {
            export namespace api {
                export class JPushInterface {
                    public static class: java.lang.Class<cn.jpush.android.api.JPushInterface>;
                    /**
                     * JPush 服务的连接状态发生变化。（注：不是指 Android 系统的网络连接状态。）
                     * Intent 参数
                     JPushInterface.EXTRA_CONNECTION_CHANGE
                     */
                    public static ACTION_CONNECTION_CHANGE: string;
                    /**
                     * SDK 向 JPush Server 注册所得到的注册 ID。
                     * 一般来说，可不处理此广播信息。
                     要深入地集成极光推送，开发者想要自己保存 App 用户与 JPush 用户关系时，则接受此广播，
                     取得 Registration ID 并保存与 App uid 的关系到开发者自己的应用服务器上。
                     */
                    public static ACTION_REGISTRATION_ID: string;
                    /**
                     * 收到了自定义消息 Push。
                     SDK 对自定义消息，只是传递，不会有任何界面上的展示。
                     Intent 参数
                     EXTRA_TITLE/EXTRA_MESSAGE/EXTRA_EXTRA/EXTRA_MSG_ID
                     */
                    public static ACTION_MESSAGE_RECEIVED: string;
                    /**
                     * 收到了通知 Push。
                     如果通知的内容为空，则在通知栏上不会展示通知。
                     但是，这个广播 Intent 还是会有。开发者可以取到通知内容外的其他信息。
                     Intent 参数
                     EXTRA_NOTIFICATION_TITLE/EXTRA_ALERT/EXTRA_EXTRA/EXTRA_NOTIFICATION_ID/EXTRA_RICHPUSH_HTML_PATH
                     /EXTRA_RICHPUSH_HTML_RES/EXTRA_MSG_ID/EXTRA_BIG_TEXT/EXTRA_BIG_PIC_PATH/EXTRA_INBOX/EXTRA_NOTI_PRIORITY
                     /EXTRA_NOTI_CATEGORY
                     */
                    public static ACTION_NOTIFICATION_RECEIVED: string;
                    /**
                     * 用户点击了通知。 一般情况下，用户不需要配置此 receiver action。
                     如果开发者在 AndroidManifest.xml 里未配置此 receiver action，
                     那么，SDK 会默认打开应用程序的主 Activity，相当于用户点击桌面图标的效果。

                     如果开发者在 AndroidManifest.xml 里配置了此 receiver action，
                     那么，当用户点击通知时，SDK 不会做动作。
                     开发者应该在自己写的 BroadcastReceiver 类里处理，比如打开某 Activity 。

                     Intent 参数
                     EXTRA_NOTIFICATION_TITLE/EXTRA_ALERT/EXTRA_EXTRA/EXTRA_NOTIFICATION_ID/EXTRA_MSG_ID
                     */
                    public static ACTION_NOTIFICATION_OPENED: string;
                    /**
                     * 用户点击了通知栏中自定义的按钮。（SDK 3.0.0 以上版本支持）

                     使用普通通知的开发者不需要配置此 receiver action。
                     只有开发者使用了 MultiActionsNotificationBuilder 构建携带按钮的通知栏的通知时，
                     可通过该 action 捕获到用户点击通知栏按钮的操作，并自行处理。

                     Intent 参数
                     EXTRA_NOTIFICATION_ACTION_EXTRA/
                     */
                    public static ACTION_NOTIFICATION_CLICK_ACTION: string;
                    public static ACTION_NOTIFICATION_RECEIVED_PROXY: string;
                    /**
                     * SDK 1.6.3 以上版本支持。
                     获取当前 JPush 服务的连接状态。
                     */
                    public static EXTRA_CONNECTION_CHANGE: string;
                    /**
                     * SDK 向 JPush Server 注册所得到的注册 全局唯一的 ID ，可以通过此 ID 向对应的客户端发送消息和通知。
                     Bundle bundle = intent.getExtras();
                     String title = bundle.getString(JPushInterface.EXTRA_REGISTRATION_ID);
                     */
                    public static EXTRA_REGISTRATION_ID: string;
                    public static EXTRA_APP_KEY: string;
                    public static EXTRA_NOTIFICATION_DEVELOPER_ARG0: string;
                    /**
                     * 保存服务器推送下来的通知的标题。
                     对应 API 通知内容的 title 字段。
                     对应 Portal 推送通知界面上的“通知标题”字段
                     */
                    public static EXTRA_NOTIFICATION_TITLE: string;
                    public static EXTRA_PUSH_ID: string;
                    /**
                     * SDK 1.6.1 以上版本支持。
                     唯一标识消息的 ID, 可用于上报统计等。
                     */
                    public static EXTRA_MSG_ID: string;
                    public static EXTRA_NOTI_TYPE: string;
                    /**
                     * 保存服务器推送下来的通知内容。
                     对应 API 通知内容的 alert 字段。
                     对应 Portal 推送通知界面上的“通知内容”字段。
                     */
                    public static EXTRA_ALERT: string;
                    public static EXTRA_ALERT_TYPE: string;
                    /**
                     * 保存服务器推送下来的消息内容。
                     对应 API 消息内容的 message 字段。
                     对应 Portal 推送消息界面上的“自定义消息内容”字段。
                     */
                    public static EXTRA_MESSAGE: string;
                    public static EXTRA_CONTENT_TYPE: string;
                    /**
                     * 保存服务器推送下来的消息的标题。
                     对应 API 消息内容的 title 字段。
                     Portal 推送消息界上不作展示

                     Bundle bundle = intent.getExtras();
                     String title = bundle.getString(JPushInterface.EXTRA_TITLE);
                     */
                    public static EXTRA_TITLE: string;
                    /**
                     * SDK 3.0.0 以上版本支持，支持 api 16 以上的 rom。
                     大文本通知样式中大文本的内容。
                     */
                    public static EXTRA_BIG_TEXT: string;
                    /**
                     * SDK 3.0.0 以上版本支持，支持 api 16 以上的 rom。
                     获取的是一个 JSONObject，json 的每个 key 对应的 value 会被当作文本条目逐条展示。
                     收件箱通知样式中收件箱的内容。
                     */
                    public static EXTRA_INBOX: string;
                    /**
                     * SDK 3.0.0 以上版本支持，支持 api 16 以上的 rom。
                     可支持本地图片的路径，或者填网络图片地址。
                     大图片通知样式中大图片的路径/地址。
                     */
                    public static EXTRA_BIG_PIC_PATH: string;
                    /**
                     * 保存服务器推送下来的附加字段。这是个 JSON 字符串。
                     对应 API 消息内容的 extras 字段。
                     对应 Portal 推送消息界面上的“可选设置”里的附加字段。
                     */
                    public static EXTRA_EXTRA: string;
                    /**
                     * SDK 3.0.0 以上版本支持，支持 api 16 以上的 rom。
                     默认为 0，范围为 -2～2，其他值将会被忽略而采用默认。
                     通知的优先级。
                     */
                    public static EXTRA_NOTI_PRIORITY: string;
                    /**
                     * SDK 3.0.0 以上版本支持，支持 api 21 以上的 rom。
                     完全依赖 rom 厂商对每个 category 的处理策略，比如通知栏的排序。
                     通知分类。
                     */
                    public static EXTRA_NOTI_CATEGORY: string;
                    /**
                     * SDK 1.3.5 以上版本支持。
                     通知栏的 Notification ID，可以用于清除 Notification
                     如果服务端内容（alert）字段为空，则 Notification ID 为 0
                     */
                    public static EXTRA_NOTIFICATION_ID: string;
                    /**
                     * SDK 3.0.0 以上版本支持。
                     获取通知栏按钮点击事件携带的附加信息。
                     对应使用 MultiActionsNotificationBuilder.addJPushAction 添加的按钮信息。

                     else if (JPushInterface.ACTION_NOTIFICATION_CLICK_ACTION.equals(intent.getAction())){
                            Log.d(TAG, "[MyReceiver] 用户点击了通知栏按钮");
                            String nActionExtra = intent.getExtras().getString(JPushInterface.EXTRA_NOTIFICATION_ACTION_EXTRA);

                            //开发者根据不同 Action 携带的 extra 字段来分配不同的动作。
                            if(nActionExtra==null){
                                Log.d(TAG,"ACTION_NOTIFICATION_CLICK_ACTION nActionExtra is null");
                                return;
                            }
                            if (nActionExtra.equals("my_extra1")) {
                                Log.d(TAG, "[MyReceiver] 用户点击通知栏按钮一");
                            } else if (nActionExtra.equals("my_extra2")) {
                                Log.d(TAG, "[MyReceiver] 用户点击通知栏按钮二");
                            } else if (nActionExtra.equals("my_extra3")) {
                                Log.d(TAG, "[MyReceiver] 用户点击通知栏按钮三");
                            } else {
                                Log.d(TAG, "[MyReceiver] 用户点击通知栏按钮未定义");
                            }
                        }
                     */
                    public static EXTRA_NOTIFICATION_ACTION_EXTRA: string;
                    public static EXTRA_ACTIVITY_PARAM: string;
                    public static EXTRA_RICHPUSH_FILE_PATH: string;
                    public static EXTRA_RICHPUSH_FILE_TYPE: string;
                    /**
                     * SDK 1.4.0 以上版本支持。
                     富媒体通知推送下载的 HTML 的文件路径，用于展现 WebView。
                     Bundle bundle = intent.getExtras();
                     String fileHtml = bundle.getString(JPushInterface.EXTRA_RICHPUSH_HTML_PATH);
                     */
                    public static EXTRA_RICHPUSH_HTML_PATH: string;
                    /**
                     * SDK 1.4.0 以上版本支持。
                     富媒体通知推送下载的图片资源的文件名，多个文件名用 “，” 分开。与 “JPushInterface.EXTRA_RICHPUSH_HTML_PATH” 位于同一个路径。

                     Bundle bundle = intent.getExtras();
                     String fileStr = bundle.getString(JPushInterface.EXTRA_RICHPUSH_HTML_RES);
                     String[] fileNames = fileStr.split(",");
                     */
                    public static EXTRA_RICHPUSH_HTML_RES: string;
                    public static EXTRA_STATUS: string;
                    public static ACTION_RICHPUSH_CALLBACK: string;

                    public constructor();

                    /**
                     * 初始化推送服务。
                     * @param context
                     */
                    public static init(context: android.content.Context): void;

                    /**
                     * 停止推送服务。

                     调用了本 API 后，JPush 推送服务完全被停止。具体表现为：

                     收不到推送消息
                     极光推送所有的其他 API 调用都无效，不能通过 JPushInterface.init 恢复，需要调用 resumePush 恢复。
                     * @param context
                     */
                    public static stopPush(context: android.content.Context): void;

                    /**
                     * 恢复推送服务。

                     调用了此 API 后，极光推送完全恢复正常工作。
                     * @param context
                     */
                    public static resumePush(context: android.content.Context): void;

                    /**
                     * 用来检查 Push Service 是否已经被停止

                     SDK 1.5.2 以上版本支持。
                     * @param context
                     */
                    public static isPushStopped(context: android.content.Context): boolean;

                    /**
                     * 动态配置 channel，优先级比 AndroidManifest 里配置的高

                     SDK 3.1.5 以上版本支持。

                     JPushInterface.setChannel(this, "channel_1");
                     * @param context
                     * @param channel
                     */
                    public static setChannel(context: android.content.Context, channel: string): void;

                    /**
                     * 过滤出有效的标签列表
                     *
                     * 设置 tags 时，如果其中一个 tag 无效，则整个设置过程失败。
                     如果 App 的 tags 会在运行过程中动态设置，并且存在对 JPush SDK tag 规定的无效字符，
                     则有可能一个 tag 无效导致这次调用里所有的 tags 更新失败。
                     这时你可以调用本方法 filterValidTags 来过滤掉无效的 tags，得到有效的 tags，
                     再调用 JPush SDK 的 set tags / alias 方法。

                     开始支持的版本：1.5.0
                     * @param tags
                     * @return 有效的 tag 集合。
                     */
                    public static filterValidTags(tags: Set<string>): Set<string>;

                    /**
                     * 设置新的别名，，
                     *
                     * 这个接口是覆盖逻辑，而不是增量逻辑。即新的调用会覆盖之前的设置。
                     * 开始支持的版本：3.0.7
                     * 限制：alias 命名长度限制为 40 字节。（判断长度需采用 UTF-8 编码）
                     * @param context
                     * @param sequence 用户自定义的操作序列号，同操作结果一起返回，用来标识一次操作的唯一性。
                     * @param alias 字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|。
                     */
                    public static setAlias(context: android.content.Context, sequence: number, alias: string): void;

                    /**
                     * 删除别名。
                     * @param context
                     * @param sequence 用户自定义的操作序列号，同操作结果一起返回，用来标识一次操作的唯一性。
                     */
                    public static deleteAlias(context: android.content.Context, sequence: number): void;

                    /**
                     * 查询别名。
                     * @param context
                     * @param sequence 用户自定义的操作序列号，同操作结果一起返回，用来标识一次操作的唯一性。
                     */
                    public static getAlias(context: android.content.Context, sequence: number): void;

                    /**
                     * 设置标签。
                     * 开始支持的版本：3.0.7
                     *
                     *需要理解的是，这个接口是覆盖逻辑，而不是增量逻辑。即新的调用会覆盖之前的设置。
                     *
                     * 每次调用至少设置一个 tag，覆盖之前的设置，不是新增。
                     有效的标签组成：字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|。
                     限制：每个 tag 命名长度限制为 40 字节，最多支持设置 1000 个 tag，且单次操作总长度不得超过 5000 字节。（判断长度需采用 UTF-8 编码）
                     单个设备最多支持设置 1000 个 tag。App 全局 tag 数量无限制。

                     * @param context
                     * @param sequence 用户自定义的操作序列号，同操作结果一起返回，用来标识一次操作的唯一性。
                     * @param tags
                     */
                    public static setTags(context: android.content.Context, sequence: number, tags: Set<string>): void;

                    /**
                     * 新增标签。
                     * 开始支持的版本：3.0.7
                     * 每次调用至少新增一个 tag。
                     有效的标签组成：字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|。
                     限制：每个 tag 命名长度限制为 40 字节，最多支持设置 1000 个 tag，且单次操作总长度不得超过 5000 字节。（判断长度需采用 UTF-8 编码）
                     单个设备最多支持设置 1000 个 tag。App 全局 tag 数量无限制。
                     * @param context
                     * @param sequence 用户自定义的操作序列号，同操作结果一起返回，用来标识一次操作的唯一性。
                     * @param tags
                     */
                    public static addTags(context: android.content.Context, sequence: number, tags: Set<string>): void;

                    /**
                     * 删除指定标签。
                     * 开始支持的版本：3.0.7
                     * @param context
                     * @param sequence
                     * @param tags
                     */
                    public static deleteTags(context: android.content.Context, sequence: number, tags: Set<string>): void;

                    /**
                     * 除所有标签。
                     * 开始支持的版本：3.0.7
                     * @param context
                     * @param sequence
                     */
                    public static cleanTags(context: android.content.Context, sequence: number): void;

                    /**
                     * 查询所有标签。
                     * 开始支持的版本：3.0.7
                     *
                     * @param context
                     * @param sequence
                     */
                    public static getAllTags(context: android.content.Context, sequence: number): void;

                    /**
                     * 查询指定 tag 与当前用户绑定的状态。
                     * 开始支持的版本：3.0.7
                     *
                     * @param context
                     * @param sequence
                     * @param tag
                     */
                    public static checkTagBindState(context: android.content.Context, sequence: number, tag: string): void;

                    /**
                     *  设置手机号码。该接口会控制调用频率，频率为 10s 之内最多 3 次。
                     *  开始支持的版本：3.1.1
                     *
                     *  注：短信补充仅支持国内业务，号码格式为 11 位数字，有无 +86 前缀皆可。
                     *
                     * 回调说明
                     接口回调触发 cn.jpush.android.service.JPushMessageReceiver，详细的回调方法请参考新的消息回调方式说明。
                     *
                     * @param context
                     * @param sequence
                     * @param mobileNumber 手机号码。如果传 null 或空串则为解除号码绑定操作。 限制：只能以 “+” 或者 数字开头；后面的内容只能包含 “-” 和数字。
                     */
                    public static setMobileNumber(context: android.content.Context, sequence: number, mobileNumber: string): void;

                    /**
                     * 调用此 API 来取得应用程序对应的 RegistrationID。 只有当应用程序成功注册到 JPush 的服务器时才返回对应的值，否则返回空字符串。
                     *
                     * JPush SDK 会以广播的形式发送 RegistrationID 到应用程序。
                     应用程序可以把此 RegistrationID 保存以自己的应用服务器上，然后就可以根据 RegistrationID 来向设备推送消息或者通知。
                     * @param context
                     */
                    public static getRegistrationID(context: android.content.Context): string;

                    /**
                     *
                     此 API 提供清除通知的功能，包括：清除所有 JPush 展现的通知（不包括非 JPush SDK 展现的）；清除指定某个通知。
                     * @param context
                     */
                    public static clearAllNotifications(context: android.content.Context): string;

                    /**
                     *此 notificationId 来源于 intent 参数 JPushInterface.EXTRA_NOTIFICATION_ID，可参考文档：接收推送消息 Receiver
                     * @param context
                     * @param notificationId 通知 ID
                     */
                    public static clearNotificationById(context: android.content.Context, notificationId: number): string;

                    public static setDebugMode(debugMod: boolean): void;

                    /*
                    统计分析 API
                    本 API 用于“用户使用时长”，“活跃用户”，“用户打开次数”的统计，并上报到服务器，在 Portal 上展示给开发者。
                     */

                    /**
                     *  @Override
                     protected void onResume() {
                            super.onResume();
                            JPushInterface.onResume(this);
                        }
                     @Override
                     protected void onPause() {
                            super.onPause();
                            JPushInterface.onPause(this);
                        }


                     * @param activity Activity activity 当前所在的 Activity。
                     */
                    public static onResume(activity: android.app.Activity): void;

                    public static onPause(activity: android.app.Activity): void;


                    /**
                     * 设置允许推送时间 API
                     *这是一个纯粹客户端的实现，所以与客户端时间是否准确、时区等这些，都没有关系。
                     而且该接口仅对通知有效，自定义消息不受影响。

                     如果不在该时间段内收到消息，SDK 的处理是：推送到的通知会被扔掉。

                     * 此代码表示周一到周五、上午 10 点到晚上 23 点，都可以推送。
                     * Set<Integer> days = new HashSet<Integer>();
                     days.add(1);
                     days.add(2);
                     days.add(3);
                     days.add(4);
                     days.add(5);
                     JPushInterface.setPushTime(getApplicationContext(), days, 10, 23);
                     *
                     * @param context 应用的 ApplicationContext
                     * @param weekDays days 0 表示星期天，1 表示星期一，以此类推。 （ 7 天制，Set 集合里面的 int 范围为 0 到 6 ）
                     set 的值为 null，则任何时间都可以收到通知，set 的 size 为 0，则表示任何时间都收不到通知。
                     * @param startHour 许推送的开始时间 （ 24 小时制：startHour 的范围为 0 到 23 ）
                     * @param endHour 允许推送的结束时间 （ 24 小时制：endHour 的范围为 0 到 23 ）
                     */
                    public static setPushTime(context: android.content.Context, weekDays: Set<number>, startHour: number, endHour: number): void;

                    /**
                     * 设置通知静默时间 API
                     * 默认情况下用户在收到推送通知时，客户端可能会有震动，响铃等提示。但用户在睡觉、开会等时间点希望为“免打扰”模式，也是静音时段的概念。
                     * 开发者可以调用此 API 来设置静音时段。如果在该时间段内收到消息，则：不会有铃声和震动。

                     * @param context 应用的ApplicationContext
                     * @param startHour 静音时段的开始时间 - 小时 （ 24 小时制，范围：0~23 ）
                     * @param startMinute 静音时段的开始时间 - 分钟（范围：0~59 ）
                     * @param endHour 静音时段的结束时间 - 小时 （ 24 小时制，范围：0~23 ）
                     * @param endMinute  静音时段的结束时间 - 分钟（范围：0~59 ）
                     */
                    public static setSilenceTime(context: android.content.Context, startHour: number, startMinute: number, endHour: number, endMinute: number): void;

                    /**
                     *设置是否开启省电模式
                     * JPush SDK 开启和关闭省电模式，默认为关闭。
                     *
                     * @param context 当前应用的 Activity 的上下文
                     * @param enable 是否需要开启或关闭，true 为开启，false 为关闭
                     */
                    public static setPowerSaveMode(context: android.content.Context, enable: boolean): void;

                    /**
                     * （关闭 CrashLog 上报）
                     *
                     * CrashLog 收集并上报
                     * SDK 通过 Thread.UncaughtExceptionHandler 捕获程序崩溃日志，
                     * 并在程序奔溃时实时上报如果实时上报失败则会在程序下次启动时发送到服务器。如需要程序崩溃日志功能可调用此方法。
                     *
                     * @param context
                     */
                    public static stopCrashHandler(context: android.content.Context): void;

                    /**
                     * （开启 CrashLog 上报）
                     * @param context
                     */
                    public static initCrashHandler(context: android.content.Context): void;

                    /**
                     * 获取当前连接状态
                     * ACTION cn.jpush.android.intent.CONNECTION
                     * JPushInterface.EXTRA_CONNECTION_CHANGE Push 连接状态变化广播传过来的值
                     *
                     * boolean connected = bundle.getBooleanExtra(JPushInterface.EXTRA_CONNECTION_CHANGE, false);
                     * @param context
                     */
                    public static getConnectionState(context: android.content.Context): boolean;


                    /*
                    本地通知 API
                     */
                    /**
                     * 添加一个本地通知
                     *
                     * 本接口可以在 JPushInterface.init 之后任何地方调用
                     * @param context
                     * @param notification 是本地通知对象
                     */
                    public static addLocalNotification(context: android.content.Context, notification: cn.jpush.android.data.JPushLocalNotification): void;

                    /**
                     *移除指定的本地通知
                     *
                     * 本接口可以在 JPushInterface.init 之后任何地方调用
                     *
                     * @param context
                     * @param notificationId 是要移除的本地通知的 ID
                     */
                    public static removeLocalNotification(context: android.content.Context, notificationId: number): void;

                    /**
                     *  移除所有的本地通知
                     *
                     *  本接口可以在 JPushInterface.init 之后任何地方调用
                     * @param context
                     */
                    public static clearLocalNotifications(context: android.content.Context): void;


                }
            }
        }
    }
}

declare namespace cn {
    export namespace jpush {
        export namespace android {
            export namespace service {
                /**
                 * 3.0.7 版本之后新增的回调方式。
                 * 新的消息回调方式中相关回调类。
                 * 新的 tag 与 alias 操作回调会在开发者定义的该类的子类中触发。
                 * 手机号码设置的回调会在开发者定义的该类的子类中触发。
                 *
                 * 该类为回调父类，开发者需要继承该类并在 Manifest 中配置您对应实现的类，接口操作的结果会在您配置的类中的如下方法中回调。
                 * @since 3.0.7
                 */
                export class JPushMessageReceiver extends android.content.BroadcastReceiver {
                    public static class: java.lang.Class<cn.jpush.android.service.JPushMessageReceiver>;

                    public onReceive(context: android.content.Context, intent: android.content.Intent): void;

                    /**
                     * tag 增删查改的操作会在此方法中回调结果。
                     *
                     * @param context 应用的 Application Context。
                     * @param jpushMessage tag 相关操作返回的消息结果体，具体参考 JPushMessage 类的说明。
                     * @since 3.0.7
                     */
                    public onTagOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void;

                    /**
                     *  查询某个 tag 与当前用户的绑定状态的操作会在此方法中回调结果。
                     *
                     * @param context 应用的 Application Context。
                     * @param jpushMessage check tag 与当前用户绑定状态的操作返回的消息结果体，具体参考 JPushMessage 类的说明。
                     */
                    public onCheckTagOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void;

                    /**
                     * alias 相关的操作会在此方法中回调结果。
                     * @param context 应用的 Application Context。
                     * @param jpushMessage alias 相关操作返回的消息结果体，具体参考 JPushMessage 类的说明。
                     */
                    public onAliasOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void;

                    /**
                     * 设置手机号码会在此方法中回调结果。
                     *
                     * @param context 应用的 Application Context。
                     * @param jpushMessage 设置手机号码返回的消息结果体，具体参考 JPushMessage 类的说明。
                     * @since 3.1.1
                     */
                    public onMobileNumberOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void;
                }
            }
        }
    }
}