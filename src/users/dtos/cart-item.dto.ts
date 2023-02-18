import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CartItemDto {
	@IsMongoId()
	gameId: Types.ObjectId;
}
