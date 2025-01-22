export enum BlurpSenderType {
    Bot = 'bot',
    User = 'user'
}

export type Blurp = {
    id: number;
    source: BlurpSenderType;
    message: string;
}