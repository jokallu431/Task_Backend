/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from './users.schema';
import { UserDto } from './users.dto';
import { error } from 'console';


@Injectable()
export class UsersService {
    constructor(@InjectModel(user.name) private userModel: Model<userDocument>) {}

    async addUser(dto:UserDto): Promise<user> {
        const user = new this.userModel({
            name:dto.name,
            email:dto.email,
            phoneNo:dto.phoneNo
        });
        console.log("user Created",user);
          return user.save();
    }

    async getUser(): Promise<user[]>{
        const user = this.userModel.find({});
        return user.find();
    }
    
    async getUserById(id:string): Promise<user>{
        const userList = await this.userModel.findById(id);
        console.log("One user",userList);
        if(!userList){
            throw new error("User Not Found ");
        }
        return userList;
    }

    async updateUserById(id:string,dto:UserDto): Promise<user>{
        const userList = await this.userModel.findByIdAndUpdate(id,dto,{new:true});

        console.log("One user",userList);
        if(!userList){
            throw new error("User Not Found ");
        }
        return userList;
    }

    async deleteUserById(id:string): Promise<user>{
        const userList = await this.userModel.findByIdAndDelete(id);
        console.log("One user",userList);
        if(!userList){
            throw new error("User Not Found ");
        }
        return userList;
    }
}
