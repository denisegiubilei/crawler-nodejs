const fs = require('fs')
const Crawler = require('crawler')
const moment = require('moment')

const initTime = moment().format('YYYY-MM-DD-hh_mm')

const inputFile = './files/input-urls.json'
const outputFile = `./files/output-${initTime}.json`

const crawler = new Crawler({
  maxConnections: 20,
  callback: (err, res, done) => {
    if (err) {
      console.err(err)
    } else {
      const $ = res.$
      const realPath = res.request.uri.path
      const realMeta = $(`meta[name='${res.options.metaName}']`).attr('content')

      const match = res.options.expected.includes(realMeta)
      if(!match) {
        console.log(res.options.uri + ": " + realMeta)
      }
      
      writeResult({
        realPath,
        realMeta,
        match
      })
    }
    done()
  }
})

const writeResult = data => {
  let content = JSON.stringify(data) + '\n'
  fs.appendFile(outputFile, content, (err) => {
    err && console.log(err)
  })
}

(init = () => {
  const urls = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  urls.forEach(uri => {
    crawler.queue({
      uri: uri,
      metaName: 'robots',
      expected: ['index', 'index,follow']
    })
  })
})()
