const fs = require('fs')
const Crawler = require('crawler')
const moment = require('moment')

const initTime = moment().format('YYYY-MM-DD-hh_mm')

const inputJson = './files/urls.json'
const outputFile = `./files/output-${initTime}.json`

const crawlerLinx = new Crawler({
  maxConnections: 20,
  callback: (err, res, done) => {
    if (err) {
      console.err(err)
    } else {
      const $ = res.$
      const realPath = res.request.uri.path
      const realMeta = $(`meta[name='${res.options.metaName}']`).attr('content')

      let match = res.options.expected.includes(realMeta)
      if(!match) {
        console.log(res.options.uri + ": " + realMeta)
      }
      let result = {
        realPath,
        realMeta,
        match
      }
      writeResult(result)
    }
    done()
  }
})

const writeResult = data => {
  let content = JSON.stringify(data) + ','
  fs.appendFile(outputFile, content, function (err) {
    if (err)
      console.log(err)
  })
}

(init = () => {
  const urls = JSON.parse(fs.readFileSync(inputJson, 'utf8'))
  urls.forEach(uri => {
    crawlerLinx.queue({
      uri: uri,
      metaName: 'robots',
      expected: ['index', 'index,follow']
    })
  })
})()
