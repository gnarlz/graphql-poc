'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const reps = require('../data/data').reps
const bobs = require('../data/data').bobs
const households = require('../data/data').households
const clients = require('../data/data').clients
const accounts = require('../data/data').accounts
const holdings = require('../data/data').holdings

module.exports = {

    // ===============================================================================================
    // =====================================   QUERY RESOLVERS   ===================================== 
    // ===============================================================================================

    repsResolver: () => {
      return reps
    },
    repResolver: (parent, args) => {
      return  reps.find(rep => rep.id === args.id)
    },
    repsByBobResolver: (bob) => {
      return  reps.find(rep => rep.id === bob.repId)
    },
    

    bobsResolver: () => {
      return bobs
    },
    bobResolver: (parent, args) => {
      return  bobs.find(bob => bob.id === args.id)
    },
    bobByHouseholdResolver: (household) => {
      return  bobs.find(bob => bob.id === household.bobId)
    },
    

    householdsResolver: (parent, args) => {
      return args.income? 
      households.filter(household => Number( household.income.replace(/[^0-9\.-]+/g,"")) >=  Number(args.income.replace(/[^0-9\.-]+/g,""))) :
      households
    },
    householdResolver: (parent, args) => {
      return households.find(household => household.id === args.id) 
    },
    householdByClientResolver: (client) => {
      return  households.find(household => household.id === client.householdId)
    },
    

    
    clientsResolver: () => {
      return clients
    },
    clientResolver: (parent, args) => {
      return args.nmuniqueid? 
      clients.find(client => client.nmuniqueid === args.nmuniqueid) :
      clients.find(client => client.id === args.id)
    },
    clientByAccountResolver: (account) => {
      return clients.find(client => client.id === account.clientId)
    },
    

    accountsResolver: () => {
      return accounts
    },
    accountResolver: (parent, args) => {
      return args.accountNumber? 
        accounts.find(account => account.accountNumber === args.accountNumber) :
        accounts.find(account => account.id === args.id)
    },
    accountByHoldingResolver: (holding) => {
      return  accounts.find(account => account.id === holding.accountId)
    },
    

    holdingsResolver: () => {
      return holdings
    },
    holdingResolver: (parent, args) => {
      return  holdings.find(holding => holding.id === args.id)
    },

    // ==============================================================================================
    // =====================================   TYPE RESOLVERS   ===================================== 
    // ==============================================================================================

    bobByRepResolver: (rep) => {
      return  bobs.find(bob => bob.repId === rep.id)
    },

    householdsByBobResolver: (bob) => {
      return  households.filter(household => household.bobId === bob.id)
    },

    clientsByHouseholdResolver: (household, args) => {
      return args.nmuniqueid? 
      clients.filter(client => (client.nmuniqueid === args.nmuniqueid) && (client.householdId === household.id)) :
      clients.filter(client => client.householdId === household.id) 
    },

    accountsByClientResolver: (client) => {
      return  accounts.filter(account => account.clientId === client.id)
    },

    holdingsByAccountResolver: (account) => {
      return  holdings.filter(holding => holding.accountId === account.id)
    }
    
    

}

 
  