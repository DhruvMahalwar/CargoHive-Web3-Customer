
async function getProduct() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to perform transactions on the blockchain, as this is a blockchain-based project.');
            return;
        }

        const productId = document.getElementById("product-id2").value;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const response = await contract.methods.getProduct(productId).call({ from: accounts[0] }).then(async result => {
            console.log(result.sealHash);
            const productInfoDiv = document.getElementById("product-info");
            if (result[2].length === 0) {
                productInfoDiv.innerHTML = `Product Name: ${result[0]}<br>Manufacturer: ${result[1]}<br>History: No history found.`;
            } else {
                productInfoDiv.innerHTML = `Product Name: ${result[0]}<br>Manufacturer: ${result[1]}<br>History: ${result.history.join(", ")}`;
            }
        });
        console.log(response)
    } catch (error) {
        console.error(error);
        alert('Please enter valid Product Id or try creating a product first.')
    }
}


async function createbills() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to perform transactions on the blockchain, as this is a blockchain-based project.');
            return;
        }

        const doc = new jsPDF();
        const productId = document.getElementById("product-id1").value;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        var rows = [];
        const result = await contract.methods.getProduct(productId).call({ from: accounts[0] });
        const totalAmount = result[2];
        const quantity = result[3];
        const unitPrice = totalAmount / quantity;
        var amount = result[2].toString();
        rows.push([result[0], quantity, unitPrice]);
        doc.text("Bill Details", 10, 10);
        doc.text("Manufacturer Name: " + result[1], 10, 20);
        doc.autoTable({
            startY: 30,
            head: [["Product Name", "Quantity", "Unit Price"]],
            body: rows,
            theme: "grid",
        });
        doc.text(
            "Total Amount: " + totalAmount,
            10,
            doc.autoTable.previous.finalY + 10
        );
        doc.save("bill.pdf");
    } catch (error) {
        console.error(error);
        alert('Please enter valid Product Id or try creating a product first.');
    }
}







const web3 = new Web3(window.ethereum);
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "NewProduct",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "history",
                "type": "string"
            }
        ],
        "name": "ProductHistory",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_history",
                "type": "string"
            }
        ],
        "name": "addHistory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "createProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllProducts",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getHistory",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "history",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getProduct",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "string[]",
                "name": "history",
                "type": "string[]"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "productCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "products",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const contract = new web3.eth.Contract(
    abi,
    "0xc195cFf89749596E5bc58eAeE744521b874fBfE8"
);
