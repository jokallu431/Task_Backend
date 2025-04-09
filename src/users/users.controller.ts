/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
        Request,
        Res,
        UnauthorizedException,
        UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
 
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { };

    @Post()
    @HttpCode(201)
    create(@Body() dto: UserDto) {
        const data = this.userService.addUser(dto);
        return data;
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req ,@Res() response) {
        try {
            const userData = await this.userService.getUser();
            const userId = req.user?.userId;
            const result = {message: 'All users data found successfully', userData,userId};

    
            return response.status(HttpStatus.OK).json(
                result
            );
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Request() req ,@Param('id') id: string) {
        const userIdFromToken = req.user?.userId;
        if (!userIdFromToken) {
            throw new UnauthorizedException('User not found in token');
        }
        if (userIdFromToken !== id) {
          throw new UnauthorizedException('You are not authorized to update this user');
        }
        const data = this.userService.getUserById(id);
        return data;
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard)
    @Patch(':id')
    updateById(@Request() req ,@Param('id') id: string, @Body() dto: UserDto  ) {
        const userIdFromToken = req.user?.userId;
        if (!userIdFromToken) {
            throw new UnauthorizedException('User not found in token');
        }
        if (userIdFromToken !== id) {
          throw new UnauthorizedException('You are not authorized to update this user');
        }
        const data = this.userService.updateUserById(id, dto);
        return data;
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteById(@Request() req, @Param('id') id: string) {
        const userIdFromToken = req.user?.userId; // Extract userId from the token payload
    
        if (!userIdFromToken) {
            throw new UnauthorizedException('User not found in token');
        }
        if (userIdFromToken !== id) {
            throw new UnauthorizedException('You are not authorized to delete this user');
        }
        const data = this.userService.deleteUserById(id);
        return data;
    }
}


