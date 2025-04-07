/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { };

    @Post()
    @HttpCode(201)
    create(@Body() dto: UserDto) {
        const data = this.userService.addUser(dto);
        return data;
    }
    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        const data = this.userService.getUser();
        return data;
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        const data = this.userService.getUserById(id);
        return data;
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    updateById(@Param('id') id: string, @Body() dto: UserDto) {
        const data = this.userService.updateUserById(id, dto);
        return data;
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteById(@Param('id') id: string) {
        const data = this.userService.deleteUserById(id);
        return data;
    }
}


