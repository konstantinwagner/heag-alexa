export class HeagDepartureModel {
    constructor(public name: string,
                public shortName: string,
                public scheduledDeparture: Date,
                public expectedDeparture: Date,
                public destinationId: string,
                public destinationName: string) {

    }

}

