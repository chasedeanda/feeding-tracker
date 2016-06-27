import { Mongo } from 'meteor/mongo';

export const Feeds = new Mongo.Collection('feeds');
export const Tasks = new Mongo.Collection('tasks');