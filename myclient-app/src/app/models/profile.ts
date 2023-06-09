import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    // followersCount: number;
    // followingCount: number;
    // following: boolean;
    bio?: string;
    // photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}
