# Survey-Angular2
Dynamic Survey Project used for learning Angular2, Horizon and RethinkDB

This is a only for learning and testing purpose.

Screens and most of the code is in Spanish.

It has a small module for authentication using database conection with encryption of passwords.

Dynamic forms are based in the Cookbook tutorial for Angular2 -> https://angular.io/docs/ts/latest/cookbook/dynamic-form.html

Basic details:

1- Authentication: Username, e-mail, Password required. First you have to register. Email confirmation is in progress with sendgrid.

2-Once logged in: you can make audience groups. These can be made with e-mails or Users in the system.

3-You can create Surveys adding questions and audience groups.

4-You can answer questions if you belong to the audience groups of the survey.

5-You can review the answers of the users.



To be made:


1-There is only two types of questions. In the future it is necesary to include more types of questions.

2- More many more...this is only a test.


INSTALL INSTRUCTIONS

1- Install RethinkDB. -> https://www.rethinkdb.com/docs/install/

   Short instructions: Download binary Rethinkdb file in any directory and run.

2- Install Horizon. -> http://horizon.io/install/

   Short instructions:
   
        A- Install Horizon: run ->  npm install -g horizon
        
        B- Choose any directory for the project (Create new one -> example_app   ). This will be horizon directory, and run -> hz init example_app  -> this will create .hz, dist and src folders.


3- Extract or clone github repository in the "dist" subdirectory. You will have the following file estructure:

                example_app/
                ├── .hz
                │   ├── config.toml
                │   ├── schema.toml
                │   └── secrets.toml
                ├── dist
                │   └── (app)
                │   └── (js)
                │   └── (node_modules)
                │   └── (typings)
                │   └── index.html
                │   └── package.json
                │   └── system.config.js
                │   └── index.html
                │   └── tsconfig.json
                │   └── typings.json
                │   └── README.md
                └── src

4- Configure Horizon to connect with RethinkDB: In the "config.toml" file, sets -> project_name = "example_app" , connect = "localhost:28015", bind = [ "0.0.0.0" ], port = 8181

5- Run solution.

   A- Go to dist directory and run: -> npm install
   
   B- Go to example_app directory and run -> hz serve --dev
   
   c- Go to Chrome and type in the url: http://localhost:8181


6- Explore solution. (This will be explained in future changes)


7- To send emails is necesary to install a separate service. (The code and instructions will be explained in future changes)

