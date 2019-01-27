import * as Ask from 'ask-sdk';
import {FavoriteStationHandler} from './FavoriteStation.handler';
import {HandlerInput} from 'ask-sdk-core';
import {SetFavoriteStationHandler} from './SetFavoriteStation.handler';
import {DatabaseService} from '../service/Database.service';
import {LaunchHandler} from './Launch.handler';

const dbService = new DatabaseService();

export const alexa = Ask.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchHandler,
        SetFavoriteStationHandler,
        FavoriteStationHandler)
    .lambda();

export function matchesIntent(input: HandlerInput, intent: string): boolean {
    return input.requestEnvelope.request.type === 'IntentRequest' &&
        input.requestEnvelope.request.intent.name === intent;
}