import {CustomSkillRequestHandler} from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';
import {Response} from 'ask-sdk-model';
import {HandlerInput} from 'ask-sdk-core';

export const LaunchHandler: CustomSkillRequestHandler = {
    canHandle(input: HandlerInput): Promise<boolean> | boolean {
        return input.requestEnvelope.request.type === 'LaunchRequest';
    },

    handle(input: HandlerInput): Promise<Response> | Response {
        return input.responseBuilder
            .reprompt('Hallo!')
            .getResponse();
    }
};
