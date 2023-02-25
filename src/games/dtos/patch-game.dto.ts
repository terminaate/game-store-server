import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';

export class PatchGameDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	name?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(500)
	description?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	genre?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	developer?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	publisher?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(4)
	features?: string[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(6)
	platform?: string[];

	@IsOptional()
	@IsDateString()
	releaseDate?: Date;

	@IsOptional()
	@IsNumber()
	price?: number;

	@IsOptional()
	@IsOptional()
	@IsNumber()
	@Max(100)
	@Min(0)
	discount?: number;

	@IsOptional()
	@IsArray()
	@IsUrl({}, { each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(5)
	images?: string[];
}
