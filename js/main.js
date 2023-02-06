
var productName =document.getElementById("productName");
var productPrice =document.getElementById("productPrice");
var category =document.getElementById("category");
var productDescription =document.getElementById("productDescription");
var addBtn =document.getElementById('addBtn');
var productContainer=[];

if (localStorage.getItem('products')!=null) {
    
    productContainer=JSON.parse(localStorage.getItem('products'));
    displayProducts();
}

function addProduct() {
if (nameValidation()==true&&priceValidation()==true&&categoryValidation()==true) {
    if(addBtn.innerHTML=="Update")
    {
        var newProduct ={
            name:productName.value,
            price:productPrice.value,
            category:category.value,
            decription:productDescription.value
        };
        productContainer.splice(myIndex,1,newProduct)
        // console.log(productContainer);
        localStorage.setItem('products',JSON.stringify(productContainer));
        clearForm();
        displayProducts();
        addBtn.innerHTML='Add product'
    }
    else
    {
        var product ={
            name:productName.value,
            price:productPrice.value,
            category:category.value,
            decription:productDescription.value
        };
        productContainer.push(product)
        localStorage.setItem('products',JSON.stringify(productContainer));
        // console.log(productContainer);
        clearForm();
        displayProducts();
    
}
}else
{
    if (nameValidation()==false) {
        productName.classList.add('is-invalid');
    }
    else{
        productName.classList.remove('is-invalid');
        productName.classList.add('is-valid');
    }
    if(priceValidation()==false) {
        productPrice.classList.add('is-invalid');
    }
    else{
        productPrice.classList.remove('is-invalid');
        productPrice.classList.add('is-valid');
    }
    if(categoryValidation()==false){
        category.classList.add('is-invalid');
    }
    else{
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
    }
}
}

function clearForm(){
    productName.value=''
    productPrice.value=''
    category.value=''
    productDescription.value=''
    productName.classList.remove('is-invalid');
    productPrice.classList.remove('is-invalid');
    category.classList.remove('is-invalid');
    productPrice.classList.remove('is-valid');
    productName.classList.remove('is-valid');
    category.classList.remove('is-valid');

}

function displayProducts() {
    var cartoona=''

    for (let i = 0; i < productContainer.length; i++) {

        cartoona+=`<tr>
        <td>
            ${productContainer[i].name}
        </td>
        <td>
        ${productContainer[i].price}
        </td>
        <td>
        ${productContainer[i].category}
        </td>
        <td>
        ${productContainer[i].decription}
        </td>
        <td>
        <button onClick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
        <td>
        <button onClick="updateProduct(${i})" class="btn btn-sm btn-outline-success">Update</button>
        </td>
    </tr>`

    }

    document.getElementById('tableBody').innerHTML=cartoona;
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex,1);
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts();
}

function searchProduct(term) {
    var cartoona=''
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            
        cartoona+=`<tr>
        <td>
            ${productContainer[i].name}
        </td>
        <td>
        ${productContainer[i].price}
        </td>
        <td>
        ${productContainer[i].category}
        </td>
        <td>
        ${productContainer[i].decription}
        </td>
        <td>
        <button onClick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
        <td>
        <button onClick="updateProduct(${i})" class="btn btn-sm btn-outline-success">Update</button>
        </td>
    </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=cartoona;

}
var myIndex=0
function updateProduct(idx)
{
    myIndex=idx;
    var nameValue=productContainer[idx].name;
    var priceValue=productContainer[idx].price;
    var categoryValue=productContainer[idx].category;
    var descriptionValue=productContainer[idx].decription;

    getValuesToUpdate()
    function getValuesToUpdate(){
        productName.value=nameValue;
        productPrice.value=priceValue;
        category.value=categoryValue;
        productDescription.value=descriptionValue;
        addBtn.innerHTML='Update'
    }

}

function nameValidation(){
    var nameRegex=/^[A-Z][a-z]{2,7}$/;
    if (nameRegex.test(productName.value)==true) {
        return true;
    }
    else{
        return false;
    }
}
function priceValidation(){
    var priceRegex=/^[1-9][0-9]{2,5}$/;


    if (priceRegex.test(productPrice.value)==true) {
        return true;
    }
    else{
        return false;
    }
}
function categoryValidation(){
    var categoryRegex=/^[A-Z][a-z]{1,7}$/;
    // var descriptionRegex=/^[^<>%$]*$/

    if (categoryRegex.test(category.value)==true) {
        return true;
    }
    else{
        return false;
    }
}
