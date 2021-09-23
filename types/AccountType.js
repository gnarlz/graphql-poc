'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const HoldingType = require('./HoldingType')

const {
  holdingsByAccountResolver, clientByAccountResolver
  } = require('../resolve/resolvers')

const AccountType = new GraphQLObjectType({
    name: 'Account',
    description: 'This represents an Account of a Client within a Household within a Book Of Business belonging to a Rep',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      accountNumber: { type: GraphQLNonNull(GraphQLString) },
      clientId: { type: GraphQLNonNull(GraphQLInt) },
      
      // doing require inside the export to fix circular dependency (clients <-> accounts) problem
      // https://stackoverflow.com/a/45969196
      client: {
        type: require('./ClientType'),
        resolve: (account)  => clientByAccountResolver(account)
      },
  
      holdings: {
        type: new GraphQLList(HoldingType),
        resolve: (account)  => holdingsByAccountResolver(account)
      }

    })
  })

module.exports = AccountType