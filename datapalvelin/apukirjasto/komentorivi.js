

//console.log(process)

//console.log(process.version)

//console.log(process.argv)
//console.log('lkm', process.argv.length)

//for(let i=0; i<process.argv.length; i++){
  //  console.log(`argv[${i}]=${process.argv[i]}`);}

  //const [a,b, ...loput]=process.argv;
  //console.log('a',a);
  //console.log('b',b);
  //console.log('loput',loput);

  //const [,, ...loput]=process.argv;
  //console.log('loput',loput);

  const[,, c,,d]=process.argv;
  console.log(c,d);

  
  const[,, z, ,...y]=process.argv;
  console.log(z,y);