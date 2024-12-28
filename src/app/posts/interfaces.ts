export interface IPost {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy?: number;
	createdById: string;
	text: string;
	username: string;
	userImg: string;
}
