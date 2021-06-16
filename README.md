# Getting started

1.)
```sh
yarn install
yarn start:db
```
Note the port mongoDB is running and use it in 
```
/config/default.json
/config/test.json
```

2.)
```sh
yarn start:app
```
3.) Hit
```
http://localhost:4000/graphql
```

4.) Add authentication token under HTTP headers
```json
{
  "Authorization": "Bearer 676cfd34-e706-4cce-87ca-97f947c43bd4"
}
```

5.) Test with graphQL queries 
```
query {
  properties {
    mlsId
    favoriteCount
  }
}
```
```
mutation addToFav {
  addToFavorite(mlsId:"1005192" ) {
    mlsId
    favoriteCount
  }
}

```