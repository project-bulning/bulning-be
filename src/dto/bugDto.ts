export interface BugPostModel {
    user_id?: string;
    title: string;
    bug_type: string;
    bug_size?: string;
    equipment?: string;
    note?: string;
    price?: string;
    bug_image_url?: string;
    created_at?: Date;
}