var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var editProduct = document.getElementById("addProduct");
var productContainer;
var indexGlobal=0
if(localStorage.getItem("productList") == null){
  productContainer=[];
}
else{
  productContainer= JSON.parse(localStorage.getItem("productList"))
  tablecontent()
}

function tableFilling() {
  if (productName.value == "" ||
    productPrice.value == "" ||
    productCategory.value == "" ||
    productDescription.value == "") {
    window.alert("You should fill all fields!!!")
  }
  else {
    if (editProduct.innerHTML == "Add Product") {
      var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
      }
      productContainer.push(product)
      localStorage.setItem("productList", JSON.stringify(productContainer) );
      tablecontent()
      clearData()
    }
    else {
    
      addEditing()
      tablecontent()
      clearData()
      editProduct.innerHTML = "Add Product";
      tablecontent()
    }
  }
}


function tablecontent() {
  var tableAdding = "";

  for (var i = 0; i < productContainer.length; i++) {
    tableAdding += `
    <tr>
    <td>${i}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].description}</td>
    <td><button class="btn btn-outline-warning" onclick="updateDate(${i})">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteRow(${i})">Delete</button></td>
    </tr>`
  }
  document.getElementById('tableContent').innerHTML = tableAdding;
}

function clearData() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function deleteRow(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productContainer) );
  tablecontent()
}

function updateDate(index) {
  indexGlobal=index
  editProduct.innerHTML = "Edit item";
  productName.value = productContainer[index].name;
  productPrice.value = productContainer[index].price;
  productCategory.value = productContainer[index].category;
  productDescription.value = productContainer[index].description;

}
function addEditing() {

  productContainer[indexGlobal].name = productName.value;
  productContainer[indexGlobal].price = productPrice.value;
  productContainer[indexGlobal].category = productCategory.value;
  productContainer[indexGlobal].description = productDescription.value;
}


function search(trim){

  var product="";
  for (i=0; i<productContainer.length; i++){
    if(productContainer[i].name.toLowerCase().includes(trim.toLowerCase()) == true){
      product+=`
      <tr>
      <td>${i}</td>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].description}</td>
      <td><button class="btn btn-outline-warning" onclick="updateDate(${i})">Update</button></td>
      <td><button class="btn btn-outline-danger" onclick="deleteRow(${i})">Delete</button></td>
      </tr>`
    }
  }
  document.getElementById('tableContent').innerHTML = product;
}