export type TradeAcceptParams = {
    matchId: number;
}

export type TradeAcceptBody = {
    trade: boolean;
}
  
export type GetBugReportPriceResponse = Pick<BugReport, 'price'>