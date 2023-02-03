import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
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
	@MinLength(6)
	password?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsUrl()
	avatar?: string;
}
