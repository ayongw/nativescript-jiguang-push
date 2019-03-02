import {Common} from './jiguang-push.common';

export class JiguangPush extends Common {
    public getVersion(): string {
        let version = NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString");
        return version;
    }
}
