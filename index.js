//Graphql-yoga is like express for graphql.  It takes in the required setup and then 
//routes requests to where they need to go
const { GraphQLServer } = require('graphql-yoga')


//define what quireies .. a query called welcome, the value we give is types.. ie string , int, [int]
// the ! makes it required a promise to not give back null 
//query is the type defnition
const typeDefs = `
type Query {
    welcome: String!
    links: [Link!]!
}


type Mutation {
    addLink(url: String!, description: String!): Link!
}


type Link {
    id: ID!
    description: String!
    url: String!
}


`


let articleLinks = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'A resources to learn graphql. Check out the advanced sections for some more in-depth tutorials.'
}, {
    id: 'link-1',
    url: 'news.ycombinator.com',
    description: 'Hacker news is like reddit that doesn\'t suck.  Focused on tech.  Great place to improvey our chameleon skills.'
}, {
    id: 'link-2',
    url: 'https://www.graphqlhub.com/',
    description: 'Some practice APIs to play around with queries'
}]


let currentId = 3;
//this  Query is the actual resolver
const resolvers = {
    Query: {
        welcome:()=> 'Hey My, we are winning right now!',
        links: ()=> articleLinks
    },

    Mutation: {
        addLink: (root, args) => { //root is for context, args is for params coming in
                   const link = {
                       id: `link-${currentId++}`,
                       description: args.description,
                       url: args.url,
                   }
                   articleLinks.push(link)
                   return link //like res.send
               }

    }
    
}

//Our server is looking for our typeDefs and our Resolvers
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
