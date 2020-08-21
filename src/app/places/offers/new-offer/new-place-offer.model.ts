export class NewPlaceOffer {
    constructor(
        public title: string, 
        public description: string,
        public price: number,
        public availableFrom: Date,
        public availableTo: Date
    ) {}
}