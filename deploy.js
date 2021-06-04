const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const interface = require('./compile').abi
const bytecode = require('./compile').bytecode
//const { interface, bytecode } = require("./compile");


const provider = new HDWalletProvider(
  "guard weird moral task muffin hen mesh anchor pen warfare ladder hazard",
  //"https://rinkeby.infura.io/v3/a1800fa1e11c43b1ad4d0cb4552d0e4b"
  "https://kovan.infura.io/v3/a1800fa1e11c43b1ad4d0cb4552d0e4b"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface)
  console.log("Contract deployed to", result.options.address);
};
deploy();
