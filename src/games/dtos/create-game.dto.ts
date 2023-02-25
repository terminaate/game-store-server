import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsDateString,
	IsMongoId,
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
import { Types } from 'mongoose';

export class CreateGameDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(500)
	description: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	genre: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	developer: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	publisher: string;

	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(4)
	features: string[];

	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(6)
	platform: string[];

	@IsDateString()
	releaseDate: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	@Max(100)
	@Min(0)
	discount?: number;

	@IsArray()
	@IsUrl({}, { each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(5)
	images: string[];

	@IsMongoId()
	author: Types.ObjectId;
}
