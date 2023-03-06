import { MongoClient } from 'mongodb';
import { recordOfCommands } from '../types.js';
export declare function projectCommandsHandler(mongoClient: MongoClient, mongoCollections: Readonly<string[]>, commandsSpecificOfProject: recordOfCommands<string>): void;
