/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){};

    @Post()
    create(@Body() dto:UserDto){
        const data = this.userService.addUser(dto);
        console.log(data);
        return data;
    }

    @Get()
    findAll(){
        const data = this.userService.getUser();
        return data;
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        const data = this.userService.getUserById(id);
        return data;
    }

    @Patch(':id')
    updateById(@Param('id') id:string,@Body() dto:UserDto){
        const data = this.userService.updateUserById(id,dto);
        return data;
    }

    @Delete(':id')
    deleteById(@Param('id') id:string){
        const data = this.userService.deleteUserById(id);
        return data;
    }
}
