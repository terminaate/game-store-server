import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class PatchUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	username?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	password?: string;
}
