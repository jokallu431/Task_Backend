/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class AuthDto {

    @ApiProperty({
        description: 'Email',
        example: 'Joshua@gmail.com',
        required: true,
    })
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'Pass@123',
        required: true,
    })
    password: string;
}
