import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>JS Phonebook</h1>
<div>
  <label>Name:
    <input id="name" type="text" />
  </label>
  <label>Phone:
    <input id="phone" type="text" />
  </label>
  <button id="add_button" type='button'>Add</button>
</div>
<div id="phonebook">
</div>
`;

/*
1. edit
2. sort | alphab. or in reverse
3. search
4. persist { use the localStorage API to store the phonebook }
*/

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const add_button = document.getElementById("add_button");

class Phonebook {
  constructor(name, phone) {
    this.name_field = name;
    this.phone_field = phone;

    this.record = [];
    //this.record = (localStorage.getItem('phonebook');
  }


  add(name, phone) {
    let canSave = true;

    this.record.forEach(function (person) {
      if ((person.name == name) && (person.phone == phone)) {
        canSave = false;
      }
    });

    if (canSave == true) this.record.push({ name, phone });
    else return console.log("This entry already exists in your phonebook");
  }

  display() {
    const pb = document.getElementById("phonebook");
    pb.innerText = "";

    this.record.forEach((person) => {
      let person_elm = document.createElement("div");
      person_elm.class = "person";
      person_elm.innerText = `Name: ${person.name}| Mobile: ${person.phone}`;

      let delete_btn = document.createElement("button");
      delete_btn["onclick"] = () => {
        let idx = this.record.indexOf(person);
        this.delete(idx);
      };
      delete_btn.innerText = "Delete";

      person_elm.appendChild(delete_btn);
      pb.appendChild(person_elm);
    });

    return this.record;
  }

  delete(idx) {
    // record: Array<object>
    //1) Slice the array
    //2) Convert to object, use 'delete' and reconvert to array

    // {1}
    let arr_1 = this.record.slice(0, idx);
    let arr_2 = this.record.slice(idx + 1, this.record.length);
    this.record = arr_1.concat(arr_2);
    this.display();

    // {2}
    // let tmp_record = {...this.record};
    // delete tmp_record[idx];
    // let tmp_arr = [];
    // Object.keys(tmp_record).forEach(entry => tmp_arr.push(this.record[entry]));
    // this.record = tmp_arr;
    // this.display();
  }
}

function main() {
  var phonebook = new Phonebook(name, phone);

  add_button.addEventListener("click", () => {
    phonebook.add(name.value, phone.value);
    phonebook.display();
  });

}

main();

