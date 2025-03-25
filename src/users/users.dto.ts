/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class UserDto {

    @ApiProperty({
        description: 'Name',
        example:'Joshua',
        required: true,
    })
    name ?: string;


    @ApiProperty({
        description: 'Email',
        example:'Joshua@gmail.com',
        required: true,
    })
    email ?: string;

    @ApiProperty({
        description: 'Phone No',
        example:'9921364821',
        required: true,
    })
    phoneNo ?: string;
}
