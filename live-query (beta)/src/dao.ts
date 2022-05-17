import { DAOMiddleware, Coordinates, UserInputDriverDataTypeAdapterMap, Schema, AbstractDAOContext, LogicalOperators, QuantityOperators, EqualityOperators, StringOperators, ElementOperators, OneKey, SortDirection, overrideRelations, userInputDataTypeAdapterToDataTypeAdapter, LogFunction, LogInput, logInputToLogger, ParamProjection, DAOGenerics, CRUDPermission, DAOContextSecurtyPolicy, createSecurityPolicyMiddlewares, SelectProjection, mergeProjections, AbstractInMemoryDAO, InMemoryDAOGenerics, InMemoryDAOParams } from '@twinlogix/typetta'
import * as types from './models'
import { MongoDBDAOGenerics, MongoDBDAOParams, AbstractMongoDBDAO } from '@twinlogix/typetta'
import { Collection, Db, Filter, Sort, UpdateFilter, Document } from 'mongodb'

//--------------------------------------------------------------------------------
//------------------------------------- POST -------------------------------------
//--------------------------------------------------------------------------------

export type PostExcludedFields = never
export type PostRelationFields = never

export function postSchema(): Schema<types.Scalars> {
  return {
    'content': {
      scalar: 'String'
    },
    'creationDate': {
      scalar: 'Date', 
      required: true
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'userId': {
      scalar: 'ID', 
      required: true
    },
    'views': {
      scalar: 'Int', 
      required: true
    }
  }
}

type PostFilterFields = {
  'content'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'creationDate'?: types.Scalars['Date'] | null | EqualityOperators<types.Scalars['Date']> | ElementOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'userId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'views'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type PostFilter = PostFilterFields & LogicalOperators<PostFilterFields | PostRawFilter>
export type PostRawFilter = () => Filter<Document>

export type PostRelations = Record<never, string>

export type PostProjection = {
  content?: boolean,
  creationDate?: boolean,
  id?: boolean,
  userId?: boolean,
  views?: boolean,
}
export type PostParam<P extends PostProjection> = ParamProjection<types.Post, PostProjection, P>

export type PostSortKeys = 'content' | 'creationDate' | 'id' | 'userId' | 'views'
export type PostSort = OneKey<PostSortKeys, SortDirection>
export type PostRawSort = () => Sort

export type PostUpdate = {
  'content'?: types.Scalars['String'] | null,
  'creationDate'?: types.Scalars['Date'],
  'id'?: types.Scalars['ID'],
  'userId'?: types.Scalars['ID'],
  'views'?: types.Scalars['Int']
}
export type PostRawUpdate = () => UpdateFilter<Document>

export type PostInsert = {
  content?: null | types.Scalars['String'],
  creationDate: types.Scalars['Date'],
  id?: null | types.Scalars['ID'],
  userId: types.Scalars['ID'],
  views: types.Scalars['Int'],
}

type PostDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.Post, 'id', 'ID', PostFilter, PostRawFilter, PostRelations, PostProjection, PostSort, PostRawSort, PostInsert, PostUpdate, PostRawUpdate, PostExcludedFields, PostRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'post', DAOContext<MetadataType, OperationMetadataType>>
export type PostDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<PostDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryPostDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<PostDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class PostDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<PostDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostProjection, P2 extends PostProjection>(p1: P1, p2: P2): SelectProjection<PostProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<PostProjection, P1, P2>
  }
  
  public constructor(params: PostDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryPostDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<PostDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostProjection, P2 extends PostProjection>(p1: P1, p2: P2): SelectProjection<PostProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<PostProjection, P1, P2>
  }
  
  public constructor(params: InMemoryPostDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------ QUERY -------------------------------------
//--------------------------------------------------------------------------------

export function querySchema(): Schema<types.Scalars> {
  return {
    'users': { embedded: userSchema(), required: true, array: true }
  }
}

export type QueryProjection = {
  users?: {
    birthDate?: boolean,
    firstName?: boolean,
    id?: boolean,
    lastName?: boolean,
    posts?: PostProjection | boolean,
  } | boolean,
}
export type QueryParam<P extends QueryProjection> = ParamProjection<types.Query, QueryProjection, P>

export type QueryInsert = {
  users: (null | UserInsert)[],
}



//--------------------------------------------------------------------------------
//--------------------------------- SUBSCRIPTION ---------------------------------
//--------------------------------------------------------------------------------

export function subscriptionSchema(): Schema<types.Scalars> {
  return {
    'users': { embedded: userSchema(), required: true, array: true }
  }
}

export type SubscriptionProjection = {
  users?: {
    birthDate?: boolean,
    firstName?: boolean,
    id?: boolean,
    lastName?: boolean,
    posts?: PostProjection | boolean,
  } | boolean,
}
export type SubscriptionParam<P extends SubscriptionProjection> = ParamProjection<types.Subscription, SubscriptionProjection, P>

export type SubscriptionInsert = {
  users: (null | UserInsert)[],
}



//--------------------------------------------------------------------------------
//------------------------------------- USER -------------------------------------
//--------------------------------------------------------------------------------

export type UserExcludedFields = never
export type UserRelationFields = 'posts'

export function userSchema(): Schema<types.Scalars> {
  return {
    'birthDate': {
      scalar: 'Date'
    },
    'firstName': {
      scalar: 'String'
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'lastName': {
      scalar: 'String'
    }
  }
}

type UserFilterFields = {
  'birthDate'?: types.Scalars['Date'] | null | EqualityOperators<types.Scalars['Date']> | ElementOperators,
  'firstName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'lastName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators
}
export type UserFilter = UserFilterFields & LogicalOperators<UserFilterFields | UserRawFilter>
export type UserRawFilter = () => Filter<Document>

export type UserRelations = {
  posts?: {
    filter?: PostFilter
    sorts?: PostSort[] | PostRawSort
    skip?: number
    limit?: number
    relations?: PostRelations
  }
}

export type UserProjection = {
  birthDate?: boolean,
  firstName?: boolean,
  id?: boolean,
  lastName?: boolean,
  posts?: PostProjection | boolean,
}
export type UserParam<P extends UserProjection> = ParamProjection<types.User, UserProjection, P>

export type UserSortKeys = 'birthDate' | 'firstName' | 'id' | 'lastName'
export type UserSort = OneKey<UserSortKeys, SortDirection>
export type UserRawSort = () => Sort

export type UserUpdate = {
  'birthDate'?: types.Scalars['Date'] | null,
  'firstName'?: types.Scalars['String'] | null,
  'id'?: types.Scalars['ID'],
  'lastName'?: types.Scalars['String'] | null
}
export type UserRawUpdate = () => UpdateFilter<Document>

export type UserInsert = {
  birthDate?: null | types.Scalars['Date'],
  firstName?: null | types.Scalars['String'],
  id?: null | types.Scalars['ID'],
  lastName?: null | types.Scalars['String'],
}

type UserDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.User, 'id', 'ID', UserFilter, UserRawFilter, UserRelations, UserProjection, UserSort, UserRawSort, UserInsert, UserUpdate, UserRawUpdate, UserExcludedFields, UserRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'user', DAOContext<MetadataType, OperationMetadataType>>
export type UserDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryUserDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class UserDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends UserProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends UserProjection, P2 extends UserProjection>(p1: P1, p2: P2): SelectProjection<UserProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<UserProjection, P1, P2>
  }
  
  public constructor(params: UserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema(), 
      relations: overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'posts', refFrom: 'userId', refTo: 'id', dao: 'post', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryUserDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends UserProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends UserProjection, P2 extends UserProjection>(p1: P1, p2: P2): SelectProjection<UserProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<UserProjection, P1, P2>
  }
  
  public constructor(params: InMemoryUserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema(), 
      relations: overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'posts', refFrom: 'userId', refTo: 'id', dao: 'post', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }


export type DAOContextParams<MetadataType, OperationMetadataType, Permissions extends string, SecurityDomain extends object> = {
  metadata?: MetadataType
  middlewares?: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  overrides?: { 
    post?: Pick<Partial<PostDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    user?: Pick<Partial<UserDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>
  },
  mongodb: Record<'default', Db | 'mock'>,
  scalars?: UserInputDriverDataTypeAdapterMap<types.Scalars, 'mongo'>,
  log?: LogInput<'post' | 'user'>,
  security?: DAOContextSecurtyPolicy<DAOGenericsMap<MetadataType, OperationMetadataType>, OperationMetadataType, Permissions, SecurityDomain>
}

type DAOContextMiddleware<MetadataType = never, OperationMetadataType = never> = DAOMiddleware<DAOGenericsUnion<MetadataType, OperationMetadataType>>

export class DAOContext<MetadataType = never, OperationMetadataType = never, Permissions extends string = never, SecurityDomain extends object = never> extends AbstractDAOContext<types.Scalars, MetadataType>  {

  private _post: PostDAO<MetadataType, OperationMetadataType> | undefined
  private _user: UserDAO<MetadataType, OperationMetadataType> | undefined
  
  private overrides: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>['overrides']
  private mongodb: Record<'default', Db | 'mock'>
  
  private middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  
  private logger?: LogFunction<'post' | 'user'>
  
  get post() : PostDAO<MetadataType, OperationMetadataType> {
    if(!this._post) {
      const db = this.mongodb.default
      this._post = db === 'mock' ? (new InMemoryPostDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.post, middlewares: [...(this.overrides?.post?.middlewares || []), ...selectMiddleware('post', this.middlewares) as DAOMiddleware<PostDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'post', logger: this.logger }) as unknown as PostDAO<MetadataType, OperationMetadataType>) : new PostDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.post, collection: db.collection('posts'), middlewares: [...(this.overrides?.post?.middlewares || []), ...selectMiddleware('post', this.middlewares) as DAOMiddleware<PostDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'post', logger: this.logger })
    }
    return this._post
  }
  get user() : UserDAO<MetadataType, OperationMetadataType> {
    if(!this._user) {
      const db = this.mongodb.default
      this._user = db === 'mock' ? (new InMemoryUserDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.user, middlewares: [...(this.overrides?.user?.middlewares || []), ...selectMiddleware('user', this.middlewares) as DAOMiddleware<UserDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'user', logger: this.logger }) as unknown as UserDAO<MetadataType, OperationMetadataType>) : new UserDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.user, collection: db.collection('users'), middlewares: [...(this.overrides?.user?.middlewares || []), ...selectMiddleware('user', this.middlewares) as DAOMiddleware<UserDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'user', logger: this.logger })
    }
    return this._user
  }
  
  constructor(params: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>) {
    super({
      ...params,
      scalars: params.scalars ? userInputDataTypeAdapterToDataTypeAdapter(params.scalars, ['Date', 'ID', 'String', 'Boolean', 'Int', 'Float']) : undefined
    })
    this.overrides = params.overrides
    this.mongodb = params.mongodb
    this.middlewares = params.middlewares || []
    this.logger = logInputToLogger(params.log)
    if(params.security && params.security.applySecurity !== false) {
      const securityMiddlewares = createSecurityPolicyMiddlewares(params.security)
      const defaultMiddleware = securityMiddlewares.others ? [groupMiddleware.excludes(Object.fromEntries(Object.keys(securityMiddlewares.middlewares).map(k => [k, true])) as any, securityMiddlewares.others as any)] : []
      this.middlewares = [...(params.middlewares ?? []), ...defaultMiddleware, ...Object.entries(securityMiddlewares.middlewares).map(([name, middleware]) => groupMiddleware.includes({[name]: true} as any, middleware as any))]
    }
  }
  
  public async execQuery<T>(run: (dbs: { mongodb: Record<'default', Db | 'mock'> }, entities: { post: Collection<Document> | null, user: Collection<Document> | null }) => Promise<T>): Promise<T> {
    return run({ mongodb: this.mongodb }, { post: this.mongodb.default === 'mock' ? null : this.mongodb.default.collection('posts'), user: this.mongodb.default === 'mock' ? null : this.mongodb.default.collection('users') })
  }
  
  

}


//--------------------------------------------------------------------------------
//------------------------------------- UTILS ------------------------------------
//--------------------------------------------------------------------------------

type DAOName = keyof DAOGenericsMap<never, never>
type DAOGenericsMap<MetadataType, OperationMetadataType> = {
  post: PostDAOGenerics<MetadataType, OperationMetadataType>
  user: UserDAOGenerics<MetadataType, OperationMetadataType>
}
type DAOGenericsUnion<MetadataType, OperationMetadataType> = DAOGenericsMap<MetadataType, OperationMetadataType>[DAOName]
type GroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> =
  | IncludeGroupMiddleware<N, MetadataType, OperationMetadataType>
  | ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>
type IncludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  include: { [K in N]: true }
  middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>
}
type ExcludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  exclude: { [K in N]: true }
  middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[Exclude<DAOName, N>]>
}
export const groupMiddleware = {
  includes<N extends DAOName, MetadataType, OperationMetadataType>(
    include: { [K in N]: true },
    middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>,
  ): IncludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { include, middleware }
  },
  excludes<N extends DAOName, MetadataType, OperationMetadataType>(
    exclude: { [K in N]: true },
    middleware: ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>['middleware'],
  ): ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { exclude, middleware }
  },
}
function selectMiddleware<MetadataType, OperationMetadataType>(
  name: DAOName,
  middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<DAOName, MetadataType, OperationMetadataType>)[],
): DAOContextMiddleware<MetadataType, OperationMetadataType>[] {
  return middlewares.flatMap((m) =>
    'include' in m
      ? Object.keys(m.include).includes(name)
        ? [m.middleware]
        : []
      : 'exclude' in m
      ? !Object.keys(m.exclude).includes(name)
        ? [m.middleware as DAOContextMiddleware<MetadataType, OperationMetadataType>]
        : []
      : [m],
  )
}
