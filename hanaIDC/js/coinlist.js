"use strict";
async function initUI(){
	await connect();
	const elemWallet=document.getElementById("WalletAddress");
	elemWallet.innerHTML=walletAddress;
	const elemTransfer=document.getElementById("ButtonTransfer");
	elemTransfer.addEventListener("click",function(){
		window.location.href="./transfer.php";
	});
	const tokenList=[
		{key:"BNB",id:"BNBBalance"},
		{key:"BUSD",id:"BUSDBalance"},
		{key:"FIL",id:"FILBalance"}
	];
	for(const tokenObject of tokenList){
		const elemToken=document.getElementById(tokenObject.id);
		const token=tokens[tokenObject.key];
		token.getBalance().then(function(balanceNormalized){
			elemToken.innerHTML=Math.floor(10000*balanceNormalized)/10000;
		});
	}
}
initUI();