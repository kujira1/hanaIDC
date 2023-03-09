<?php include './inc/header.php';?>

        <!-- main-area -->
<?php include './inc/idc02.php';?>
  <style>



    h3 {
      font-size: 1.2em;
    }

    .btn_skull {
      padding: 20px 12px;
      color: #3d7bff;
      border: 1px solid #3d7bff;
     cursor: pointer;
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

	.col-lg-22 {
    flex: 0 0 auto;
    width: 33.33333337%;
      background-color: #f7f7f7;
}
  </style>

           <section class="blog-area pt-130 pb-130">
                <div class="container">
                    <div class="row"><div class="col-lg-22">    <h6><font color="000"><br><img src="assets/img/bsc.png" style="width:25px; height:25px;" alt=""> Smart Chain</font></h6></div><div class="col-lg-8">

        <h3><font color="000">BEP20 Address</font></h3>
        <p id="WalletAddress"></p>
        <div id="ButtonTransfer" class="btn_skull">TRANSFER</div>

      <div class="list">
        <div class="list-header">
          <div class="head-token">TOKEN</div>
          <div class="head-balance">BALANCE</div>
        </div>
        <div class="token-list">
          <div class="list-wrapper">
            <div class="token"><img src="assets/img/b1.png" style="width:25px; height:25px;" alt=""> BNB</div>
            <div id="BNBBalance" class="balance">0</div>
          </div>
          <div class="list-wrapper">
            <div class="token"><img src="assets/img/b2.png" style="width:25px; height:25px;" alt=""> BUSD</div>
            <div id="BUSDBalance" class="balance">0</div>
          </div>
          <div class="list-wrapper">
            <div class="token"><img src="assets/img/b3.png" style="width:25px; height:25px;" alt=""> FIL</div>
            <div id="FILBalance" class="balance">0</div>
          </div>
          </div>
        </div>
      </div>
    </div></div> </div> </section>
	<script src="./js/coinlist.js"></script>

<?php
include './inc/footer.php';
?>
