import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagDeparturesService} from '../service/Heag.service';

export const FavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return true;
    },

    async handle(input: HandlerInput): Promise<Response> {
        const departures = await schedule(GetHeagDeparturesService, '3024515');

        return input.responseBuilder
            .speak('hey ho bitte nicht der alte ' + departures.map(d => d.destinationName).join(', '))
            .getResponse();
    }
};