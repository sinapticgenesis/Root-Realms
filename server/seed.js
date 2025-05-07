const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('./models/Article');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  await Article.deleteMany({});
  await Article.create([
    {
      title: "Intro to Magic",
      content: "Magic flows through the land, structured into schools...",
      summary: "Overview of magical systems.",
      tags: ["magic", "intro"],
      category: "Magic",
      visibility: "public"
    },
    {
      title: "Political Factions",
      content: "Three major factions dominate the realm...",
      summary: "Details on the power structure.",
      tags: ["politics", "factions"],
      category: "Politics",
      visibility: "public"
    }
  ]);
  console.log("Seeding complete.");
  mongoose.disconnect();
})
.catch(err => console.error("Seed error:", err));
