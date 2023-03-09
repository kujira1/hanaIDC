"use strict";
async function initUI(){
	const tokenObjectDict={
		"_OptBNB":"BNB",
		"_OptBUSD":"BUSD",
		"_OptFIL":"FIL"
	};
	await connect();
	const elemAvailableBalance=document.getElementById("AvailableBalance");
	const elemTransfer=document.getElementById("ButtonTransfer");
	const elemEstimatedGas=document.getElementById("EstimatedGas");
	const elemRecepient=document.getElementById("RecepientAddress");
	const elemAmount=document.getElementById("SendAmount");
	const elemTokenList=document.getElementById("TokenList");
	const elemTransferAmount=document.getElementById("TransferAmount");
	let selectedToken;
	let validTx=false;
	let sending=false;
	elemTransfer.addEventListener("click",function(){
		if(sending){
			return;
		}
		if(validTx){
			const recepientAddress=elemRecepient.value;
			const amountNormalized=elemAmount.value;
			if(selectedToken!=null&&recepientAddress.length==42&&recepientAddress[0]==='0'&&recepientAddress[1]==='x'&&amountNormalized>0){
				elemTransfer.innerHTML="Sending...";
				sending=true;
				selectedToken.sendTo(recepientAddress,amountNormalized,false).then(function(){
					elemTransfer.innerHTML="Transfer";
					sending=false;
				}).catch(function(e){
					elemTransfer.innerHTML="Transfer";
					sending=false;
					console.error(e);
				});	
			}
		}
	});
	const estimateGas=function(){
		const recepientAddress=elemRecepient.value;
		const amountNormalized=elemAmount.value;
		if(selectedToken!=null&&recepientAddress.length==42&&recepientAddress[0]==='0'&&recepientAddress[1]==='x'&&amountNormalized>0){
			elemEstimatedGas.innerHTML="Loading...";
			validTx=false;
			selectedToken.sendTo(recepientAddress,amountNormalized,true).then(function(gas){
				elemEstimatedGas.innerHTML=gas;
				elemTransferAmount.innerHTML=amountNormalized;
				validTx=true;
			}).catch(function(e){
				elemTransferAmount.innerHTML="";
				elemEstimatedGas.innerHTML="Tx Error";
				validTx=false;
				console.error(e);
			});	
		}
	};
	elemRecepient.addEventListener("input",function(){
		estimateGas();
	});
	elemAmount.addEventListener("input",function(){
		estimateGas();
	});
	for(let tokenObjectId in tokenObjectDict){
		const elemToken=document.getElementById(tokenObjectId);
		const tokenObjectKey=tokenObjectDict[tokenObjectId];
		const token=tokens[tokenObjectKey];
		elemToken.addEventListener("click",function(){
			selectedToken=token;
			token.getBalance().then(function(balanceNormalized){
				elemAvailableBalance.innerHTML=Math.floor(10000*balanceNormalized)/10000;
			});
			estimateGas();
		});
	}
	elemTokenList.addEventListener("change",function(){
		console.log("Change");
		const selected=elemTokenList.options[elemTokenList.selectedIndex];
		console.log(selected);
		const tokenObjectId=selected.id;
		const tokenObjectKey=tokenObjectDict[tokenObjectId];
		const token=tokens[tokenObjectKey];
		token.getBalance().then(function(balanceNormalized){
			elemAvailableBalance.innerHTML=Math.floor(100*balanceNormalized)/100;
		});
		estimateGas();
		selectedToken=token;
	});
}
initUI();