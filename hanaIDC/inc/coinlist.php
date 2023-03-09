<?php include './inc/header.php';?>

        <!-- main-area -->
<?php include './inc/idc01.php';?>


  <style>
    body {
      font-size: 16px;
      background-color: #eeeeee;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    h3 {
      font-size: 1.2em;
    }

    .btn_skull {
      padding: 20px 12px;
      color: #3d7bff;
      border: 1px solid #3d7bff;
      width: 350px;
      text-align: center;
    }

    .btn_skull:hover {
      background-color: #ffffff;
    }

    .list {
      margin-top: 2em;
    }

    .list-header {
      display: flex;
      color: #8d8d8d;
      width: 100%;
      margin-bottom: 1em;
      padding: 0 10px;
    }

    .head-token {
      width: 50%;
      text-align: left;
    }

    .head-balance {
      text-align: right;
      width: 50%;
    }

    .token-list {
      background-color: #ffffff;
    }
    .list-wrapper {
      display: flex;
      padding: 20px 30px;
    }
    .token {
      width: 80%;
    }
    .balance {
      width: 20%;
      text-align: right;
    }
  </style>
  <body>
    <div class="container">
      <header>
        <h3>BEP20 Address</h3>
        <p id="WalletAddress"></p>
        <div id="ButtonTransfer" class="btn_skull">TRANSFER</div>
      </header>
      <div class="list">
        <div class="list-header">
          <div class="head-token">TOKEN</div>
          <div class="head-balance">BALANCE</div>
        </div>
        <div class="token-list">
          <div class="list-wrapper">
            <div class="token">BNB</div>
            <div id="BNBBalance" class="balance">0</div>
          </div>
          <div class="list-wrapper">
            <div class="token">BUSD</div>
            <div id="BUSDBalance" class="balance">0</div>
          </div>
          <div class="list-wrapper">
            <div class="token">FIL</div>
            <div id="FILBalance" class="balance">0</div>
          </div>
          </div>
        </div>
      </div>
    </div>

<?php
include './inc/footer.php';
?>
