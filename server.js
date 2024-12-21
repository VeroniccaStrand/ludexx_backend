import express from 'express'
import { logger } from './src/utils/logger.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req,res) => {
	
	res.send('hello Veronica ')

});
	

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`)
});
