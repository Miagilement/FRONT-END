export class ForumComment {
    id ?: number;
    subject_id: number;
    text : string;
    author_id ?: string;
    dateComment ?: Date;
    dateLastModified ?: Date;
}