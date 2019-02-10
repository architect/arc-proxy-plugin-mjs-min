let test = require('tape')
let plugin = require('./index') // note package.json "main" points to dist

test('env', t=> {
  t.plan(1)
  t.ok(plugin, 'exists')
})

let src = `
import foo from '/baz'

async function bar(params) {
  await foo()
}

console.log('hi')
`

test('returns {body, headers}', t=> {
  t.plan(2)
  process.env.NODE_ENV = 'production'
  let result = plugin('test.js', {
    headers: {'content-type':'text/javascript;charset=utf8'},
    body: src
  })
  t.ok(result.headers, 'has headers')
  t.ok(result.body, 'has body')
  console.log(result)
})

test('throws on bad syntax', t=> {
  t.plan(1)
  try {
    let result = plugin('test.js', {
      headers: {'content-type':'text/javascript;charset=utf8'},
      body: 'foo =' 
    })
  }
  catch(e) {
    t.ok(true, 'caught')
    console.log(e.message)  
  }
})
