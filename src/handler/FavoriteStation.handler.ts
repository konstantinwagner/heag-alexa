import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';
import {schedule} from '../service/service-executor';
import {GetHeagDepartureListService} from '../service/Heag.service';
import {dbService} from './handler';

const timeOffset = 5;

export const FavoriteStationHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return true;
    },

    async handle(input: HandlerInput): Promise<Response> {
        if (!input.requestEnvelope.session)
            throw new Error('Incompatible request type');

        // try to fetch user for favorite station
        let user;
        try {
            user = await dbService.getUser(input.requestEnvelope.session.user.userId);
        } catch (e) {
            // simplified assume user is not existent
            return input.responseBuilder
                .speak('Du hast noch keinen Favoriten angelegt.')
                .getResponse();
        }

        // fetch next departures
        const departures = await schedule(GetHeagDepartureListService, user.favoriteStationId);
        const offsetDepartures = departures.filter(departure => departure.getDepartureIn() >= timeOffset);

        // respond with departure list
        return input.responseBuilder
            .speak('Abfahrten ab ' + user.favoriteStationName)
            .addRenderTemplateDirective({
                type: 'ListTemplate1',
                title: 'A',
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
