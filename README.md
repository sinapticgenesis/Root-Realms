# Root Realms Information
## Project by Corra and Lauren
### About the Project ###
Root Realms is a full-stack worldbuilding application designed to help creators organize and share their fictional universes. Whether you're a novelist, dungeon master, or lore enthusiast, Root Realms gives you the tools to build, explore, and present your worlds with clarity and aesthetic appeal. 

This project was completed for Web Application Development 1, however; anyone that finds this web application useful would be free to use it's organizational features.

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
3. Create a .env file in the server/ directory with the following:
    ```
    MONGO_URI=mongodb://localhost:27017/root_realms
    JWT_SECRET=your_secret_key
    ```
4. Run the development environment:
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

### License ###
This project is licensed under the GNU General Public License v3.0.
