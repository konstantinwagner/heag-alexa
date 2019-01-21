import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagDeparturesService} from '../service/Heag.service';

export const FavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return input.requestEnvelope.request.type === 'IntentRequest' &&
            input.requestEnvelope.request.intent.name === 'FavoriteStationIntent';
    },

    async handle(input: HandlerInput): Promise<Response> {
        const departures = await schedule(GetHeagDeparturesService, '3024515');

        return input.responseBuilder
            .speak('hey ho bitte nicht der alte ' + departures[0].destinationName)
            .addRenderTemplateDirective({
                type: 'ListTemplate1',
                title: 'hello',
                listItems: departures.map((departure, i) => {
                    return {
                        token: 'departure_' + i,
                        textContent: {
                            primaryText: {
                                type: 'PlainText' as 'PlainText',
                                text: departure.destinationName,
                            },
                            secondaryText: {
                                type: 'PlainText' as 'PlainText',
                                text: departure.name,
                            },
                        },
                    };
                }),
            })
            .getResponse();
    }
};