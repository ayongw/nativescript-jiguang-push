declare const JPUSH_VERSION_NUMBER = "3.1.2";
/**
 * 正在连接中
 */
declare const kJPFNetworkIsConnectingNotification: string;
/**
 * 建立连接
 */
declare const kJPFNetworkDidSetupNotification: string;
/**
 * 关闭连接
 */
declare const kJPFNetworkDidCloseNotification: string;
/**
 * 注册成功
 */
declare const kJPFNetworkDidRegisterNotification: string;
/**
 * 注册失败
 */
declare const kJPFNetworkFailedRegisterNotification: string;
/**
 * 登录成功
 */
declare const kJPFNetworkDidLoginNotification: string;
/**
 * 收到消息(非APNS)
 */
declare const kJPFNetworkDidReceiveMessageNotification: string;
/**
 * 错误提示
 */
declare const kJPFServiceErrorNotification: string;

/*
typedef NS_OPTIONS(NSUInteger, JPAuthorizationOptions) {
    JPAuthorizationOptionNone    = 0,   // the application may not present any UI upon a notification being received
    JPAuthorizationOptionBadge   = (1 << 0),    // the application may badge its icon upon a notification being received
    JPAuthorizationOptionSound   = (1 << 1),    // the application may play a sound upon a notification being received
    JPAuthorizationOptionAlert   = (1 << 2),    // the application may display an alert upon a notification being received
    JPAuthorizationOptionCarPlay = (1 << 3),    // The ability to display notifications in a CarPlay environment.
    JPAuthorizationOptionCriticalAlert NS_AVAILABLE_IOS(12.0) = (1 << 4) ,   //The ability to play sounds for critical alerts.
    JPAuthorizationOptionProvidesAppNotificationSettings NS_AVAILABLE_IOS(12.0) = (1 << 5) ,      //An option indicating the system should display a button for in-app notification settings.
    JPAuthorizationOptionProvisional NS_AVAILABLE_IOS(12.0) = (1 << 6) ,     //The ability to post noninterrupting notifications provisionally to the Notification Center.

};
 */
declare enum JPAuthorizationOptions {
    /**
     *  the application may not present any UI upon a notification being received
     */
    None,
    /**
     * the application may badge its icon upon a notification being received
     */
    Badge,
    /**
     * the application may play a sound upon a notification being received
     */
    Sound,
    /**
     * the application may display an alert upon a notification being received
     */
    Alert,
    /**
     * The ability to display notifications in a CarPlay environment.
     */
    CarPlay,
    /**
     * //The ability to play sounds for critical alerts.
     */
    CriticalAlert,
    /**
     * An option indicating the system should display a button for in-app notification settings.
     */
    ProvidesAppNotificationSettings,
    /**
     * The ability to post noninterrupting notifications provisionally to the Notification Center.
     */
    Provisional
}

/**
 * 通知注册实体类
 */
declare class JPUSHRegisterEntity extends NSObject {
    /**
     * 支持的类型
     * badge,sound,alert
     */
    types: number;
    /**
     * 注入的类别
     * iOS10 UNNotificationCategory
     * iOS8-iOS9 UIUserNotificationCategory
     */
    categories: NSSet<any>;
}

/**
 * 进行删除、查找推送实体类
 */
declare class JPushNotificationIdentifier extends NSObject implements NSCoding, NSCopying {
    /**
     * 推送的标识数组
     */
    identifiers: string[];
    /**
     * iOS10以下可以传UILocalNotification对象数据，iOS10以上无效
     */
    notificationObj?: UILocalNotification;
    /**
     * 在通知中心显示的或待推送的标志，默认为NO，
     *
     * YES表示在通知中心显示的，NO表示待推送的
     */
    delivered: boolean;

    /**
     * '@property (nonatomic, copy) void (^findCompletionHandler)(NSArray *results);
     * // 用于查询回调，调用[findNotification:]方法前必须设置，results为返回相应对象数组，
     *  iOS10以下返回UILocalNotification对象数组；
     *  iOS10以上根据delivered传入值返回UNNotification或UNNotificationRequest对象数组
     *      （delivered传入YES，则返回UNNotification对象数组，否则返回UNNotificationRequest对象数组）
     */
    // findCompletionHandler(): Array<UNNotification | UNNotificationRequest>;
    findCompletionHandler(callback: (results: Array<UNNotification | UNNotificationRequest>) => void): void;

    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;
}

/**
 * 推送通知声音实体类
 * iOS10以上有效
 */
declare class JPushNotificationSound extends NSObject implements NSCoding, NSCopying {
    /**
     * 普通通知铃声
     */
    soundName: string;
    /**
     * 警告通知铃声 ios12
     */
    criticalSoundName: string;
    /**
     * 警告通知铃声音量，有效值在0~1之间，默认为1
     *
     * float
     */
    criticalSoundVolume: number;


    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;
}

/**
 * 推送内容实体类
 */
declare class JPushNotificationContent extends NSObject implements NSCoding, NSCopying {
    /**
     * 推送标题
     */
    title: string;
    /**
     * 推送副标题
     */
    subtitle: string;
    /**
     * 推送内容
     */
    body: string;
    /**
     * 角标的数字。如果不需要改变角标传@(-1)
     * NSNumber
     */
    badge: number;
    /**
     * 弹框的按钮显示的内容（IOS 8默认为"打开", 其他默认为"启动",iOS10以上无效）
     */
    action: string;
    /**
     * 行为分类标识
     */
    categoryIdentifier: string;
    /**
     * 本地推送时可以设置userInfo来增加附加信息，远程推送时设置的payload推送内容作为此userInfo
     */
    userInfo: NSDictionary<string, any>;
    /**
     * 声音名称，不设置则为默认声音
     */
    sound: string;
    /**
     * 推送声音实体
     *
     * ios 10
     */
    soundSetting: JPushNotificationSound;
    /**
     * 附件，iOS10以上有效，需要传入UNNotificationAttachment对象数组类型
     */
    attachments: UNNotificationAttachment[];
    /**
     * 线程或与推送请求相关对话的标识，iOS10以上有效，可用来对推送进行分组
     */
    threadIdentifier: string;

    /**
     * 启动图片名，iOS10以上有效，从推送启动时将会用到
     */
    launchImageName: string;
    /**
     * 插入到通知摘要中的部分参数。iOS12以上有效。
     * @since ios12
     */
    summaryArgument: string;
    /**
     * 插入到通知摘要中的项目数。iOS12以上有效。
     *
     * NSUInteger
     * @since ios12
     */
    summaryArgumentCount: number;


    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;
}

/**
 * 推送触发方式实体类
 * 注：dateComponents、timeInterval、region在iOS10以上可选择其中一个参数传入有效值，
 * 如果同时传入值会根据优先级I、II、III使其中一种触发方式生效，
 * fireDate为iOS10以下根据时间触发时须传入的参数
 */
declare class JPushNotificationTrigger extends NSObject implements NSCoding, NSCopying {
    /**
     * 设置是否重复，默认为NO
     */
    repeat: boolean;
    /**
     * 用来设置触发推送的时间，iOS10以上无效
     * @deprecated
     */
    fireDate?: Date;

    /**
     * 用来设置触发推送的位置，iOS8以上有效，iOS10以上优先级为I，应用需要有允许使用定位的授权
     */
    region?: CLRegion;
    /**
     * 用来设置触发推送的日期时间，iOS10以上有效，优先级为II
     */
    dateComponents?: NSDateComponents;
    /**
     * 用来设置触发推送的时间，iOS10以上有效，优先级为III
     *
     * double
     * NSTimeInterval
     * typedef double NSTimeInterval;
     */
    timeInterval: number;

    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;

}

/**
 * 注册或更新推送实体类
 */
declare class JPushNotificationRequest extends NSObject implements NSCoding, NSCopying {
    /**
     * 推送请求标识
     */
    requestIdentifier: string;
    /**
     * 设置推送的具体内容
     */
    content: JPushNotificationContent;
    /**
     * 设置推送的触发方式
     */
    trigger: JPushNotificationTrigger;

    /**
     * 注册或更新推送成功回调，
     *
     * iOS10以上成功则result为UNNotificationRequest对象，失败则result为nil;
     * iOS10以下成功则result为UILocalNotification对象，失败则result为nil
     *
     * " @property (nonatomic, copy) void (^completionHandler)(id result);  "
     *
     * @param calllback
     */
    completionHandler(calllback: (result: UNNotificationRequest | UILocalNotification) => void): void;


    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;
}


declare interface JPUSHRegisterDelegate extends NSObject {
    /**
     *
     * @brief handle UserNotifications.framework [willPresentNotification:withCompletionHandler:]
     *
     *  - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center
     *          willPresentNotification:(UNNotification *)notification
     *            withCompletionHandler:(void (^)(NSInteger options))completionHandler;
     *
     * @param center [UNUserNotificationCenter currentNotificationCenter] 新特性用户通知中心
     * @param notification 前台得到的的通知对象
     * @param completionHandler 该callback中的options 请使用UNNotificationPresentationOptions
     */
    // jpushNotificationCenter(center: UNUserNotificationCenter,
    //                         notification: UNNotification,
    //                         completionHandler: (options: number) => void): void;

    jpushNotificationCenterWillPresentNotificationWithCompletionHandler(center: UNUserNotificationCenter,
                                                                        notification: UNNotification,
                                                                        completionHandler: (options: number) => void): void;


    /**
     * handle UserNotifications.framework [didReceiveNotificationResponse:withCompletionHandler:]
     *
     * - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center
     *          didReceiveNotificationResponse:(UNNotificationResponse *)response
     *          withCompletionHandler:(void(^)())completionHandler;
     *
     * @param center [UNUserNotificationCenter currentNotificationCenter] 新特性用户通知中心
     * @param response 通知响应对象
     * @param completionHandler
     */
    // jpushNotificationCenter(center: UNUserNotificationCenter,
    //                         response: UNNotificationResponse,
    //                         completionHandler: () => void): void;
    jpushNotificationCenterDidReceiveNotificationResponseWithCompletionHandler(center: UNUserNotificationCenter,
                                                                               response: UNNotificationResponse,
                                                                               completionHandler: () => void): void;

    /**
     * handle UserNotifications.framework [openSettingsForNotification:]
     *
     * - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(nullable UNNotification *)notification NS_AVAILABLE_IOS(12.0);
     *
     * @param center [UNUserNotificationCenter currentNotificationCenter] 新特性用户通知中心
     * @param notification 当前管理的通知对象
     */
    // jpushNotificationCenter(center: UNUserNotificationCenter, notification: UNNotification): void;
    jpushNotificationCenterOpenSettingsForNotification(center: UNUserNotificationCenter,
                                                       notification: UNNotification): void;

}


// JPUSHTagsOperationCompletion
// typedef void (^JPUSHTagsOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq);

// JPUSHTagValidOperationCompletion
// typedef void (^JPUSHTagValidOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq, BOOL isBind);

// JPUSHAliasOperationCompletion
// typedef void (^JPUSHAliasOperationCompletion)(NSInteger iResCode, NSString *iAlias, NSInteger seq);

// export declare function JPUSHTagsOperationCompletion(iResCode: number, iTags: NSSet, seq: number): void;


/**
 * JPush 核心头文件
 */
export declare class JPUSHService extends NSObject {
    /**
     * 启动SDK
     * @param launchingOption
     * @deprecated 这是旧版本的启动方法, 依赖于 PushConfig.plist 文件. 建议不要使用, 已经过期.
     * @deprecated JPush 2.1.0 版本已过期
     */
    public static setupWithOption(launchingOption: NSDictionary<string, any>): void;

    /**
     * 提供SDK启动必须的参数, 来启动 SDK.
     *
     * 此接口必须在 App 启动时调用, 否则 JPush SDK 将无法正常工作.
     *
     * + (void)setupWithOption:(NSDictionary *)launchingOption
     *                  appKey:(NSString *)appKey
     *                 channel:(NSString *)channel
     *        apsForProduction:(BOOL)isProduction;
     *
     * @param launchingOption 启动参数.
     * @param appKey 一个JPush 应用必须的,唯一的标识. 请参考 JPush 相关说明文档来获取这个标识.
     * @param channel 发布渠道. 可选.
     * @param isProduction 是否生产环境. 如果为开发状态,设置为 NO; 如果为生产状态,应改为 YES.
     */
    public static setupWithOptionAppKeyChannelApsForProduction(
        launchingOption: NSDictionary<string, any>,
        appKey: string,
        channel: string,
        isProduction: boolean): void;

    /**
     * 提供SDK启动必须的参数, 来启动 SDK.
     *
     * 此接口必须在 App 启动时调用, 否则 JPush SDK 将无法正常工作.
     *
     * + (void)setupWithOption:(NSDictionary *)launchingOption
     *                  appKey:(NSString *)appKey
     *                 channel:(NSString *)channel
     *        apsForProduction:(BOOL)isProduction
     *   advertisingIdentifier:(NSString *)advertisingId;
     *
     * @param launchingOption 启动参数.
     * @param appKey 一个JPush 应用必须的,唯一的标识. 请参考 JPush 相关说明文档来获取这个标识.
     * @param channel 发布渠道. 可选.
     * @param isProduction 是否生产环境. 如果为开发状态,设置为 NO; 如果为生产状态,应改为 YES.
     * @param advertisingIdentifier 广告标识符（IDFA） 如果不需要使用IDFA，传nil.
     */
    public static setupWithOptionAppKeyChannelApsForProductionAdvertisingIdentifier(
        launchingOption: NSDictionary<string, any>,
        appKey: string,
        channel: string,
        isProduction: boolean,
        advertisingIdentifier: string): void;

    /*
    ///----------------------------------------------------
    /// @name APNs about 通知相关
    ///----------------------------------------------------

     */
    /**
     * 注册要处理的远程通知类型
     *
     * + (void)registerForRemoteNotificationTypes:(NSUInteger)types
     *                                 categories:(NSSet *)categories;
     *
     * @param types 通知类型
     * @param categories 类别组
     */
    public static registerForRemoteNotificationTypesCategories(types: number, categories: NSSet<string>): void;

    /**
     *  新版本的注册方法（兼容iOS10）
     *
     * + (void)registerForRemoteNotificationConfig:(JPUSHRegisterEntity *)config delegate:(id<JPUSHRegisterDelegate>)delegate;
     * @param config 注册通知配置
     * @param delegate 代理
     *
     */
    public static registerForRemoteNotificationConfigDelegate(config: JPUSHRegisterEntity, delegate: JPUSHRegisterDelegate): void;

    public static registerDeviceToken(deviceToken: NSData): void;

    /**
     * 处理收到的 APNs 消息
     * @param remoteInfo
     */
    public static handleRemoteNotification(remoteInfo: NSDictionary<string, any>): void;

    /**
     * 设置手机号码
     *
     * + (void)setMobileNumber:(NSString *)mobileNumber
     *              completion:(void (^)(NSError *error))completion;
     *
     * 用于短信补充功能。设置手机号码后，可实现“推送不到短信到”的通知方式，提高推送达到率。
     *
     * 此接口调用频率有限制，10s 之内最多 3 次。建议在登录成功以后，再调用此接口。
     * 结果信息通过 completion 异步返回，也可将completion 设置为 nil 不处理结果信息。
     *
     * @param mobileNumber 手机号码。只能以 “+” 或者数字开头，后面的内容只能包含 “-” 和数字，并且长度不能超过 20。如果传 nil 或空串则为解除号码绑定操作
     * @param completion 响应回调。成功则 error 为空，失败则 error 带有错误码及错误信息，具体错误码详见错误码定义
     */
    public static setMobileNumberCompletion(mobileNumber: string, completion: (error: NSError) => void): void;

    /*
 * Tags操作接口
 * 支持增加/覆盖/删除/清空/查询操作
 * 详情请参考文档：https://docs.jiguang.cn/jpush/client/iOS/ios_api/）

    ///----------------------------------------------------
    /// @name Tag alias setting 设置别名与标签
    ///----------------------------------------------------
*/
    /**
     * 增加tags
     *
     * typedef void (^JPUSHTagsOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq);
     *
     * + (void)addTags:(NSSet<NSString *> *)tags
     *      completion:(JPUSHTagsOperationCompletion)completion
     *             seq:(NSInteger)seq;
     *
     * @param tags 需要增加的tags集合
     * @param completion 响应回调
     * @param seq 请求序列号
     */
    public static addTagsCompletionSeq(tags: NSSet<string>,
                                       completion: (iResCode: number, iTags: NSSet, seq: number) => void,
                                       seq: number): void;

    /**
     * 覆盖tags
     * 调用该接口会覆盖用户所有的tags
     * typedef void (^JPUSHTagsOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq);
     * + (void)setTags:(NSSet<NSString *> *)tags
     *      completion:(JPUSHTagsOperationCompletion)completion
     *             seq:(NSInteger)seq;
     *
     * @param tags 需要设置的tags集合
     * @param completion
     * @param seq
     */
    public static setTagsCompletionSeq(tags: NSSet<string>,
                                       completion: (iResCode: number, iTags: NSSet, seq: number) => void,
                                       seq: number): void;

    /**
     * 删除指定tags
     * typedef void (^JPUSHTagsOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq);
     * + (void)deleteTags:(NSSet<NSString *> *)tags
     *         completion:(JPUSHTagsOperationCompletion)completion
     *                seq:(NSInteger)seq;
     *
     * @param tags 需要删除的tags集合
     * @param completion
     * @param seq
     */
    public static deleteTagsCompletionSeq(tags: NSSet<string>,
                                          completion: (iResCode: number, iTags: NSSet, seq: number) => void,
                                          seq: number): void;

    /**
     *  清空所有tags
     *
     * + (void)cleanTags:(JPUSHTagsOperationCompletion)completion
     *               seq:(NSInteger)seq;
     *
     * @param completion 响应回调
     * @param seq 请求序列号
     */
    public static cleanTagsSeq(completion: (iResCode: number, iTags: NSSet, seq: number) => void,
                               seq: number): void;

    /**
     * 查询全部tags
     * + (void)getAllTags:(JPUSHTagsOperationCompletion)completion
     *                seq:(NSInteger)seq;
     * @param completion 响应回调，请在回调中获取查询结果
     * @param seq 请求序列号
     */
    public static getAllTagsSeq(completion: (iResCode: number, iTags: NSSet, seq: number) => void,
                                seq: number): void;

    /**
     *
     * 验证tag是否绑定
     * //typedef void (^JPUSHTagValidOperationCompletion)(NSInteger iResCode, NSSet *iTags, NSInteger seq, BOOL isBind);
     *
     * + (void)validTag:(NSString *)tag
     *       completion:(JPUSHTagValidOperationCompletion)completion
     *              seq:(NSInteger)seq;
     *
     * @param tag
     * @param completion 响应回调，回调中查看是否绑定
     * @param seq 请求序列号
     */
    public static validTagCompletionSeq(tag: string,
                                        completion: (iResCode: number, iTags: NSSet<string>, seq: number, isBind: boolean) => void,
                                        seq: number): void;

    /**
     * 设置Alias
     * // typedef void (^JPUSHAliasOperationCompletion)(NSInteger iResCode, NSString *iAlias, NSInteger seq);
     *
     * + (void)setAlias:(NSString *)alias
     *       completion:(JPUSHAliasOperationCompletion)completion
     *              seq:(NSInteger)seq;
     *
     * @param alias 需要设置的alias
     * @param completion 响应回调
     * @param seq 请求序列号
     */
    public static setAliasCompletionSeq(alias: string,
                                        completion: (iResCode: number, iAlias: string, seq: number) => void,
                                        seq: number): void;

    /**
     *  删除alias
     *
     * + (void)deleteAlias:(JPUSHAliasOperationCompletion)completion
     *                 seq:(NSInteger)seq;
     *
     * @param completion 响应回调
     * @param seq 请求序列号
     */
    public static deleteAliasSeq(completion: (iResCode: number, iAlias: string, seq: number) => void,
                                 seq: number): void;

    /**
     *  查询当前alias
     *
     * + (void)getAlias:(JPUSHAliasOperationCompletion)completion
     *                 seq:(NSInteger)seq;
     *
     * @param completion
     * @param seq
     */
    public static getAliasSeq(completion: (iResCode: number, iAlias: string, seq: number) => void,
                              seq: number): void;

    /**
     * 过滤掉无效的 tags
     *
     *  + (NSSet *)filterValidTags:(NSSet *)tags;
     *
     * 如果 tags 数量超过限制数量, 则返回靠前的有效的 tags.
     * 建议设置 tags 前用此接口校验. SDK 内部也会基于此接口来做过滤.
     * @param tags
     */
    public static filterValidTags(tags: NSSet): NSSet;


    /**
     *  开启Crash日志收集
     *
     * + (void)crashLogON;
     *
     *  默认是关闭状态.
     */
    public static crashLogON(): void;

    /**
     * 地理位置上报
     *
     *  + (void)setLatitude:(double)latitude
     *            longitude:(double)longitude;
     *
     * @param latitude 纬度.
     * @param longitude 经度.
     */
    public static setLatitudeLongitude(latitude: number, longitude: number): void;

    /**
     *  地理位置上报
     * + (void)setLocation:(CLLocation *)location;
     *
     * @param location 直接传递 CLLocation * 型的地理信息
     *
     * @discussion 需要链接 CoreLocation.framework 并且 #import <CoreLocation/CoreLocation.h>
     */
    public static setLocation(location: CLLocation): void;


    /*----------------------------------------------------
    /// @name Local Notification 本地通知
    ///----------------------------------------------------
    */
    /**
     *  注册或更新推送 (支持iOS10，并兼容iOS10以下版本)
     *
     * + (void)addNotification:(JPushNotificationRequest *)request;
     *
     * JPush 2.1.9新接口
     * @param request JPushNotificationRequest类型，设置推送的属性，
     *  设置已有推送的request.requestIdentifier即更新已有的推送，否则为注册新推送，
     *  更新推送仅仅在iOS10以上有效，结果通过request.completionHandler返回
     *
     * @discussion 旧的注册本地推送接口被废弃，使用此接口可以替换
     *
     */
    public static addNotification(request: JPushNotificationRequest): void;

    /**
     *  移除推送 (支持iOS10，并兼容iOS10以下版本)
     *
     *  + (void)removeNotification:(JPushNotificationIdentifier *)identifier;
     *
     * JPush 2.1.9新接口
     * @param identifier JPushNotificationIdentifier类型，
     * iOS10以上identifier设置为nil，则移除所有在通知中心显示推送和待推送请求，
     * 也可以通过设置identifier.delivered和identifier.identifiers来移除相应在通知中心显示推送或待推送请求，
     * identifier.identifiers如果设置为nil或空数组则移除相应标志下所有在通知中心显示推送或待推送请求；
     *
     * iOS10以下identifier设置为nil，则移除所有推送，identifier.delivered属性无效，
     * 另外可以通过identifier.notificationObj传入特定推送对象来移除此推送。
     *
     * @discussion 旧的所有删除推送接口被废弃，使用此接口可以替换
     *
     */
    public static removeNotification(identifier: JPushNotificationIdentifier): void;

    /**
     * @abstract 查找推送 (支持iOS10，并兼容iOS10以下版本)
     *
     * + (void)findNotification:(JPushNotificationIdentifier *)identifier;
     *
     * JPush 2.1.9新接口
     * @param identifier JPushNotificationIdentifier类型，
     *      iOS10以上可以通过设置identifier.delivered和identifier.identifiers来查找相应在通知中心显示推送或待推送请求，
     *      identifier.identifiers如果设置为nil或空数组则返回相应标志下所有在通知中心显示推送或待推送请求；
     *
     *      iOS10以下identifier.delivered属性无效，
     *      identifier.identifiers如果设置nil或空数组则返回所有未触发的推送。
     *      须要设置identifier.findCompletionHandler回调才能得到查找结果，通过(NSArray *results)返回相应对象数组。
     *
     * @discussion 旧的查找推送接口被废弃，使用此接口可以替换
     *
     */
    public static findNotification(identifier: JPushNotificationIdentifier): void;


    /**
     * @abstract 前台展示本地推送
     *
     *
     + (void)showLocalNotificationAtFront:(UILocalNotification *)notification
     identifierKey:(NSString *)notificationKey __attribute__((deprecated("JPush 2.1.9 版本已过期")));
     *
     * @param notification 本地推送对象
     * @param notificationKey 需要前台显示的本地推送通知的标示符
     *
     * @discussion 默认App在前台运行时不会进行弹窗，在程序接收通知调用此接口可实现指定的推送弹窗。
     * --iOS10以下还可继续使用，
     * iOS10以上在[UNUserNotificationCenterDelegate willPresentNotification:withCompletionHandler:]
     * 方法中调用completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);即可
     *
     * @deprecated JPush 2.1.9 版本已过期
     */
    public static showLocalNotificationAtFrontIdentifierKey(notification: UILocalNotification, notificationKey: string): void;

    /*
    ///----------------------------------------------------
    /// @name Server badge 服务器端 badge 功能
    ///----------------------------------------------------
    */
    /**
     *  设置角标(到服务器)
     *
     *  + (BOOL)setBadge:(NSInteger)value;
     *
     * @param value 新的值. 会覆盖服务器上保存的值(这个用户)
     *
     * @discussion 本接口不会改变应用本地的角标值.
     * 本地仍须调用 UIApplication:setApplicationIconBadgeNumber 函数来设置脚标.
     *
     * 本接口用于配合 JPush 提供的服务器端角标功能.
     * 该功能解决的问题是, 服务器端推送 APNs 时, 并不知道客户端原来已经存在的角标是多少, 指定一个固定的数字不太合理.
     *
     * JPush 服务器端脚标功能提供:
     *
     * - 通过本 API 把当前客户端(当前这个用户的) 的实际 badge 设置到服务器端保存起来;
     * - 调用服务器端 API 发 APNs 时(通常这个调用是批量针对大量用户),
     *   使用 "+1" 的语义, 来表达需要基于目标用户实际的 badge 值(保存的) +1 来下发通知时带上新的 badge 值;
     */
    public static setBadge(value: number): boolean;

    /**
     * @abstract 重置脚标(为0)
     *
     * + (void)resetBadge;
     *
     * @discussion 相当于 [setBadge:0] 的效果.
     * 参考 [JPUSHService setBadge:] 说明来理解其作用.
     */
    public static resetBadge(): void;

    /*
    ///----------------------------------------------------
    /// @name Logs and others 日志与其他
    ///----------------------------------------------------
     */
    /**
     * @abstract JPush标识此设备的 registrationID
     *
     *  + (NSString *)registrationID;
     *
     * @discussion SDK注册成功后, 调用此接口获取到 registrationID 才能够获取到.
     *
     * JPush 支持根据 registrationID 来进行推送.
     * 如果你需要此功能, 应该通过此接口获取到 registrationID 后, 上报到你自己的服务器端, 并保存下来.
     * registrationIDCompletionHandler:是新增的获取registrationID的方法，需要在block中获取registrationID,
     * resCode为返回码,模拟器调用此接口resCode返回1011,registrationID返回nil.
     *
     * 更多的理解请参考 JPush 的文档网站.
     */
    public static registrationID(): string;

    /**
     * + (void)registrationIDCompletionHandler:(void(^)(int resCode,NSString *registrationID))completionHandler;
     *
     * @param completionHandler
     */
    public static registrationIDCompletionHandler(completionHandler: (resCode: number, registrationID: string) => void): void;

    /**
     * @abstract 打开日志级别到 Debug
     *
     * + (void)setDebugMode;
     *
     * @discussion JMessage iOS 的日志系统参考 Android 设计了级别.
     * 从低到高是: Verbose, Debug, Info, Warning, Error.
     * 对日志级别的进一步理解, 请参考 Android 相关的说明.
     *
     * SDK 默认开启的日志级别为: Info. 只显示必要的信息, 不打印调试日志.
     *
     * 调用本接口可打开日志级别为: Debug, 打印调试日志.
     */
    public static setDebugMode(): void;

    /**
     * @abstract 关闭日志
     *
     * + (void)setLogOFF;
     *
     * @discussion 关于日志级别的说明, 参考 [JPUSHService setDebugMode]
     *
     * 虽说是关闭日志, 但还是会打印 Warning, Error 日志. 这二种日志级别, 在程序运行正常时, 不应有打印输出.
     *
     * 建议在发布的版本里, 调用此接口, 关闭掉日志打印.
     */
    public static setLogOFF(): void;
}