const express = require('express')
const upload = require('multer')({ dest: './store' })


// setup app
const app = express()
app.set('views', '.')
app.set('view engine', 'pug')


// render page
app.get('*', (req, res, next) =>
  res.render('index'))

// receive file
app.post('/',
        upload.single('iofile'),
        (req, res, next) => {
          const { originalname:filename, size, mimetype:mime } = req.file

          res.json({ filename, size, mime })
        })

// Woops!
app.use((error, req, res, next) => res.json({ error }))


// go!
app.on('error', console.error)
app.listen(process.env.NODE_PORT || process.env.PORT || 8000)
