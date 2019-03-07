/**
 * 自定义的消息接受类
 */
@JavaProxy("com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver")
export class SequenceMessageReceiver extends cn.jpush.android.service.JPushMessageReceiver {
    private static aliaTagsCallBacks: { [key: number]: any } = {};

    public static addSeqCallback(seq: number, callback: any) {
        com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver.aliaTagsCallBacks[seq] = callback;
    }

    public static removeSeqCallback(seq: number): void {
        delete com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver.aliaTagsCallBacks[seq];
    }

    onTagOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void {
        this.processCall(jpushMessage);
    }

    onCheckTagOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void {
        this.processCall(jpushMessage);
    }

    onAliasOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void {
        this.processCall(jpushMessage);
    }

    onMobileNumberOperatorResult(context: android.content.Context, jpushMessage: cn.jpush.android.api.JPushMessage): void {
        this.processCall(jpushMessage);
    }

    /**
     * 进行事件回调
     * @param jpushMessage
     */
    private processCall(jpushMessage: cn.jpush.android.api.JPushMessage) {
        let seq = jpushMessage.getSequence();

        let func = SequenceMessageReceiver.getFunc(seq);
        if (null != func) {
            let tags: string[] = null;
            if (null != jpushMessage.getTags()) {
                tags = [];
                for (let k in jpushMessage.getTags()) {
                    tags.push(k);
                }
            }

            let data = {
                'respCode': jpushMessage.getErrorCode(),
                'seq': jpushMessage.getSequence(),
                'alias': jpushMessage.getAlias(),
                'checkTag': jpushMessage.getCheckTag(),
                'mobileNumber': jpushMessage.getMobileNumber(),
                'tagCheckStateResult': jpushMessage.getTagCheckStateResult(),
                'tags': tags
            };

            func(data);
        } else {
            console.log("no callback for sequence:" + seq);
        }
    }

    private static getFunc(seq: number) {
        return com.ayongw.nativescript.jiguangpush.SequenceMessageReceiver.aliaTagsCallBacks[seq];
    }
}