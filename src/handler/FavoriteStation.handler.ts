import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagDepartureListService} from '../service/Heag.service';

const timeOffset = 5;

export const FavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return true;
    },

    async handle(input: HandlerInput): Promise<Response> {
        const departures = await schedule(GetHeagDepartureListService, '3024515');

        const offsetDepartures = departures.filter(departure => departure.getDepartureIn() >= timeOffset);

        return input.responseBuilder
            .speak('Abfahrten ab Pallaswiesenstraße...')
            .addRenderTemplateDirective({
                type: 'ListTemplate1',
                title: 'Abfahrten ab ...',
                listItems: offsetDepartures.map((departure, i) => {
                    return {
                        token: 'departure_' + i,
                        textContent: {
                            primaryText: {
                                type: 'PlainText' as 'PlainText',
                                text: departure.destinationName,
                            },
                            secondaryText: {
                                type: 'PlainText' as 'PlainText',
                                text: departure.name + ' um ' + departure.getFormattedDeparture() +
                                    ' (' + departure.getScheduledDepartureIn()
                                    + (departure.isDelayed() ? ' + ' + departure.getDelay() + '' : '')
                                    + ' Minuten)',
                            },
                        },
                    };
                }),
            })
            .getResponse();
    }
};
