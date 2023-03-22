
export interface  NewComment{
    name: string;
    text: string;
    article_id: string;
}

export type NewUser = Omit<NewComment, 'comment'>;