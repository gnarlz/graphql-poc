# graphql-poc

GraphQL POC


##
the graph looks like this:

```
rep
    bob (book of business)
        households
            clients
                accounts
                    holdings
```

note that resolvers have been implemented to allow consumers walk down AND up the graph willy nilly.
so they can take our domain model and twist it to their own depraved models.

## how do i run it?
cd to the root dir of this repo and do

```
$ npm run devStart
```

## how do issue a query?
this poc includes an enabled graphiQL UI. it can be accessed after starting graphpQL at

```
localhost:5000/graphql
```


## the data
its in a file. its a POC. 



## sample queries
get all the data for rep id = 1
```
{
 rep (id: 1) {
  id
  name
  email
  bob{
    name
    households {
      name
      income
      clients {
        name
        nmuniqueid
        accounts {
          name
          accountNumber
          holdings {
            ticker
            cusip
            shares
            fundFamily
            assetClass
          }
        }
      }
    }
  }
 }
}

```

for rep id=1, get only a certain nmuniqueid

```
{
  rep (id: 1) {
    name
    email
    bob {
      id
      name
      households {
        clients (nmuniqueid: "ASDFQWER") {
          nmuniqueid
          name
          accounts {
            accountNumber
            name
            holdings {
              id
              ticker
              cusip
              shares
              fundFamily
            }
          }
        }
      }
    }
  }
}

```

also, realize you dont have to start at the top of the graph. this query returns all households with incomes >= $100,000 across ALL books of business

```
{
  households(income: "$100,000") {
    id
    name
    income
    clients {
      nmuniqueid
      name
      accounts {
        id
        accountNumber
        holdings {
          ticker
          cusip
          shares
          fundFamily
        }
      }
    }
  }
}

```


....and this query retrieves only a specific account:

```
{
  account(accountNumber: "A40033456") {
    id
    accountNumber
    holdings {
      ticker
      cusip
      shares
      fundFamily
    }
  }
}
```

...and by using the power of being able to walk down AND up the graph, we can add the clients nmuniqueid to that^ query like this:

```
{
  account(accountNumber: "A40033456") {
    id
    accountNumber
    client {
      nmuniqueid
    }
    holdings {
      ticker
      cusip
      shares
      fundFamily
    }
  }
}

```



## misc

* the graphiQL UI has code-complete to help you craft your query
* check out the docs in graphiQL - all for free!
* as mentioned above, resolvers have been implemented to walk both DOWN and UP the graph. you can demonstrate this with a ridiculous query like:

```
{
  rep(id: 1) {
    name
    email
    bob {
      id
      name
      rep {
        name
        email
        bob {
          id
          name
        }
      }
    }
  }
}

```
