import {schedule} from './service/service-executor';
import {GetHeagStationsByNameService} from './service/Heag.service';

export default function () {
    schedule(GetHeagStationsByNameService, 'pallas').then(stations => console.log(stations));
}