"use strict";
 function initUI(){
      const elemRoot=document.createElement("div");
      const elemHeader=document.createElement("div");
      const elemConnect=document.createElement("div");
      let isConnected=false;

      const setConnected=function(walletAddress){
        elemConnect.innerHTML=walletAddress;
        isConnected=true;
      };

      const setDisconnected=function(){
        elemConnect.innerHTML="Wallet Connect";
        isConnected=false;
      };

      const connectHandler=function(){
        if(!isConnected){
          connect();
        }
      };

      const addWalletConnect=function(){
        addWalletConnectHandler("connect0",function(walletAddress){
          setConnected(walletAddress);
          window.location.href="./coinlist.html";
        });
      };

      const styleConnect=function(){
        const e=elemConnect;
        e.style.cursor="pointer";
        e.style.padding="20px 45px";
        e.style.borderRadius="5px";
        e.style.backgroundColor="#00C4F4";
        e.style.color="#ffffff";
        e.innerHTML="Wallet Connect";
        e.addEventListener("click",connectHandler);
      };

      const styleHeader=function(){
        const e=elemHeader;
        e.style.display="flex";
        e.style.alignItems="flex-end";
        e.appendChild(elemConnect);
      };

      const styleRoot=function(){
        const e=elemRoot;
        e.appendChild(elemHeader);
      };

      const init=function(){
        addWalletConnect();
        styleConnect();
        styleHeader();
        styleRoot();
      };

      init();
      return elemRoot;
    }

    const elemRoot=initUI();
    document.querySelector(".header-btn").appendChild(elemRoot);
