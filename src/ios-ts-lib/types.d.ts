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
     *  注入的类别
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
    identifiers: [];
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
     * 用于查询回调，调用[findNotification:]方法前必须设置，results为返回相应对象数组，
     * iOS10以下返回UILocalNotification对象数组；
     * iOS10以上根据delivered传入值返回UNNotification或UNNotificationRequest对象数组
     *
     * （delivered传入YES，则返回UNNotification对象数组，否则返回UNNotificationRequest对象数组）
     */
    findCompletionHandler(): Array<UNNotification | UNNotificationRequest>;

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
     * @param calllback
     */
    completionHandler(calllback: (result: UNNotificationRequest | UILocalNotification) => void): void;


    copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    encodeWithCoder(aCoder: NSCoder): void;

    initWithCoder(aDecoder: NSCoder): NSCoding;
}

declare class JPUSHRegisterDelegate extends NSObject {
    /**
     *
     * @brief handle UserNotifications.framework [willPresentNotification:withCompletionHandler:]
     *
     * @param center [UNUserNotificationCenter currentNotificationCenter] 新特性用户通知中心
     * @param notification 前台得到的的通知对象
     * @param completionHandler 该callback中的options 请使用UNNotificationPresentationOptions
     */
    jpushNotificationCenter(center: UNUserNotificationCenter,
                            notification: UNNotification,
                            completionHandler: (options: number) => void): void;


    /**
     * @brief handle UserNotifications.framework [didReceiveNotificationResponse:withCompletionHandler:]
     * @param center [UNUserNotificationCenter currentNotificationCenter] 新特性用户通知中心
     * @param response 通知响应对象
     * @param completionHandler
     */
    jpushNotificationCenter(center: UNUserNotificationCenter,
                            response: UNNotificationResponse,
                            completionHandler: () => void): void;
}


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
     * @param launchingOption 启动参数.
     * @param appKey 一个JPush 应用必须的,唯一的标识. 请参考 JPush 相关说明文档来获取这个标识.
     * @param channel 发布渠道. 可选.
     * @param isProduction 是否生产环境. 如果为开发状态,设置为 NO; 如果为生产状态,应改为 YES.
     * @param advertisingIdentifier 广告标识符（IDFA） 如果不需要使用IDFA，传nil.
     */
    public static setupWithOption(launchingOption: NSDictionary<string, any>,
                                  appKey: string,
                                  channel: string,
                                  isProduction: boolean,
                                  advertisingIdentifier?: string): void;

    /*
    ///----------------------------------------------------
    /// @name APNs about 通知相关
    ///----------------------------------------------------

     */
    /**
     * 注册要处理的远程通知类型
     * @param types 通知类型
     * @param categories 类别组
     */
    public static registerForRemoteNotificationTypes(types: number, categories: NSSet<string>): void;

    /**
     *  新版本的注册方法（兼容iOS10）
     *
     * @param config 注册通知配置
     * @param delegate 代理
     *
     */
    public static registerForRemoteNotificationConfig(config: JPUSHRegisterEntity, delegate: JPUSHRegisterDelegate): void;

    public static registerDeviceToken(deviceToken: NSData): void;

    /**
     * 处理收到的 APNs 消息
     * @param remoteInfo
     */
    public static handleRemoteNotification(remoteInfo: NSDictionary<string, any>): void;

    // TODO 中间一些关于tag/alias就暂时先不处理了

    /**
     *  开启Crash日志收集
     *  默认是关闭状态.
     */
    public static crashLogON(): void;

    /**
     * 地理位置上报
     *
     * @param latitude 纬度.
     * @param longitude 经度.
     *
     */
    public static setLatitude(latitude: number, longitude: number): void;

    /**
     *  地理位置上报
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
     * JPush 2.1.9新接口
     * @param identifier JPushNotificationIdentifier类型，iOS10以上可以通过设置identifier.delivered和identifier.identifiers来查找相应在通知中心显示推送或待推送请求，identifier.identifiers如果设置为nil或空数组则返回相应标志下所有在通知中心显示推送或待推送请求；iOS10以下identifier.delivered属性无效，identifier.identifiers如果设置nil或空数组则返回所有推送。须要设置identifier.findCompletionHandler回调才能得到查找结果，通过(NSArray *results)返回相应对象数组。
     * @discussion 旧的查找推送接口被废弃，使用此接口可以替换
     *
     */
    public static findNotification(identifier: JPushNotificationIdentifier): void;

    /**
     * @abstract 前台展示本地推送
     *
     * @param notification 本地推送对象
     * @param notificationKey 需要前台显示的本地推送通知的标示符
     *
     * @discussion 默认App在前台运行时不会进行弹窗，在程序接收通知调用此接口可实现指定的推送弹窗。
     * --iOS10以下还可继续使用，
     * iOS10以上在[UNUserNotificationCenterDelegate willPresentNotification:withCompletionHandler:]
     * 方法中调用completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);即可
     */
    public static showLocalNotificationAtFront(notification: UILocalNotification, notificationKey: string): void;

    /*
    ///----------------------------------------------------
    /// @name Server badge 服务器端 badge 功能
    ///----------------------------------------------------
    */
    /**
     *  设置角标(到服务器)
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

    public static registrationIDCompletionHandler(completionHandler: (resCode: number, registrationID: string) => void): void;

    /**
     * @abstract 打开日志级别到 Debug
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
     * @discussion 关于日志级别的说明, 参考 [JPUSHService setDebugMode]
     *
     * 虽说是关闭日志, 但还是会打印 Warning, Error 日志. 这二种日志级别, 在程序运行正常时, 不应有打印输出.
     *
     * 建议在发布的版本里, 调用此接口, 关闭掉日志打印.
     */
    public static setLogOFF(): void;
}