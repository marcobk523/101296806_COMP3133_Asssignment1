# Marco Barrientos
This repo holds a VScode project that uses NodeJS, Express, GraphQL, and MongoDB to make a backend application of GraphQL API.

## Instructions on how to use
In order to deploy this application there are a few things to keep in mind. This app was developed with Visual Studio Code and uses VS Code in order to function, primarily: **MongoDB for VS Code** and **DotENV**, as well as **GraphQL Language Feature Support**. It is highly reccomended to deploy this application with **Visual Studio Code** with the MongoDB extension if you wish to test it but in theory any IDE should work. Also this project could be deployed with Heroku as it has a Procfile in case somebody would like to do that but the rest of the configuration is up to them to do. Now that that is out of the way there are some things to highlight.

***The most important file to take note of is the .env file***
This file has the mongo uri connection string which you use to connect the mongo db atlas cluster which houses the database comp3133_assignment1, the connection string is:

mongodb+srv://user:passworddrowssap@cluster0.garqyqu.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority

the .env file also has the JWT token accessed in the resolvers.js file. If a new token is needed in case the one there does not work then, using the terminal, open the terminal, and type node then enter, then run the following line:

require('crypto').randomBytes(64).toString('hex')

after that paste the string it gives you into the JWT_SECRET that is in the .env file
know that that is accessed in resolvers.js by this line:
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '100d' });

***To run the application and test the API***
1. Open the Terminal.
2. Make sure it is pointing to where you are currently running the project on your machine.
3. Make sure you have connected to the MongoDB database with the string that is above:
mongodb+srv://user:passworddrowssap@cluster0.garqyqu.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority
4. Then in the terminal enter node index.js, and it should give you a link to local host at port 4000 to apollo with a tool to test the API calls (http://localhost:4000/graphql). Screenshots of these tests are shown in the docx file that is also in this project. apiCalls.docx
5. In the project there should be a file called apiTestCalls.txt that should show you a list of different things you can enter that access and or modify the database on atlas.

The apiErrors.txt contains proof of error checking and validation.
The clusterUsernameNpassword.txt highlights the username and password in the mongo uri string.
The userloginsample contains the username and password of one user from the database as a sample login.

That's it.