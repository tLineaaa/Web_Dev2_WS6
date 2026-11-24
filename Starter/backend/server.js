const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // adding cors to get backend and frontend to get the connection through
require('dotenv').config();

// I took this one out as this Workshop doesn't have pages (not sure if we were supposed to bring it from WS05)
//const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/posts', postsRouter);


// ─── TODO: Write the connectToDatabase function ──────────────────────────────
async function connectToDatabase() {
  try { // try code that might fail
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is missing. Create a .env file in backend/ before testing database features.');
      return;
    //this could be used as it interrupts the try block and connect is skipped + error message is included
    // throw new Error('MONGODB_URI is missing. Create a .env file in backend/ before testing database features.');
    }
  

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'blog'
    });

    console.log('Connected to MongoDB');

} catch (error) { // handle error if such is found
      console.error('MongoDB connection error: ', error.message);
    }
  }

app.locals.publicDir = publicDir;
app.use(express.json());
app.use(express.static(publicDir));

// Crashes nodemon since pageg are not used
//app.use('/', pagesRouter);
app.use('/api/posts', postsRouter);

app.use((req, res) => {
res.status(404).sendFile(path.join(publicDir, '404.html'));
  return res.status(404).json({ error: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).sendFile(path.join(publicDir, '500.html'));
  return res.status(500).json({ error: error.message });
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Mounted routers:');
//    console.log('  / -> routes/pages.js');
    console.log('  /api/posts -> routes/posts.js');
  });
});
