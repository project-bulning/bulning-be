import { BugReport } from '@prisma/client';

export type CreateBugReportRequestBody = Omit<BugReport, 'id' | 'created_at' | 'status' | 'user_id'>;
export type CreateBugReportResponse = {
    bug_report_id: number;
}

export type SimplifiedBugReport = Pick<BugReport, 'id' | 'created_at' | 'status' | 'bug_image_url' | 'price'>;
export type GetBugReportsResponse = {
    bug_reports: SimplifiedBugReport[];
}

export type GetBugReportDetailsResponse = BugReport;

export interface CreateBugImageResponse {
    image_url: string;
}

