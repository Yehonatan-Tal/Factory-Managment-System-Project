A web system for factory management
Application that allows authorized users to manage and make changes to the organizational structure and to the composition of departments.

Server-side: Consists of a Flask-based server, written in Python. Emphasis on Programming-Oriented-Object architecture. The routers work in front of BLs which in turn work in front of DALs. The app works with three data sources: Data Base in NoSQL format with the use of MongoDB, BSON, JSON files, and web API services. Used JWT to secure access to the servers, and to develop a secure identification system to log in to the app.

Client-side: Developed using React.js library. Used Redux for managing the state, the global memory of the app, and the communication between the different components. Used Material-UI and other tools such as Day.js and Notistack to design the interface of the app. 
