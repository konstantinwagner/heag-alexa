import * as Ask from 'ask-sdk';
import {FavoriteStationHandler} from './FavoriteStation.handler';
import {HandlerInput} from 'ask-sdk-core';

export const alexa = Ask.SkillBuilders.custom()
    .addRequestHandlers(
        FavoriteStationHandler)
    .lambda();

export function matchesIntent(input: HandlerInput, intent: string): boolean {
    return input.requestEnvelope.request.type === 'IntentRequest' &&
        input.requestEnvelope.request.intent.name === intent;
}