import { Types } from 'mongoose';

export class GameDto {
	id: Types.ObjectId;
	name: string;
	description: string;
	genre: string;
	developer: string;
	publisher: string;
	features: string[];
	platform: string[];
	releaseDate: Date;
	price: number;
	discount?: number;
	images: string[];

	constructor(model) {
		this.id = model.id;
		this.name = model.name;
		this.description = model.description;
		this.genre = model.genre;
		this.developer = model.developer;
		this.publisher = model.publisher;
		this.features = model.features;
		this.platform = model.platform;
		this.releaseDate = model.releaseDate;
		this.price = model.price;
		this.discount = model.discount;
		this.images = model.images;
	}
}
