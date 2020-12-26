let id;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
id = dd + mm + yyyy;

for (let i = 0; i < 6; i++) {
    let N = Math.floor(Math.random() * 10);
    id = id + N;
}

console.log(id);