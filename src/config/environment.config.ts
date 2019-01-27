export const userTableName: string = (() => {
    if (process.env.USER_TABLE)
        return process.env.USER_TABLE;

    // Default table # TODO Remove
    return "heag-alexa-dev-user";
})();