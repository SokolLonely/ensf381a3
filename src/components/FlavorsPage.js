import Header from "./Header";
import Footer from "./Footer";
function FlavorItem(id,
name,
price,
image)
{
  return(
    <div className="flavorcard">
     <img src = {image}/>
     <p>{name}</p>
     <p>{price}</p>
     <p>quantity = 1</p>
    </div>
  )

}
function OrderItem()
{
  return(
    <div>
      order item placeholder
    </div>
  )
}
function FlavorCatalog()
{
  return(
    <div>
      flavor Catalog placeholder
    </div>
  )
}
function OrderList()
{
  return(
    <div>
      order list placeholder
    </div>
  )
}
function Flavors() {
  return (
    <div className="flavors-page">
<Header />
<div className="content">
<FlavorCatalog />
<OrderList />
</div>
<Footer />
</div>
  );
}

export default Flavors;