## 为 AppDelegate 添加 Delegate。
    @interface AppDelegate ()<JPUSHRegisterDelegate>

    @end

## 添加初始化 APNs 代码
    //Required
    //notice: 3.0.0 及以后版本注册可以这样写，也可以继续用之前的注册方式
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound
                    |JPAuthorizationOptionProvidesAppNotificationSettings;
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    // 可以添加自定义 categories
    // NSSet<UNNotificationCategory *> *categories for iOS10 or later
    // NSSet<UIUserNotificationCategory *> *categories for iOS8 and iOS9
    }
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];

## 添加初始化 JPush 代码
    请将以下代码添加到 -(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      // Optional
      // 获取 IDFA
      // 如需使用 IDFA 功能请添加此代码并在初始化方法的 advertisingIdentifier 参数中填写对应值
      NSString *advertisingId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    
      // Required
      // init Push
      // notice: 2.1.5 版本的 SDK 新增的注册方法，改成可上报 IDFA，如果没有使用 IDFA 直接传 nil
      // 如需继续使用 pushConfig.plist 文件声明 appKey 等配置内容，请依旧使用 [JPUSHService setupWithOption:launchOptions] 方式初始化。
      [JPUSHService setupWithOption:launchOptions appKey:appKey
                            channel:channel
                   apsForProduction:isProduction
              advertisingIdentifier:advertisingId];

## 注册 APNs 成功并上报 DeviceToken
    请在 AppDelegate.m 实现该回调方法并添加回调方法中的代码
    - (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    
      /// Required - 注册 DeviceToken
      [JPUSHService registerDeviceToken:deviceToken];
    }

## 实现注册 APNs 失败接口（可选）
    - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
      //Optional
      NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
    }

## 添加处理 APNs 通知回调方法
    请在 AppDelegate.m 实现该回调方法并添加回调方法中的代码
    #pragma mark- JPUSHRegisterDelegate
    
    // iOS 12 Support
    - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(UNNotification *)notification{
      if (notification && [notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //从通知界面直接进入应用
      }else{
        //从通知设置界面进入应用
      }
    }

    // iOS 10 Support
    - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
      // Required
      NSDictionary * userInfo = notification.request.content.userInfo;
      if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
      }
      completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有 Badge、Sound、Alert 三种类型可以选择设置
    }
    
    // iOS 10 Support
    - (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
      // Required
      NSDictionary * userInfo = response.notification.request.content.userInfo;
      if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
      }
      completionHandler();  // 系统要求执行这个方法
    }
    
    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    
      // Required, iOS 7 Support
      [JPUSHService handleRemoteNotification:userInfo];
      completionHandler(UIBackgroundFetchResultNewData);
    }
    
    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    
      // Required, For systems with less than or equal to iOS 6
      [JPUSHService handleRemoteNotification:userInfo];
    }
    
## JPush SDK 相关事件监听
    建议开发者加上 API 里面提供的以下类型的通知：
    
    extern NSString *const kJPFNetworkIsConnectingNotification; // 正在连接中
    
    extern NSString * const kJPFNetworkDidSetupNotification; // 建立连接
    
    extern NSString * const kJPFNetworkDidCloseNotification; // 关闭连接
    
    extern NSString * const kJPFNetworkDidRegisterNotification; // 注册成功
    
    extern NSString *const kJPFNetworkFailedRegisterNotification; //注册失败
    
    extern NSString * const kJPFNetworkDidLoginNotification; // 登录成功
    
    温馨提示： 
    Registration id 需要添加注册 kJPFNetworkDidLoginNotification 通知的方法里获取，也可以调用 [registrationIDCompletionHandler:] 方法，通过 completionHandler 获取
    
    extern NSString * const kJPFNetworkDidReceiveMessageNotification; // 收到自定义消息(非 APNs)
    
    其中，kJPFNetworkDidReceiveMessageNotification 传递的数据可以通过 NSNotification 中的 userInfo 方法获取，包括标题、内容、extras 信息等