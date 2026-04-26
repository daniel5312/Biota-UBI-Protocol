export const BIOTA_UBI_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_biotaPassport",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_gdIdentity",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_gDollarSuperToken",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "biotaPassport",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IBiotaPassport"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "detenerFlujoUBI",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "fundFromCollective",
    "inputs": [
      {
        "name": "amountG",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "gDollarToken",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ISuperToken"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "identity",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IIdentity"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "iniciarFlujoUBI",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "flowRate",
        "type": "int96",
        "internalType": "int96"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isFlowActive",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "FlowStarted",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "producer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "flowRate",
        "type": "int96",
        "indexed": false,
        "internalType": "int96"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "FlowStopped",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "producer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "CFA_INVALID_FLOW_RATE",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UBI__FlujoNoActivo",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UBI__FlujoYaActivo",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UBI__ImpactoNoVerificado",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UBI__NoEsDueno",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UBI__NoEsHumano",
    "inputs": []
  }
] as const;
