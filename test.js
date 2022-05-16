// app.js

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const ages = [26, 27, 26, 26, 28, 28, 29, 29, 30];
const uniqueAges = ages.filter(unique);

const cate = ["Comic Book", "Laptop", "Laptop", "Laptop", "Laptop"];
const uniqueCateg = cate.filter(unique);
console.log(uniqueAges,uniqueCateg);
