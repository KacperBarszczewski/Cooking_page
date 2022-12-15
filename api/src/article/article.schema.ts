import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: [String]})
    ingredients: string[];

    @Prop({type:Boolean,default: true})
    isVisible: boolean;

    @Prop({type: Date, default: Date.now})
    date: Date;

    @Prop({type: String})
    image: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);