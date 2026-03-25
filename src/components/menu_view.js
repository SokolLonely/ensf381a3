let order = [
    {name: 'Mango Tango', price: 5.99, quantity: 0},
    {name: 'Vanilla Snowflake', price: 7.99, quantity: 0},
    {name: 'Maple Syrup', price: 6.0, quantity: 0},
    
];

function addFlavour(name)
{
    const index = order.findIndex(item => item.name === name);
    order[index].quantity += 1;
    console.log(order);
    update_display();
}
function removeFlavour(name)
{
    const index = order.findIndex(item => item.name === name);
    if ((index !== -1)&&(order[index].quantity > 0) ){
        order[index].quantity = 0;
    }
    console.log(order);
    update_display();
}
function update_display(){
    const html_link = document.getElementById("orderList");
    html_link.innerHTML = "";
    
    for (let flavour of order){
        if (flavour.quantity > 0)
        {
            const li = document.createElement("li");
            li.className = "cart-row";
            const name = document.createElement("a");
            name.textContent = flavour.name + " (" + flavour.quantity+")";
            name.className = "make_bold";
            const price = document.createElement("a");
            price.textContent = "$" + (flavour.price * flavour.quantity).toFixed(2);
            li.appendChild(name);
            li.appendChild(price);

html_link.appendChild(li);
        }
    }
    
    if (html_link.innerHTML.length == 0)
    {
        html_link.innerHTML = "No items in cart";
    }
}