import { Signer, Contract, Provider } from "koilib";
import { TransactionJson } from "koilib/lib/interface";
import abi from "../build/presalemap-abi.json";
import koinosConfig from "../koinos.config.js";

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);
  const accountWithFunds = Signer.fromWif(
    network.accounts.manaSharer.privateKey
  );
  const contractAccount = Signer.fromWif(
    network.accounts.presaleMapContract.privateKey
  );
  accountWithFunds.provider = provider;
  contractAccount.provider = provider;

  const contract = new Contract({
    id: contractAccount.address,
    signer: contractAccount,
    provider,
    abi,
    options: {
      payer: accountWithFunds.address,
      beforeSend: async (tx: TransactionJson) => {
        await accountWithFunds.signTransaction(tx);
      },
    },
  });

  const params = JSON.parse(network.presaleParams);

  const { receipt, transaction } = await contract.functions.createPresale(
    JSON.parse(network.presaleParams),
    {
      rcLimit: "10000000000",
    }
  );
  console.log("Transaction submitted. Receipt: ");
  console.log(receipt);
  const { blockNumber } = await transaction.wait("byBlock", 60000);
  console.log(
    `presale contract ${contractAccount.address} initialized (block number ${blockNumber} - ${networkName})`
  );
  console.log(params);
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
