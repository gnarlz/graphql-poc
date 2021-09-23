const express = require('express')
const app = express()
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema
} = require('graphql')

const RootQueryType = require('./query/queries')
const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => {
  console.log('GraphQL Server Running at http://localhost:5000/graphql')
})



