/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type userDocument = user & Document;

@Schema()
export class user {
    id: Types.ObjectId;
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNo: string;

    @Prop({ required: true })
    password: string;
}

export const userSchema = SchemaFactory.createForClass(user);