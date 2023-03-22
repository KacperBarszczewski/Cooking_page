import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({require:true})
    name: string;
    @Prop({require:true, unique: true})
    email: string;
    @Prop({require:true})
    password: string;
    @Prop({require:true, default: false})
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);