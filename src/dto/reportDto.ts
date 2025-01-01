import { BugReport } from '@prisma/client';

export type CreateBugReportRequestBody = Omit<BugReport, 'id' | 'created_at' | 'status' | 'user_id'>

export type SimplifiedBugReport = Pick<BugReport, 'id' | 'created_at' | 'status' | 'bug_image_url' | 'price'>
export type GetBugReportsResponse = {
    bugReports: SimplifiedBugReport[];
}

export type GetBugReportDetailsResponse = BugReport;

