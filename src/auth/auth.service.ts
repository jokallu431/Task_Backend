/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private jwtService: JwtService
    ) {}

    async validateUserPassword(dto: AuthDto): Promise<{token:string}> {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        const isValid = await decrpyt(dto.password, user.password);
        if (!isValid) {
          throw new UnauthorizedException('Incorrect password');
        }
        // Create a payload with user details. You might want to include additional details like permissions.
        const payload = {
          userId: user.id,
          user_name: user.name,
          phoneNo: user.phoneNo,
        };
        console.log("payload",payload);
        
        const token =  {token : await this.jwtService.signAsync(payload),}
        return token;
      }
}
async function decrpyt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;

};

