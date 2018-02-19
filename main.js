const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(index,timestamp,data,previousHash=''){
    this.index =index;
    this.timestamp =timestamp;
    this.data =data;
    this.previousHash=previousHash;
    this.hash='this.calculateHash()'
  }

  calculateHash(){
    return SHA256((this.index+this.timestamp+JSON.stringify(this.data)+this.previousHash).toString());
  }
}

class Blockchain{
  constructor(){
    this.chain=[this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0,"01/01/2017","Genesis","0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length-1];
  }
  addBlock(newBlock){
    newBlock.previousHash=this.getLatestBlock().hash;
    newBlock.hash=newBlock.calculateHash();
    this.chain.push(newBlock);

  }
}

let myCoin= new Blockchain();
myCoin.addBlock(new Block(1,"03/04/2023",{amount:1}));
myCoin.addBlock(new Block(2,"03/06/2013",{amount:6}));

console.log(JSON.stringify(myCoin,null,4));
