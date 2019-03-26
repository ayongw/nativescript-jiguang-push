import {AliasTagCallBackData, Common, InitOption} from './jiguang-push.common';

export declare class JiguangPush extends Common {
    // define your typings manually
    // or..
    // take the ios or android .d.ts files and copy/paste them here

    /**
     * get the sdk version
     */
    public static getVersion(): string;

    /**
     * 初始化sdk
     */
    public static init(options: InitOption): void;

    /**
     * 获取别名
     */
    public static getAlias(): Promise<AliasTagCallBackData>;

    /**
     * 设置别名
     * @param alias 新的别名
     */
    public static setAlias(alias: string): Promise<AliasTagCallBackData>;

    /**
     * 删除别名
     */
    public static deleteAlias(): Promise<AliasTagCallBackData>;

}
