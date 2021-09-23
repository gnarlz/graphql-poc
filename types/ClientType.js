'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const AccountType = require('./AccountType')

const {
  accountsByClientResolver, householdByClientResolver
  } = require('../resolve/resolvers')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    description: 'This represents a Client within a Household within a Book Of Business belonging to a Rep',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      nmuniqueid: { type: GraphQLNonNull(GraphQLString) },

      // doing require inside the export to fix circular dependency (household <-> clients) problem
      // https://stackoverflow.com/a/45969196
      householdId: { type: GraphQLNonNull(GraphQLInt) },
      household: {
        type: require('./HouseholdType'),
        resolve: (client)  => householdByClientResolver(client)
      },
        
      accounts: {
        type: new GraphQLList(AccountType),
        resolve: (client)  => accountsByClientResolver(client)
      }
    })
  })

  module.exports = ClientType