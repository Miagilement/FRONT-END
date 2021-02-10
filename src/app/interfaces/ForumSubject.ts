import {ForumTag} from './ForumTag';

export class ForumSubject {
    id : number;
    title : string;
    text : string;
    forumTagList: ForumTag[];
    authorId : string;
    authorName : string;
    datePost : Date;

    dateLastModified : Date;
    //Commit
}
