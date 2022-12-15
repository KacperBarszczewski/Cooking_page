export interface Comment {
    name: string,
    text: string,
    article_id: string,
    isVisible?: boolean,
}

export interface CommentDocument extends Comment{
    _id?: string;
    __v?: number;
}