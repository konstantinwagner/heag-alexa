import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagStationListByNameService} from '../service/Heag.service';
import {dbService, matchesIntent} from './handler';

export const SetFavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return matchesIntent(input, 'SetFavoriteStationIntent');
    },

    async handle(input: HandlerInput): Promise<Response> {
        if (input.requestEnvelope.request.type !== 'IntentRequest' || !input.requestEnvelope.request.intent.slots || !input.requestEnvelope.session)
            throw new Error('Incompatible request type');

        const stationNeedle = input.requestEnvelope.request.intent.slots['stationNeedle'].value;
        const stations = await schedule(GetHeagStationListByNameService, stationNeedle);

        /*await dbService.putUser({
            userId: input.requestEnvelope.session.user.userId,
            favoriteStationId: '123abc', // TODO
            favoriteStationName: 'Teststation', // TODO
        });*/

        return input.responseBuilder
            .speak(stationNeedle)
            .addRenderTemplateDirective({
                type: 'ListTemplate1',
                title: 'Stationen',
                listItems: stations.map((station, i) => {
                    return {
                        token: 'station_' + i,
                        textContent: {
                            primaryText: {
                                type: 'PlainText' as 'PlainText',
                                text: station.name,
                            },
                        },
                    };
                }),
            })
            .getResponse();
    }
};
