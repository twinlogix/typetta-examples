import { ObjectId } from 'mongodb';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  MongoID: ObjectId;
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  creationDate: Scalars['Date'];
  id: Scalars['MongoID'];
  userId: Scalars['MongoID'];
  views: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  birthDate?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['MongoID'];
  lastName?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
};
