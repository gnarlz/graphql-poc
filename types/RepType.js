'use strict'

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const BobType = require('./BobType')

const {
bobByRepResolver
} = require('../resolve/resolvers')


const RepType = new GraphQLObjectType({
  name: 'Representative',
  description: 'This represents a Representative that owns a Book Of Business',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    
    bob: {
      type: BobType,
      resolve: (rep)  => bobByRepResolver(rep)
    }
    
    
  })
})



module.exports = RepType
