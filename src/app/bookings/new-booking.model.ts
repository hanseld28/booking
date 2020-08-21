export class NewBooking {
    constructor(
        public placeId: string,
        public placeTitle: string,
        public placeImage: string,
        public firstName: string,
        public lastName: string,
        public guestNumber: number,
        public bookedFrom: Date,
        public bookedTo: Date
    ) {}
}