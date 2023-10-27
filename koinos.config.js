const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  class: "TokenlockMap",
  proto: [
    "./proto/common.proto",
    "./proto/ownablemap.proto",
    "./proto/tokenlock.proto",
    "./proto/tokenlockmap.proto",
    "./proto/token.proto",
  ],
  files: ["./Ownable.ts", "./TokenlockMap.ts", "./OwnableMap.ts", "./Tokenlock.ts", "./Token.ts"],
  sourceDir: "./assembly",
  buildDir: "./build",
  koinosProtoDir: "../../node_modules/koinos-precompiler-as/koinos-proto",
  networks: {
    harbinger: {
      rpcNodes: [
        "https://harbinger-api.koinos.io",
        "https://testnet.koinosblocks.com",
      ],
      accounts: {
        manaSharer: {
          privateKey: process.env.HARBINGER_TOKENLOCK_MANA_SHARER_PRIVATE_KEY,
        },
        tokenlockMapMapContract: {
          privateKey: process.env.HARBINGER_TOKENLOCK_CONTRACT_PRIVATE_KEY,
          id: process.env.HARBINGER_TOKENLOCK_CONTRACT_ID,
        },
      },
    },
    mainnet: {
      rpcNodes: ["https://api.koinos.io", "https://api.koinosblocks.com"],
      accounts: {
        manaSharer: {
          privateKey: process.env.MAINNET_TOKENLOCK_MANA_SHARER_PRIVATE_KEY,
        },
        tokenlockMapMapContract: {
          privateKey: process.env.MAINNET_TOKENLOCK_CONTRACT_PRIVATE_KEY,
          id: process.env.MAINNET_TOKENLOCK_CONTRACT_ID,
        },
      },
    },
  },
};
