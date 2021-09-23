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
    repsResolver, repResolver, 
    bobsResolver, bobResolver, 
    householdsResolver, householdResolver,
    clientsResolver, clientResolver,
    accountsResolver, accountResolver,
    holdingsResolver, holdingResolver
  } = require('../resolve/resolvers')

const RepType = require('../types/RepType')
const BobType = require('../types/BobType')
const HouseholdType = require('../types/HouseholdType')
const ClientType = require('../types/ClientType')
const AccountType = require('../types/AccountType')
const HoldingType = require('../types/HoldingType')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      
      rep: {
        type: RepType,
        description: 'A Single Rep',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args)  => repResolver(parent, args)
      },
      reps: {
        type: new GraphQLList(RepType),
        description: 'List of Reps',
        resolve: (parent, args)  => repsResolver(parent, args)
      },
     
      bob: {
        type: BobType,
        description: 'A Single Book Of Business',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args)  => bobResolver(parent, args)
      },
      bobs: {
        type: new GraphQLList(BobType),
        description: 'List of Books Of Business',
        resolve: (parent, args)  => bobsResolver(parent, args)
      },
  
      household: {
        type: HouseholdType,
        description: 'A Single Household',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args)  => householdResolver(parent, args)
      },
      households: {
        type: new GraphQLList(HouseholdType),
        description: 'List of Households',
        args: {
            income: { type: GraphQLString } 
          },
        resolve: (parent, args)  => householdsResolver(parent, args)
      },
  
      client: {
        type: ClientType,
        description: 'A Single Client',
        args: {
          id: { type: GraphQLInt },
          nmuniqueid: { type: GraphQLString }
        },
        resolve: (parent, args)  => clientResolver(parent, args)
      },
      clients: {
        type: new GraphQLList(ClientType),
        description: 'List of Clients',
        resolve: (parent, args)  => clientsResolver(parent, args)
      },
  
      account: {
        type: AccountType,
        description: 'A Single Account',
        args: {
          id: { type: GraphQLInt }, 
          accountNumber: { type: GraphQLString }
        },
        resolve: (parent, args)  => accountResolver(parent, args)
      },
      accounts: {
        type: new GraphQLList(AccountType),
        description: 'List of Accounts',
        resolve: (parent, args)  => accountsResolver(parent, args)
      },
  
      holding: {
        type: HoldingType,
        description: 'A Single Holding',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args)  => holdingResolver(parent, args)
      },
      holdings: {
        type: new GraphQLList(HoldingType),
        description: 'List of Holdings',
        resolve: (parent, args)  => holdingsResolver(parent, args)
      }
  
  
      
    })
  })

  module.exports = RootQueryType