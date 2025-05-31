const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose=require('mongoose');

// Connexion à MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(process.env.LOCAL_DATABASE || DB)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });




// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});
