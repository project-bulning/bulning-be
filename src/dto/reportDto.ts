import { BugReport } from '@prisma/client';

export type CreateBugReportRequestBody = Omit<BugReport, 'id' | 'created_at' | 'status' | 'user_id'>
& { location: string} & { location_detail : string};
export type CreateBugReportResponse = {
    bug_report_id: number;
}

export type ProcessedBugReport = Pick<BugReport, 'id' | 'title' | 'status' | 'bug_image_url' | 'price'>
& { location: string} & { created_at: Date | string} &{ distance: number};
export type GetBugReportsResponse = {
    bug_reports: ProcessedBugReport[];
}

export type GetBugReportDetailsResponse = Omit<BugReport, 'id' | 'created_at' | 'user_id'>
& { nickname: string} & { location: string} & { location_detail : string} & { created_at: Date | string};

export interface CreateBugImageResponse {
    image_url: string;
}

export type GetBugReportListRequestBody = {
    currentLatitude: number;
    currentLongitude: number;
}
