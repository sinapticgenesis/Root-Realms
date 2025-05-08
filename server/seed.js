const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Article = require('./models/Article');
const User = require('./models/User'); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
    await Article.deleteMany({});
    let user = await User.findOne({ username: 'seeduser' });
    if (!user) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        user = await User.create({
            username: 'seeduser',
            email: 'seed@example.com',
            passwordHash: hashedPassword
        });
    }
  await Article.create([
    {
      title: "Intro to Magic",
      content: "Magic flows through the land, structured into schools...",
      summary: "Overview of magical systems.",
      tags: ["magic", "intro"],
      category: "Magic",
      visibility: "public",
      owner: user._id
    },
    {
      title: "Political Factions",
      content: "Three major factions dominate the realm...",
      summary: "Details on the power structure.",
      tags: ["politics", "factions"],
      category: "Politics",
      visibility: "public",
      owner: user._id
    }
  ]);
  console.log("Seeding complete.");
  mongoose.disconnect();
})
.catch(err => console.error("Seed error:", err));
