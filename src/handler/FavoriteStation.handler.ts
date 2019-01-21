import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagDepartureListService} from '../service/Heag.service';
import {matchesIntent} from './handler';

export const FavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return matchesIntent(input, 'FavoriteStationIntent');
    },

    async handle(input: HandlerInput): Promise<Response> {
        const departures = await schedule(GetHeagDepartureListService, '3024515');

        return input.responseBuilder
            .speak('hey ho bitte nicht der alte ' + departures[0].destinationName)
            .addRenderTemplateDirective({
                type: 'ListTemplate1',
                title: 'Abfahrten ab ...',
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