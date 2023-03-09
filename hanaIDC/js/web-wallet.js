"use strict";
//const jsonRPCUrl="https://data-seed-prebsc-1-s1.binance.org:8545/";
const jsonRPCUrl="https://bsc-dataseed.binance.org/";
let provider=new ethers.providers.JsonRpcProvider(jsonRPCUrl);
let signer;
let walletAddress;
const walletConnectHandlers={};
const tokenBalanceHandlers={};
const erc20ABI=[{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
async function transferERC20(recipient,amountNormalized,estimateGas){
	const value=ethers.utils.parseUnits(amountNormalized,this.decimals);
	const signerContract=this.erc20Contract.connect(signer);
	if(estimateGas){
		const[gasPrice,gasLimit]=await Promise.all([
			provider.getGasPrice(),
			signerContract.estimateGas.transfer(recipient,value)
		]);
		const gasCost=ethers.utils.formatEther(gasPrice.mul(gasLimit));
		return gasCost;
	}
	const transaction=await signerContract.transfer(recipient,value);
	await transaction.wait();
}
async function getTokenBalance(){
	const balance=await this.erc20Contract.balanceOf(walletAddress);
	return Number(ethers.utils.formatUnits(balance,this.decimals));
}
const tokens={
	"BNB":{
		name:"BNB",
		sendTo:async function(recipient,amountNormalized,estimateGas){
			const value=ethers.utils.parseEther(""+amountNormalized);
			const tx={
				to:recipient,
				value:value
			};
			if(estimateGas){
				const[gasPrice,gasLimit]=await Promise.all([
					provider.getGasPrice(),signer.estimateGas(tx)
				]);
				const gasCost=ethers.utils.formatEther(gasPrice.mul(gasLimit));
				return gasCost;
			}
			const transaction=await signer.sendTransaction(tx);
			await transaction.wait();
		},
		getBalance:async function(){
			const balance=await provider.getBalance(walletAddress);
			return Number(ethers.utils.formatUnits(balance,this.decimals));
		}
	},
	"BUSD":{
		name:"BUSD",
		decimals:18,
		erc20Contract:new ethers.Contract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",erc20ABI,provider),//Mainnet
		//erc20Contract:new ethers.Contract("0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",erc20ABI,provider),//TESTNET
		sendTo:transferERC20,
		getBalance:getTokenBalance
	},
	"FIL":{
		name:"FIL",
		decimals:18,
		erc20Contract:new ethers.Contract("0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",erc20ABI,provider),
		sendTo:transferERC20,
		getBalance:getTokenBalance
	}
};
function addTokenBalanceHandler(key,handler){
	tokenBalanceHandlers[key]=handler;
}
function addWalletConnectHandler(key,handler){
	walletConnectHandlers[key]=handler;
}
function isTrustWallet(ethereum){
	return!!ethereum.isTrust;
}
function getTrustWalletProvider(){
	const injectedProviderExists=typeof window!=="undefined"&&typeof window.ethereum!=="undefined";
	if(!injectedProviderExists){
		console.log("null");
		return;
	}
	if(isTrustWallet(window.ethereum)){
		console.log("window.ethereum");
		return window.ethereum;
	}
	if(window.ethereum.providers){
		console.log("providers");
		return window.ethereum.providers.find(isTrustWallet);
	}
	return window.trustWallet;
}
function waitFor(t){
	return new Promise(function(resolve){
		setTimeout(resolve,t);
	});
}
async function waitForEthereum(){
	while(true){
		console.log("Waiting for 0.1s");
		await waitFor(100);
		const ethereum=getTrustWalletProvider();
		if(ethereum!=null){
			return ethereum;
		}
	}
}
async function connect(){
	const ethereum=await waitForEthereum();
	if(ethereum){
		provider=new ethers.providers.Web3Provider(ethereum);
		try{
			await provider.send("eth_requestAccounts",[]);
			ethereum.on("accountsChanged",async function(accounts){
				console.log("AccountsChanged");
				const account=accounts[0];
				signer=await provider.getSigner();
				walletAddress=await signer.getAddress();
				for(let key in walletConnectHandlers){
					const handler=walletConnectHandlers[key];
					handler(walletAddress);
				}
			});
			signer=await provider.getSigner();
			walletAddress=await signer.getAddress();
			for(let key in walletConnectHandlers){
				const handler=walletConnectHandlers[key];
				handler(walletAddress);
			}
		}catch(e){
			console.error(e);
		}
	}
}
/*
let sendDialog;
function showSendDialog(token){
	if(sendDialog){
		sendDialog.remove();
	}
	sendDialog=document.createElement("div");
	{
		const e=sendDialog;
		e.style.position="fixed";
		e.style.width="250px";
		e.style.top="50%";
		e.style.left="50%";
		e.style.transform="translate(-50%,-50%)";
		e.style.padding="4px";
		e.style.border="1px solid #000";
		let getAmount;
		let getRecipient;
		let setError;
		const elemToken=document.createElement("div");
		{
			const e=elemToken;
			e.innerHTML=token.name;
		}
		e.appendChild(elemToken);
		const elemRecepient=document.createElement("div");
		{
			const e=elemRecepient;
			const elemKey=document.createElement("div");
			{
				const e=elemKey;
				e.innerHTML="Recepient Address:";
			}
			e.appendChild(elemKey);
			const elemVal=document.createElement("input");
			{
				const e=elemVal;
				e.type="text";
			}
			e.appendChild(elemVal);
			getRecipient=function(){
				return elemVal.value;
			};
		}
		e.appendChild(elemRecepient);
		const elemAmount=document.createElement("div");
		{
			const e=elemAmount;
			const elemKey=document.createElement("div");
			{
				const e=elemKey;
				e.style.marign="4px";
				e.innerHTML="Amount";
			}
			e.appendChild(elemKey);
			const elemVal=document.createElement("input");
			{
				const e=elemVal;
				e.type="number";
			}
			e.appendChild(elemVal);
			getAmount=function(){
				return elemVal.value;
			};
		}
		e.appendChild(elemAmount);
		const elemError=document.createElement("div");
		{
			const e=elemError;
			e.style.color="#FF0000";
			setError=function(err){
				e.innerHTML=err;
			};
		}
		e.appendChild(elemError);
		let sending=false;
		const elemSend=document.createElement("div");
		{
			const e=elemSend;
			e.style.padding="5px";
			e.style.borderRadius="20px";
			e.style.cursor="pointer";
			e.style.backgroundColor="#a0a0ff";
			e.style.color="#ffffff";
			e.style.margin="2px";
			e.innerHTML="Send";
			e.addEventListener("click",async function(){
				if(sending){
					return;
				}
				const amountNormalized=getAmount();
				const recipient=getRecipient();
				sending=true;
				e.innerHTML="Sending...";
				try{
					await token.sendTo(recipient,amountNormalized);
					for(let key in tokenBalanceHandlers){
						const handler=tokenBalanceHandlers[key];
						handler();
					}
				}catch(e){
					setError(e);
					console.error(e);
				}
				sending=false;
				e.innerHTML="Send";
			});
		}
		e.appendChild(elemSend);
		const elemClose=document.createElement("div");
		{
			const e=elemClose;
			e.style.padding="5px";
			e.style.borderRadius="20px";
			e.style.cursor="pointer";
			e.style.backgroundColor="#ffa0a0";
			e.style.color="#ffffff";
			e.style.margin="2px";
			e.innerHTML="Close";
			e.addEventListener("click",function(){
				sendDialog.remove();
				sendDialog=null;
			});
		}
		e.appendChild(elemClose);
	}
	document.body.appendChild(sendDialog);
	return sendDialog;
}
*/
