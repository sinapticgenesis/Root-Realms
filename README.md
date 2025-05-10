# Root Realms Information
## Project by Corra and Lauren
### About the Project ###
Root Realms is a full-stack worldbuilding application designed to help creators organize and share their fictional universes. Whether you're a novelist, dungeon master, or lore enthusiast, Root Realms gives you the tools to build, explore, and present your worlds with clarity and aesthetic appeal. 

This project was completed for Web Application Development 1, however; anyone that finds this web application useful would be free to use it's organizational features.

Root Realms was built using the full MERN stack, featuring a clean and responsive React frontend with a parchment-inspired aesthetic. The site allows users to create richly formatted wiki-style articles using a custom Quill editor and easily cross-link content with intuitive [[Article Name]] references. Navigation is seamless thanks to React Router, and all data interactions are handled through secure API calls using Axios.

On the backend, we developed a robust Express server connected to MongoDB via Mongoose, supporting complete CRUD operations for articles and user accounts. User authentication and authorization ensure that private content remains secure, while public articles are easily shareable. A comprehensive seed script was created to populate the database with sample content, providing immediate examples of the platform’s features for demonstration purposes.

The application is fully integrated, providing an end-to-end solution for content management and worldbuilding. Project documentation and a detailed presentation walk through the design decisions, development process, and key features implemented.

### Features ###
* Article Creation: Create richly formatted wiki-style articles.
* Wiki Linking: Seamlessly cross-reference articles using [[Article Name]] syntax.
* User Authentication: Secure account creation and login with JWT authentication.
* Public & Private Articles: Choose to share your creations or keep them private.
* Categorization & Tagging: Organize content with categories and tags for easy navigation.
* Parchment-Inspired UI: Clean, vintage aesthetic for immersive worldbuilding.
* Rich Text Editor: Write content using the Quill rich text editor with custom styling.

## Getting Started ##
### Prerequisites ###
* Node.js (v16 or later)
* MongoDB
* npm

### Installation ###
1. Clone the repository:
   ```
   git clone https://github.com/sinapticgenesis/Root-Realms.git
   cd Root-Realms
   ```
2. Install server and client dependencies:
   ```
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Run the development environment:
   ```
    # In /server
    npm run dev
    
    # In /client (separate terminal)
    npm start
    ```


### Project File Structure: ###

```
ROOT-REALMS/
├── client/                      # React Frontend
│   ├── public/
│   │   ├── assets/              # Logos and images
│   │   └── index.html
│   └── src/
│       ├── components/          # React components
│       ├── App.js
│       ├── ...
│       └── index.js
├── server/                      # Node.js + Express Backend
│   ├── middleware/
│   ├── models/                  # Mongoose Schemas
│   ├── routes/                  # API Routes
│   ├── .env
│   ├── server.js
│   └── seed.js                  # Seed script for database
├── LICENSE
└── README.md
```

### Example Seed User ###
* Username: seeduser
* Password: password123
  
Use this account after seeding the database to explore the example articles and features.

### Project Credits ###

```
Corra Stimson   |   Lauren Bissey
---------------------------------
UI Design       |   React Components
Code Refactors  |   Node JS configuration
CSS Styling     |   CSS Styling
Media Creation  |   Mongoose Setup
Database Design |   NPM configuration
```

### Video Walkthrough ###
_YouTube Link_:

### License ###
This project is licensed under the GNU General Public License v3.0.


