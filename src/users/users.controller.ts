/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { 
        Body, 
        Controller, 
        Delete, 
        Get, 
        HttpCode, 
        HttpStatus, 
        Param, 
        Patch, 
        Post,
        Res,
        UseGuards 
} from '@nestjs/common';
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
    async findAll(@Res() response) {
        // const data = this.userService.getUser();
        // return data;
        try {
            const userData = await this.userService.getUser();
            const result = {message: 'All users data found successfully', userData}
            return response.status(HttpStatus.OK).json(
                result
            );
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
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


