import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagStationsByNameService} from '../service/Heag.service';

export const NextDeparturesHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return false;
    },

    async handle(input: HandlerInput): Promise<Response> {
        const stations = await schedule(GetHeagStationsByNameService, 'berliner allee');

        return input.responseBuilder
            .speak('hey ho bitte nicht der alte ' + stations[0].name)
            .getResponse();
    }
};