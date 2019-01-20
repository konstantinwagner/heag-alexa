import {GeoLocationModel} from '../GeoLocation.model';

export interface HeagStationModel {
    id: string;
    name: string;
    location: GeoLocationModel;
}