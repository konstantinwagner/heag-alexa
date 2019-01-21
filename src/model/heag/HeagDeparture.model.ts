export class HeagDepartureModel {
    constructor(public name: string,
                public shortName: string,
                public scheduledDeparture: Date,
                public expectedDeparture: Date,
                public destinationId: string,
                public destinationName: string) {

    }

    public getDepartureIn(): number {
        return Math.floor((this.expectedDeparture.getTime() - Date.now()) / 1000 / 60);
    }

    public getDelay(): number {
        return Math.floor((this.expectedDeparture.getTime() - this.scheduledDeparture.getTime()) / 1000 / 60);
    }

    public isDelayed(): boolean {
        return this.getDelay() > 0;
    }

}

