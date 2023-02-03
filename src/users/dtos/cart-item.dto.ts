import { IsString } from 'class-validator';

export class CartItemDto {
	@IsString()
	gameId: string;
}