export interface Article {
    title: string;
    description: string;
    ingredients: string[];
    isVisible:boolean;
    image?:string;
}

export interface ArticleDocument extends Article{
    _id: string;
    __v: number;
}