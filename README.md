# ChatApp

Live demo - https://chat-app-graphql.netlify.com

a graphql express server which has real time subscriptions for the chat applications

## Technologies used to Build a Server:
- Node JS
- MongoDB
  - Mongoose ODM
- Express
- Graphql
  - Apollo Graphql

### Why graphql? instead of traditional REST API?
REST and GraphQL are two ways to send data over HTTP. The REST-based approach is the traditional way of doing so and has gained a very    high adoption rate in many application stacks in the last years.
 - Multiple Round Trips To Fetch Related Resources
 - Over Fetching / Under Fetching
 - only one route Expose 

### ChatAPP ERD

![chatapp erd](https://user-images.githubusercontent.com/17231224/51190957-661baa80-1909-11e9-9c4d-6439679dbd31.png)

<p align="center"> Diagram.1 Entity relation diagram as shown abvoe</p>

### CRUD operation 
- Create
  - User creation (sign up)
  - A User can create a Conversation
  - A User can create a Message of Particular Conversation
- Update
  - Updating the Conversation of the User
  - Upating the Messages of the of the User
- Delete 
  - Delete the Conversation along with Messgaes of that particular Conversation

### Validation
- validation is done by the using `Joi` Library as javaScript objection validation
  
### Security and Authentication
- ##### Password Encrypting
  - Password sent by the user is stored in the database by encrypting the password using `bcryptjs`
- ##### JWT token verifivcation
  - JWT token is decode and verified for the Authentication of the user to make any a CRUD opeartions using `jsonwebtoken`
  
### Real time data Updation
- real time data subscriptions is done by `graphql-subscriptions`
  - when ever a User sends a message we subscribe for subscriptions using default apollo-graphql pubsub
