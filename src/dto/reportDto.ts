import { BugReport } from '@prisma/client';

export type CreateBugReportRequestBody = Omit<BugReport, 'id' | 'created_at' | 'status' | 'user_id'>;
export type CreateBugReportResponse = {
    bug_report_id: number;
}

export type ProcessedBugReport = Pick<BugReport, 'id' | 'status' | 'bug_image_url' | 'price'>
  & { created_at: Date | string};
export type GetBugReportsResponse = {
    bug_reports: ProcessedBugReport[];
}

export type GetBugReportDetailsResponse = BugReport;

export interface CreateBugImageResponse {
    image_url: string;
}
