export interface HeagDepartureModel {
    name: string;
    shortName: string;

    scheduledDeparture: Date;
    expectedDeparture: Date;

    destinationId: string;
    destinationName: string;
}