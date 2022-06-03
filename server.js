import express from 'express';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { cast } from './cast.js'
import path from 'path'

const app = express();
const PORT = 8000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
})

app.get('/api/all', (req, res) => {
   res.status(200).json(cast)
})

app.get('/api/:callsign', (req, res) => {
   const callSign = req.params.callsign.toLowerCase()

   if(cast[callSign]) {
      res.status(200).json(cast[callSign])
   } else {
      res.status(500).json({
         'position': 'unknown',
         'characterName': 'unknown',
         'playedBy': 'unknown'
      })
   }
})

app.listen(process.env.PORT || PORT, () => {
   console.log(`The server is running on port ${PORT}, pretty fast!`)
})