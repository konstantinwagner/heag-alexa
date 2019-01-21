import * as Ask from 'ask-sdk';
import {NextDeparturesHandler} from './NextDepartures.handler';
import {FavoriteStationHandler} from './FavoriteStation.handler';

export const alexa = Ask.SkillBuilders.custom()
    .addRequestHandlers(
        NextDeparturesHandler,
        FavoriteStationHandler)
    .lambda();