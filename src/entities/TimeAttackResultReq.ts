export interface TimeAttackResultReq {
    userName: string;
    mode: string;
    allTyping: number;
    clearTyping: number;
    maxContinuousTyping: number;
    perSecond: number;
    missType: number;
}
