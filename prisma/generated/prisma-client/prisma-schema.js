module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.29.1). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateAllowedCalendar {
  count: Int!
}

type AggregateAuthed {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AllowedCalendar {
  id: ID!
  idCalendar: String
  createdAt: DateTime!
  from(where: AuthedWhereInput, orderBy: AuthedOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Authed!]
}

type AllowedCalendarConnection {
  pageInfo: PageInfo!
  edges: [AllowedCalendarEdge]!
  aggregate: AggregateAllowedCalendar!
}

input AllowedCalendarCreateInput {
  idCalendar: String
  from: AuthedCreateManyInput
}

type AllowedCalendarEdge {
  node: AllowedCalendar!
  cursor: String!
}

enum AllowedCalendarOrderByInput {
  id_ASC
  id_DESC
  idCalendar_ASC
  idCalendar_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AllowedCalendarPreviousValues {
  id: ID!
  idCalendar: String
  createdAt: DateTime!
}

type AllowedCalendarSubscriptionPayload {
  mutation: MutationType!
  node: AllowedCalendar
  updatedFields: [String!]
  previousValues: AllowedCalendarPreviousValues
}

input AllowedCalendarSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AllowedCalendarWhereInput
  AND: [AllowedCalendarSubscriptionWhereInput!]
  OR: [AllowedCalendarSubscriptionWhereInput!]
  NOT: [AllowedCalendarSubscriptionWhereInput!]
}

input AllowedCalendarUpdateInput {
  idCalendar: String
  from: AuthedUpdateManyInput
}

input AllowedCalendarUpdateManyMutationInput {
  idCalendar: String
}

input AllowedCalendarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  idCalendar: String
  idCalendar_not: String
  idCalendar_in: [String!]
  idCalendar_not_in: [String!]
  idCalendar_lt: String
  idCalendar_lte: String
  idCalendar_gt: String
  idCalendar_gte: String
  idCalendar_contains: String
  idCalendar_not_contains: String
  idCalendar_starts_with: String
  idCalendar_not_starts_with: String
  idCalendar_ends_with: String
  idCalendar_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  from_every: AuthedWhereInput
  from_some: AuthedWhereInput
  from_none: AuthedWhereInput
  AND: [AllowedCalendarWhereInput!]
  OR: [AllowedCalendarWhereInput!]
  NOT: [AllowedCalendarWhereInput!]
}

input AllowedCalendarWhereUniqueInput {
  id: ID
  idCalendar: String
}

type Authed {
  id: ID!
  tokenGoogle: String!
}

type AuthedConnection {
  pageInfo: PageInfo!
  edges: [AuthedEdge]!
  aggregate: AggregateAuthed!
}

input AuthedCreateInput {
  tokenGoogle: String!
}

input AuthedCreateManyInput {
  create: [AuthedCreateInput!]
  connect: [AuthedWhereUniqueInput!]
}

type AuthedEdge {
  node: Authed!
  cursor: String!
}

enum AuthedOrderByInput {
  id_ASC
  id_DESC
  tokenGoogle_ASC
  tokenGoogle_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AuthedPreviousValues {
  id: ID!
  tokenGoogle: String!
}

input AuthedScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tokenGoogle: String
  tokenGoogle_not: String
  tokenGoogle_in: [String!]
  tokenGoogle_not_in: [String!]
  tokenGoogle_lt: String
  tokenGoogle_lte: String
  tokenGoogle_gt: String
  tokenGoogle_gte: String
  tokenGoogle_contains: String
  tokenGoogle_not_contains: String
  tokenGoogle_starts_with: String
  tokenGoogle_not_starts_with: String
  tokenGoogle_ends_with: String
  tokenGoogle_not_ends_with: String
  AND: [AuthedScalarWhereInput!]
  OR: [AuthedScalarWhereInput!]
  NOT: [AuthedScalarWhereInput!]
}

type AuthedSubscriptionPayload {
  mutation: MutationType!
  node: Authed
  updatedFields: [String!]
  previousValues: AuthedPreviousValues
}

input AuthedSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AuthedWhereInput
  AND: [AuthedSubscriptionWhereInput!]
  OR: [AuthedSubscriptionWhereInput!]
  NOT: [AuthedSubscriptionWhereInput!]
}

input AuthedUpdateDataInput {
  tokenGoogle: String
}

input AuthedUpdateInput {
  tokenGoogle: String
}

input AuthedUpdateManyDataInput {
  tokenGoogle: String
}

input AuthedUpdateManyInput {
  create: [AuthedCreateInput!]
  update: [AuthedUpdateWithWhereUniqueNestedInput!]
  upsert: [AuthedUpsertWithWhereUniqueNestedInput!]
  delete: [AuthedWhereUniqueInput!]
  connect: [AuthedWhereUniqueInput!]
  set: [AuthedWhereUniqueInput!]
  disconnect: [AuthedWhereUniqueInput!]
  deleteMany: [AuthedScalarWhereInput!]
  updateMany: [AuthedUpdateManyWithWhereNestedInput!]
}

input AuthedUpdateManyMutationInput {
  tokenGoogle: String
}

input AuthedUpdateManyWithWhereNestedInput {
  where: AuthedScalarWhereInput!
  data: AuthedUpdateManyDataInput!
}

input AuthedUpdateWithWhereUniqueNestedInput {
  where: AuthedWhereUniqueInput!
  data: AuthedUpdateDataInput!
}

input AuthedUpsertWithWhereUniqueNestedInput {
  where: AuthedWhereUniqueInput!
  update: AuthedUpdateDataInput!
  create: AuthedCreateInput!
}

input AuthedWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tokenGoogle: String
  tokenGoogle_not: String
  tokenGoogle_in: [String!]
  tokenGoogle_not_in: [String!]
  tokenGoogle_lt: String
  tokenGoogle_lte: String
  tokenGoogle_gt: String
  tokenGoogle_gte: String
  tokenGoogle_contains: String
  tokenGoogle_not_contains: String
  tokenGoogle_starts_with: String
  tokenGoogle_not_starts_with: String
  tokenGoogle_ends_with: String
  tokenGoogle_not_ends_with: String
  AND: [AuthedWhereInput!]
  OR: [AuthedWhereInput!]
  NOT: [AuthedWhereInput!]
}

input AuthedWhereUniqueInput {
  id: ID
  tokenGoogle: String
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createAllowedCalendar(data: AllowedCalendarCreateInput!): AllowedCalendar!
  updateAllowedCalendar(data: AllowedCalendarUpdateInput!, where: AllowedCalendarWhereUniqueInput!): AllowedCalendar
  updateManyAllowedCalendars(data: AllowedCalendarUpdateManyMutationInput!, where: AllowedCalendarWhereInput): BatchPayload!
  upsertAllowedCalendar(where: AllowedCalendarWhereUniqueInput!, create: AllowedCalendarCreateInput!, update: AllowedCalendarUpdateInput!): AllowedCalendar!
  deleteAllowedCalendar(where: AllowedCalendarWhereUniqueInput!): AllowedCalendar
  deleteManyAllowedCalendars(where: AllowedCalendarWhereInput): BatchPayload!
  createAuthed(data: AuthedCreateInput!): Authed!
  updateAuthed(data: AuthedUpdateInput!, where: AuthedWhereUniqueInput!): Authed
  updateManyAutheds(data: AuthedUpdateManyMutationInput!, where: AuthedWhereInput): BatchPayload!
  upsertAuthed(where: AuthedWhereUniqueInput!, create: AuthedCreateInput!, update: AuthedUpdateInput!): Authed!
  deleteAuthed(where: AuthedWhereUniqueInput!): Authed
  deleteManyAutheds(where: AuthedWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  allowedCalendar(where: AllowedCalendarWhereUniqueInput!): AllowedCalendar
  allowedCalendars(where: AllowedCalendarWhereInput, orderBy: AllowedCalendarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AllowedCalendar]!
  allowedCalendarsConnection(where: AllowedCalendarWhereInput, orderBy: AllowedCalendarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AllowedCalendarConnection!
  authed(where: AuthedWhereUniqueInput!): Authed
  autheds(where: AuthedWhereInput, orderBy: AuthedOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Authed]!
  authedsConnection(where: AuthedWhereInput, orderBy: AuthedOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AuthedConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ROOT
  ADMIN
  USER
}

type Subscription {
  allowedCalendar(where: AllowedCalendarSubscriptionWhereInput): AllowedCalendarSubscriptionPayload
  authed(where: AuthedSubscriptionWhereInput): AuthedSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  password: String!
  email: String!
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
  slug: String
  image: String
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  password: String!
  email: String!
  role: Role
  slug: String
  image: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  email_ASC
  email_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  slug_ASC
  slug_DESC
  image_ASC
  image_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  password: String!
  email: String!
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
  slug: String
  image: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  password: String
  email: String
  role: Role
  slug: String
  image: String
}

input UserUpdateManyMutationInput {
  name: String
  password: String
  email: String
  role: Role
  slug: String
  image: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  name: String
  email: String
}
`
      }
    