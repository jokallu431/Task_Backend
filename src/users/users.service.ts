/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from './users.schema';
import { UserDto } from './users.dto';
import { error } from 'console';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(user.name) private userModel: Model<userDocument>) { }

    async addUser(dto: UserDto): Promise<user | null> {
        try {
            const existingUser = await this.userModel.findOne({
                $or: [{ email: dto.email }, { phoneNo: dto.phoneNo }]
            });
            if (existingUser) {
                return null
            }
            const hashPassword = await bcrypt.hash(dto.password, 10);
            const user = new this.userModel({
                name: dto.name,
                email: dto.email,
                phoneNo: dto.phoneNo,
                password: hashPassword,
            });
            return user.save();
        } catch (error) {
            console.log(error)
            throw new Error("An error occurred while creating the user. Please try again later.");
        }
    }

    async getUser(): Promise<user[] | null> {
        try {
            const user = await this.userModel.find({});
            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
            console.log(error)
            throw new Error("An error occurred while fetching users. Please try again later.");
        }
    }

    async getUserById(id: string): Promise<user | null> {
        try {
            const userList = await this.userModel.findById(id);
            if (!userList) {
                throw new error("User Not Found ");
            }
            return userList;
        } catch (error) {
            console.log(error)
            throw new Error("An error occurred while fetching the user.");
        }
    }

    async findByEmail(email:string): Promise<user | null> {
            const userList = await this.userModel.findOne({email:email});
            return userList;
    }

    async updateUserById(id: string, dto: UserDto): Promise<user | null> {

            const userList = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
            if (!userList) {
                throw new Error("User Not Found ");
            }
            return userList;
    }

    async deleteUserById(id: string): Promise<user> {
        try {
            const userList = await this.userModel.findByIdAndDelete(id);
            if (!userList) {
                throw new Error("User Not Found ");
            }
            return userList;
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while deleting the user.");
        }
    }
}
