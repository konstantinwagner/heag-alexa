import {DynamoDB} from 'aws-sdk';
import {userTableName} from '../config/environment.config';
import {UserModel} from '../model/User.model';

export class DatabaseService {
    private db = new DynamoDB();

    async getUser(userId: string): Promise<UserModel> {
        const userDocument = (await this.db.getItem({
            TableName: userTableName,
            Key: {
                'userId': {
                    S: userId,
                },
            },
        }).promise()).Item;

        if (!userDocument)
            throw new Error('User does not exist');

        return {
            userId: userDocument['userId'].S || '', // TODO
            favoriteStationId: userDocument['favoriteStationId'].S || '', // TODO
            favoriteStationName: userDocument['favoriteStationName'].S || '', // TODO
        };
    }

    async putUser(user: UserModel): Promise<void> {
        await this.db.putItem({
            TableName: userTableName,
            Item: {
                'userId': {
                    'S': user.userId,
                },
                'favoriteStationId': {
                    'S': user.favoriteStationId,
                },
                'favoriteStationName': {
                    'S': user.favoriteStationName,
                },
            }
        }).promise();
    }
}