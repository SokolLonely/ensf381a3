let totalSeconds = 600
const timerElement = document.getElementById("timer");
console.log(timerElement);

let txt =  "Order time left: ";

function update_timer()
{
   let minutes = Math.floor(totalSeconds / 60);
   let seconds = totalSeconds % 60;
   time_format = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
   timerElement.innerHTML = txt + time_format;
   totalSeconds -=1;
   console.log(totalSeconds);
   if (totalSeconds < 0)
   {
    console.log("time's up");
    window.location.href="order_summary.html";
   }

}
const timerInterval = setInterval(update_timer, 1000);
//update_timer();
function alert_checkbox(){
update_price();
if( ! document.getElementById("sprinkles").checked && !document.getElementById("nuts").checked&& !document.getElementById("caramel").checked)
{
   alert("Warning: no toppings chosen");
}

}
function alert_radiobutton(){
if( ! document.getElementById("cup").checked && !document.getElementById("cone").checked)
{
   alert("Warning: no cup/cone chosen");
}
}
function update_price(){
   const html_el = document.getElementById("total_price");
    html_el.innerHTML = "";
   let text = "Total Price: $"
   let price = 6;
   
   if (document.getElementById("sprinkles").checked)
      {
         price +=1.5;
      } 
   if (document.getElementById("nuts").checked)
      {
         price +=1.5;
      }
   if (document.getElementById("caramel").checked)
      {
         price +=1.5;
      }
      //console.log(price);
   html_el.innerHTML = text + (price).toFixed(2);
   console.log(text + price);
}