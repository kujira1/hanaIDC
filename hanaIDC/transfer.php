<?php include './inc/header.php';?>

        <!-- main-area -->
<?php include './inc/idc02.php';?>
  <style>

    /* common settings */
    h3 {
      font-size: 1.2em;
      font-weight: 800;
    }

    .wrapper {
      width: 100%;
      margin-bottom: 3em;
    }

    /* left-col content */
    .select-wrapper {
      position: relative;
    }

    .select-wrapper select {
      display: none;
    }

    .select-wrapper select:hover,
    .select-wrapper select:active {
      border: 1px solid #3d7bff;
    }

    .select-selected {
      background-color: #ffffff;
    }

    .select-selected:after {
      position: absolute;
      content: "";
      top: 25px;
      right: 20px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: #000000 transparent transparent transparent;
    }

    .select-selected.select-arrow-active:after {
      border-color: transparent transparent #0000000 transparent;
      top: 25px;
    }

    .select-items div,
    .select-selected {
      color: #000000;
      padding: 20px;
      border: 1px solid transparent;
      border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
      cursor: pointer;
    }

    .select-items {
      position: absolute;
      background-color: #ffffff;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 99;
    }
    .select-hide {
      display: none;
    }

    .select-items div:hover,
    .same-as-selected {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .input {
      padding: 20px;
      border: 1px solid #dddddd;
      color: #666666;
      font-weight: 600;
      width: 100%;
    }

    .input:hover {
      border: 1px solid #3d7bff;
    }

    .btn {
      background-color: #3d7bff;
      padding: 20px;
      color: #ffffff;
      width: 100%;
      text-align: center;
     border-radius: 0px;
    }

    .btn:hover {
      background: #5c8ffe;
    }

    /* right col */
    .box {
      background-color: #e0e0e0;
      padding: 30px;
      width: 80%;
      max-height: 250px;
      width: 350px;
    }

    .box h3 {
      color: #666666;
      margin-top: 2em;
    }

    .box p {
      color: #000000;
    }
		.col-lg-22 {
    flex: 0 0 auto;
    width: 33.33333337%;
      background-color: #e0e0e0;
	        padding: 30px;
}

		.col-lg-88 {
    flex: 0 0 auto;
    width: 66.66666667%;
      background-color: #f8f8f8;
	        padding: 30px;
}
h32 {
    font-family: 'Poppins', sans-serif;
    color: #121111;
    margin-top: 0px;
    font-style: normal;
    font-weight: 600;
    text-transform: capitalize;
}

h33 {
 font-size: 1.2em;
color: #666666;
    margin-top: 0px;
    font-style: normal;
    font-weight: 800;
    text-transform: capitalize;
}

h34 {
    font-family: 'Poppins', sans-serif;
color: #000;
	margin-top: 2em;
    font-style: normal;
    font-weight: 600;
    text-transform: capitalize;
}

  </style>

   <section class="blog-area pt-130 pb-130">
                <div class="container">
                    <div class="row"><div class="col-lg-88">
          <h32>Coin</h32>
          <div class="select-wrapper" >
            <select id="TokenList">
              <h4>Select Coin</h4>
              <option value="none">Select Coin</option>
              <option id="OptBNB" value="BNB"  title="https://www.chatcl.io/assets/img/b1.png"><img src="assets/img/b1.png" style="width:25px; height:25px;" alt=""> BNB</option>
              <option id="OptBUSD" value="BUSD"><img src="assets/img/b2.png" style="width:25px; height:25px;" alt=""> BUSD</option>
              <option id="OptFIL" value="FIL"><img src="assets/img/b3.png" style="width:25px; height:25px;" alt=""> FIL</option>
            </select>
          </div>
          <p>Available Balance <span id="AvailableBalance">0.00</span></p>

        <div class="wrapper">
          <h32>Recipient Address</h32>
          <input id="RecepientAddress" class="input" type="text" placeholder="Recipient Address" />
        </div>
        <div class="wrapper">
          <h32>Amount</h32>
          <input id="SendAmount" class="input" type="text" placeholder="Amount" />
        </div>
        <div id="ButtonTransfer" class="btn">TRANSFER</div>
      </div>
    <div class="col-lg-22">

          <h33>Transfer Info</h33><br>
          <h34>Transfer Amount</h34>
          <p id="TransferAmount"></p>
          <h34>Gas Fee (est.)</h34>
          <p id="EstimatedGas">0.00</p>

      </div></div>
    </div>
</section>
  <script>
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("select-wrapper");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement("DIV");

		// 수정 내역입니다.
		const optId=selElmnt.options[j].id;
		if(optId!=null&&optId!==""){
			c.id="_"+optId;
		}
		//새로 생성되는 HTML Element를 식별할 수 있게 추가해 두었습니다. -kinnefix-

        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  </script>
  <script src="./js/transfer.js">
  </script>
<?php
include './inc/footer.php';
?>

