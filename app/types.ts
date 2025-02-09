export enum BlurpSenderType {
    Bot = 'bot',
    User = 'user'
}

export type Blurp = {
    id: string;
    source: BlurpSenderType;
    message: string;
}