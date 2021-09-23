'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')
  
const HouseholdType = require('./HouseholdType')

const {
    householdsByBobResolver, repsByBobResolver
    } = require('../resolve/resolvers')

const BobType = new GraphQLObjectType({
    name: 'BookOfBusiness',
    description: 'This represents a Book Of Business belonging to a Rep',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      repId: { type: GraphQLNonNull(GraphQLInt) },
      
      // doing require inside the export to fix circular dependency (rep <-> bob) problem
      // https://stackoverflow.com/a/45969196
      rep: {
        type: require('./RepType'),
        resolve: (bob)  => repsByBobResolver(bob)
      },
      
      
      households: {
        type: new GraphQLList(HouseholdType),
        resolve: (bob)  => householdsByBobResolver(bob)
      }
      
    })
  })
  module.exports = BobType

  