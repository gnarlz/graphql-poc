'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const {
  accountByHoldingResolver
  } = require('../resolve/resolvers')


const HoldingType = new GraphQLObjectType({
    name: 'Holding',
    description: 'This represents a Holding within an Account of a Client within a Household within a Book Of Business belonging to a Rep',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      ticker: { type: GraphQLNonNull(GraphQLString) },
      cusip: { type: GraphQLNonNull(GraphQLString) },
      shares: { type: GraphQLNonNull(GraphQLString) },
      fundFamily: { type: GraphQLNonNull(GraphQLString) },
      assetClass: { type: GraphQLNonNull(GraphQLString) },
      accountId: { type: GraphQLNonNull(GraphQLInt) },

      // doing require inside the export to fix circular dependency (accounts <-> holdings) problem
      // https://stackoverflow.com/a/45969196
      account: {
        type: require('./AccountType'),
        resolve: (holding)  => accountByHoldingResolver(holding)
      }
        
    })
  })

module.exports = HoldingType