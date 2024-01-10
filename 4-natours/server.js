const app = require('./app');
// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});