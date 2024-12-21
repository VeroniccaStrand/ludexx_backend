import express from 'express'

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req,res) => {
res.send('hello from linux');
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`)
});
