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
    await Article.deleteMany({}); // Clear existing articles

    let user = await User.findOne({ username: 'seeduser' });
    if (!user) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        user = await User.create({
            username: 'seeduser',
            email: 'seed@example.com',
            passwordHash: hashedPassword
        });
    }

    const articles = [
        {
            title: "The Shattered Realms",
            summary: "An ancient world divided by magic and war, now on the brink of a fragile peace.",
            category: "World Lore",
            tags: ["magic", "history", "kingdoms", "factions", "artifacts"],
            visibility: "public",
            owner: user._id,
            content: `Welcome to the world of the *Shattered Realms*, where ancient [[Factions]] vie for control over the remnants of a once-unified empire. From the mystical peaks of [[The Aether Spires]] to the shadowed halls of [[The Black Citadel]], every corner of this fractured world holds secrets and danger.<br><br>Are you brave enough to choose a side? Will you restore balance, or plunge the realms into further chaos?`
        },
        {
            title: "Factions",
            summary: "Powerful organizations vying for control of the Shattered Realms.",
            category: "World Lore",
            tags: ["factions", "politics", "war", "alliances"],
            visibility: "public",
            owner: user._id,
            content: `Throughout the Shattered Realms, factions wield immense influence:<br>- [[The Brotherhood of Ash]]: Masters of deception and dark magic.<br>- [[The Verdant Alliance]]: Protectors of nature and harmony.<br>- [[The Iron Concord]]: Rulers through military strength.<br><br>Choose wisely whom you support. Each faction holds the keys to a different future.`
        },
        {
            title: "The Aether Spires",
            summary: "A floating archipelago where ancient magic still lingers.",
            category: "Locations",
            tags: ["magic", "ancient ruins", "mages"],
            visibility: "public",
            owner: user._id,
            content: `High above the shattered continents float the mystical Aether Spires, remnants of the First Age. The Archmages who remain here guard forbidden knowledge and the legendary [[Aether Crystal]].<br><br>Legends say only those pure of heart can walk the Path of Light and reach the Spires unharmed.`
        },
        {
            title: "The Black Citadel",
            summary: "A fortress of shadows and the seat of the Brotherhood of Ash.",
            category: "Locations",
            tags: ["fortress", "shadows", "evil"],
            visibility: "public",
            owner: user._id,
            content: `Hidden deep within the Ashen Wastes lies the Black Citadel, its obsidian towers piercing the cursed skies. This is the stronghold of the [[Brotherhood of Ash]], a place where schemes are born and dark rituals unfold.<br><br>Travelers beware—few enter and leave with their minds intact.`
        },
        {
            title: "The Brotherhood of Ash",
            summary: "An order of sorcerers and assassins dedicated to controlling the Shattered Realms.",
            category: "Factions",
            tags: ["dark magic", "politics", "control"],
            visibility: "public",
            owner: user._id,
            content: `The Brotherhood of Ash believes that only through absolute control can the realms be saved. Using forbidden shadow magic and a vast network of spies, they manipulate the hearts of kings and queens alike.<br><br>Rumors claim the lost [[Aether Crystal]] lies hidden deep within [[The Black Citadel]].`
        },
        {
            title: "The Verdant Alliance",
            summary: "Protectors of nature and the last hope for balance.",
            category: "Factions",
            tags: ["nature", "healing", "peace"],
            visibility: "public",
            owner: user._id,
            content: `In the face of endless war and destruction, the Verdant Alliance rises as a beacon of hope. Comprised of druids, healers, and scholars, their goal is to heal the land and restore what was lost.<br><br>Their sanctuary lies within the hidden [[Emerald Grove]], untouched by war.`
        },
        {
            title: "Aether Crystal",
            summary: "A mythical artifact capable of restoring or destroying the realms.",
            category: "Artifacts",
            tags: ["magic", "relic", "power"],
            visibility: "public",
            owner: user._id,
            content: `Forged during the First Age, the [[Aether Crystal]] holds unimaginable power. Some say it can mend the fractures between realms; others believe it will bring about the final cataclysm.<br><br>Whoever finds the Crystal will shape the fate of the Shattered Realms… for better or worse.`
        }
    ];

    await Article.insertMany(articles);
    console.log("Seeding complete.");
    mongoose.disconnect();
})
.catch(err => console.error("Seed error:", err));
