export interface TimeAttackResultRes {
    resultId: number;
    userName: string;
    mode: string;
    allTyping: number;
    clearTyping: number;
    maxContinuousTyping: number;
    perSecond: number;
    missType: number;
    date: string;
}
