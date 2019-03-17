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
    alias: string;
    /**
     * 开发者传或查询得到的 tags。
     */
    tags: string[];
    /**
     * 开发者想要查询的 tag 与当前用户绑定的状态。
     */
    tagCheckStateResult: boolean;
    /**
     * 开发者想要查询绑定状态的 tag。
     */
    checkTag: string;
    /**
     * 开发者调用设置接口时传入的手机号码。
     */
    mobileNumber: string;
}


export class Common {
    private static apiSeq: number = 0;

    private aliasTagCallbacks: { [key: number]: any } = {};

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
    addAliasTagCallback(sequence: number, callback: (respData: AliasTagCallBackData) => void): void {
        this.aliasTagCallbacks[sequence] = callback;
    }

    /**
     * 移除指定请求序列对应的回调。
     *
     * @param sequence 开发者调用接口时传入的 sequence，
     */
    removeAliasTagCallback(sequence: number): void {
        delete this.aliasTagCallbacks[sequence];
    }
}

/**
 * Jpush sdk 初始化参数
 */
export class InitOption {
    badge: boolean;
    sound: boolean;
    alert: boolean;
    clearBadge: boolean;

}


// export class TestUtils {
//     public static SUCCESS_MSG(): string {
//         let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.!!!!!`;
//
//         setTimeout(() => {
//             dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
//         }, 2000);
//
//         return msg;
//     }
// }
