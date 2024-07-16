export type Maybe<T> = T;
export type InputMaybe<T> = T;
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
  managerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
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
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS'
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

export type Project = Entity & {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  manager: User;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  progess: Scalars['Int']['output'];
  status: ProjectStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectList = PaginatedList & {
  __typename?: 'ProjectList';
  items: Array<Project>;
  totalItems: Scalars['Int']['output'];
};

export type ProjectListOptions = {
  manager: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
};

export enum ProjectStatus {
  AT_RISK = 'AT_RISK',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  ONGOING = 'ONGOING'
}

export type Query = {
  __typename?: 'Query';
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
