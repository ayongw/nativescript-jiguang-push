// import * as app from 'tns-core-modules/application';
// import * as dialogs from 'tns-core-modules/ui/dialogs';

export class Common {
    private static apiSeq: number = 0;

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
