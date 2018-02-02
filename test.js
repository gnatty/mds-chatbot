




const regex = /^\/([a-zA-Z0-9]+)((\s([a-zA-Z0-9]+))(\s(.*))?)?$/g;
const str = `-/user`;
let m = regex.exec(str);


let prefix;
let cmd;
let val;



if( Object.is(m, null) ) {
  console.log('no a cmd');
} else {

  prefix = m[1];
  cmd = m[4];
  val = m[6];

  console.log(m);
  console.log('prefix : ' + prefix);
  console.log('cmd : ' + cmd);
  console.log('val : ' + val);
}
