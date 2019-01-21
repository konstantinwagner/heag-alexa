import {RequestService, RequestType} from './service-executor';
import {AxiosPromise} from 'axios';
import {HeagStationModel} from '../model/heag/HeagStation.model';
import {HeagDepartureModel} from '../model/heag/HeagDeparture.model';

const httpPrefix: string = (() => {
    if (process.env.VUE_APP_API_URL) {
        return process.env.VUE_APP_API_URL;
    }

    // Default url
    return 'https://routing.geomobile.de/test';
})();

export const GetHeagStationListByNameService: RequestService<string, void, any[], HeagStationModel[]> = {
    url: searchNeedle => httpPrefix + '/stations?name=' + searchNeedle + '&onlyStations=true&bundleIdentifier=de.ivanto.heagmobilo',
    type: RequestType.GET,

    preprocess: () => {},
    postprocess(response: AxiosPromise<any[]>): Promise<HeagStationModel[]> {
        return new Promise((accept, reject) => {
            // Await response / forward catch branch
            response.then(resolvedResponse => {
                const json = resolvedResponse.data;

                // Parse all returned stations
                accept(json.map(stationJson => {
                    return {
                        id: stationJson.id,
                        name: stationJson.name,
                        location: {
                            lat: parseFloat(stationJson.latitude),
                            lng: parseFloat(stationJson.longitude),
                        },
                    };
                }));
            }).catch(reason => reject(reason));
        });
    },
};

export const GetHeagDepartureListService: RequestService<string, void, any[], HeagDepartureModel[]> = {
    url: stationId => httpPrefix + '/departures?stationID=' + stationId + '&bundleIdentifier=de.ivanto.heagmobilo&sortBy=departureDate',
    type: RequestType.GET,

    preprocess: () => {},
    postprocess(response: AxiosPromise<any[]>): Promise<HeagDepartureModel[]> {
        return new Promise((accept, reject) => {
            // Await response / forward catch branch
            response.then(resolvedResponse => {
                const json = resolvedResponse.data;

                // Parse all returned departures
                accept(json.map(departureJson => {
                    return new HeagDepartureModel(
                        departureJson.lineName,
                        departureJson.shortName,
                        new Date(departureJson.departureDate),
                        new Date(departureJson.expectedDepartureDate),
                        departureJson.destinationID,
                        departureJson.destination);
                }));
            }).catch(reason => reject(reason));
        });
    },
};