'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const ClientType = require('./ClientType')

const {
  clientsByHouseholdResolver, bobByHouseholdResolver
  } = require('../resolve/resolvers')

const HouseholdType = new GraphQLObjectType({
    name: 'Household',
    description: 'This represents a Household within a Book Of Business belonging to a Rep',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      income: { type: GraphQLNonNull(GraphQLString) },
      bobId: { type: GraphQLNonNull(GraphQLInt) },

       // doing require inside the export to fix circular dependency (bob <-> household) problem
      // https://stackoverflow.com/a/45969196
      bob: {
        type: require('./BobType'),
        resolve: (household)  => bobByHouseholdResolver(household)
      },
      
      clients: {
        type: new GraphQLList(ClientType),
        // example of implementing filtering on a non-root element
        args: {
          nmuniqueid: { type: GraphQLString }
        },
        resolve: (household, args)  => clientsByHouseholdResolver(household, args)        
      }
    })
  })

module.exports = HouseholdType