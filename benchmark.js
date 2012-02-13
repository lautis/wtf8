var Benchmark = require('benchmark');
var utf8 = require('./wtf8');
var Iconv = require('iconv').Iconv

var buffer = new Buffer("foobar");

var str = "";
for (var i = 0; i < 5000; i++) {
  str += String.fromCharCode(0);
}

buffer = new Buffer(str);
convert = new Iconv("UTF-8", "UTF-16LE");

var suite = new Benchmark.Suite("Decode Buffer to String");
suite
.add('wtf8 decoder', function() {
  utf8.decode(buffer);
})
.add('Buffer.toString()', function() {
  buffer.toString('utf8')
})
.add('decodeUri & escape', function() {
  decodeURIComponent(escape(buffer.toString('ucs-2')));
})
.add('iconv', function() {
  convert.convert(buffer).toString('ucs-2')
})

// add listeners
.on('cycle', function(event, bench) {
  console.log(String(bench));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();


var suite = new Benchmark.Suite("Encode String to Buffer");
suite
.add('new Buffer()', function() {
  new Buffer(str)
})
.add('wtf8 encoder', function() {
  utf8.encode(str);
})
.add('encodeUri & unescape', function() {
  var utf8 = unescape(encodeURIComponent(str));
  var len = utf8.length;
  var buffer = new Buffer(utf8.length);
  while(len--) {
    buffer[len] = utf8.charCodeAt(len);
  }
  return buffer;
})

// add listeners
.on('cycle', function(event, bench) {
  console.log(String(bench));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();