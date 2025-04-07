/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, 
         Controller, 
         Post, 
         UnauthorizedException,
         Get,
         HttpCode,
         HttpStatus,
         Request,
         UseGuards
        } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async findOneEmail(@Body() dto: AuthDto) {
        const token = await this.authService.validateUserPassword(dto);
        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { token };
    }
}
