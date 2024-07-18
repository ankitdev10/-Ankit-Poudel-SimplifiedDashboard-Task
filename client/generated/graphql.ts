import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreateProjectInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  dueDate: Scalars['DateTime']['input'];
  managerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  progress?: InputMaybe<Scalars['Int']['input']>;
  status: ProjectStatus;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateUserResult = User | UserAlreadyExistsError;

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Entity = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  UnknownError = 'UNKNOWN_ERROR',
  UserAlreadyExists = 'USER_ALREADY_EXISTS'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type LoginResult = InvalidCredentialsError | User;

export type MetricData = {
  __typename?: 'MetricData';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createUser: CreateUserResult;
  deleteProject: DeletionResponse;
  deleteUser: DeletionResponse;
  login: LoginResult;
  updateProject: Project;
  updateUser: User;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type PaginatedList = {
  items: Array<Entity>;
  totalItems: Scalars['Int']['output'];
};

export type PaginationOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Project = Entity & {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  manager: User;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  progress: Scalars['Int']['output'];
  status: ProjectStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectList = PaginatedList & {
  __typename?: 'ProjectList';
  items: Array<Project>;
  totalItems: Scalars['Int']['output'];
};

export type ProjectListOptions = {
  pagination?: InputMaybe<PaginationOptions>;
  status?: InputMaybe<ProjectStatus>;
};

export enum ProjectStatus {
  AtRisk = 'AT_RISK',
  Completed = 'COMPLETED',
  Delayed = 'DELAYED',
  Ongoing = 'ONGOING'
}

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  metrics: Array<Maybe<MetricData>>;
  project: Project;
  projects: ProjectList;
  users: UserList;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsArgs = {
  options?: InputMaybe<ProjectListOptions>;
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String']['output'];
  sucess: Scalars['Boolean']['output'];
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  managerId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ProjectStatus>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = Entity & {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAlreadyExistsError = ErrorResult & {
  __typename?: 'UserAlreadyExistsError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = PaginatedList & {
  __typename?: 'UserList';
  items: Array<User>;
  totalItems: Scalars['Int']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'InvalidCredentialsError', message: string } | { __typename?: 'User', id: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null };

export type MetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetricsQuery = { __typename?: 'Query', metrics: Array<{ __typename?: 'MetricData', type: string, value: string } | null> };

export type ProjectsQueryVariables = Exact<{
  options?: InputMaybe<ProjectListOptions>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectList', totalItems: number, items: Array<{ __typename?: 'Project', id: string, name: string, dueDate: any, status: ProjectStatus, progress: number, manager: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } }> } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidCredentialsError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<MetricsQuery, MetricsQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectListOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"manager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;