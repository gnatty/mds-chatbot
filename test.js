let regex = new RegExp("^\/lib\/(.*)$", "g");


let res = "/lib/ok/ok.js".split('/');

let libraries = [
  'boot',
  'too',
  'root',
  'lib',
  'ok'
];

console.log(res[1]);

if( res[1] != "undefined" && res[1] == "lib") {
  if( libraries.includes(res[2]) ) {
    console.log("inclub library");
  } else {
    console.log("do not include library");
  }
  console.log("is a library");
} else {
  console.log("not a library");
}


console.log("/lib".split('/'));
console.log("/lib".split('/').length);


console.log(regex.test('/lib/ok/ok.js'));