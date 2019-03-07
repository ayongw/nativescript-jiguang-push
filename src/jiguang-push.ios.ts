import {Common} from './jiguang-push.common';

import {JPushNotificationTrigger} from './ios-ts-lib/types';

export class JiguangPush extends Common {
    /**
     * 获取SDK版本号
     */
    public static getVersion(): string {
        return "3.1.0";
    }
}



