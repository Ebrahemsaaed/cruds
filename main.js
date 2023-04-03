// hold element by id
let title = document.getElementById("title");
let price = document.getElementById("price");
let texas = document.getElementById("texas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let rrr;
//  function get total 
function gettotal() {
    if (price.value != "") {
        let result = (+price.value + +texas.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    }
    else {
        total.innerHTML = ""
        total.style.backgroundColor = "red";
    }
}
// function create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)

} else {
    datapro = [];
}
submit.onclick = () => {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        texas: texas.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }

    if (title.value != "") {
        if (mood === "create") {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);

            }
        } else {
            datapro[rrr] = newpro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block"
        }
    }




    // datapro.push(newpro);
    localStorage.setItem("product", JSON.stringify(datapro));
    cleardata();
    showdata();



};
// clear inputs

function cleardata() {
    title.value = "";
    price.value = "";
    texas.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";

}
// read function

function showdata() {
    gettotal()
    let table = "";
    for (i = 0; i < datapro.length; i++) {
        table += `
            <tr tr >
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].texas}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>

    </tr >
    `

    }
    document.getElementById("tbody").innerHTML = table;

    let btndelete = document.getElementById('deleteall')
    if (datapro.length > 0) {
        btndelete.innerHTML = `<button onclick="deleteall()" >delete all (${datapro.length}) </button>`
    } else {
        btndelete.innerHTML = ""
    }
}
showdata();

// delet function
function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro)
    showdata()


}
// delete all function
function deleteall() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
// update function
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    texas.value = datapro[i].texas;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    gettotal()
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update";
    rrr = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })


};

// function search
let searchmood = 'title';
function getsearchmood(id) {
    let search = document.getElementById("search");
    if (id == "searchtitle") {
        searchmood = "title";
        search.placeholder = "search by title";
    } else {
        searchmood = "category";

    }
    search.placeholder = 'search by ' + searchmood;
    search.focus()
    search.value = "";
    showdata()


}

function searchdata(value) {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == "title") {
            if (datapro[i].title.includes(value)) {
                table += `
                <tr tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].texas}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr >
                `
                    ;
            }
        }
        else {
            if (datapro[i].category.includes(value)) {
                table += `
            <tr tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texas}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>

            </tr >
            `
                    ;

            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}

// clean data

