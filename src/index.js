const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 797,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

function saveNumber() {
  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;
  // let number = document.getElementById("number").value;
  let path = "./src/files/number.txt";

  if (fs.existsSync(path)) {
    fs.appendFile(path, name + " " + number + ";", (err) => {
      const result = err ? err : "";
      console.log(result);
    });
  } else {
    fs.writeFile(path, name + " " + number + ";", (err) => {
      if (err) throw err;
    });
  }
  document.getElementById("form").reset();
}

const listContacts = () => {
  let path = "./src/files/number.txt";

  if (path === undefined) {
    console.log("No file Selected");
    return;
  }

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let contacts = [];

    contacts.push(data);

    let ul = document.querySelector(".list-group");

    for (var i = 0; i < contacts.toString().split(";").length - 1; i++) {
      var html = `
    <li class="list-group-item my-2">
        <img src="man.png" alt="" width="40px" height="40px">
        ${contacts.toString().split(";")[i]}
    </li>
    `;
      ul.innerHTML = ul.innerHTML + html;
    }
  });
};

const call = () => {
  let number = document.getElementById("number").value;
  console.log(number);
  let path = "./src/files/callsHistory.txt";
  let ul = document.getElementById("callPopUp");
  var date = new Date();

  var dateAppel =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);

  if (fs.existsSync(path)) {
    fs.appendFile(path, number + " " + dateAppel + ";", (err) => {
      err ? console.log(err) : console.log("Calling........");
    });
  } else {
    fs.writeFile(path, number + " " + dateAppel + ";", (err) => {
      if (err) throw err;
    });
  }
  ul.innerHTML = number;
  document.getElementById("form").reset();
};

const calls = () => {
  let path = "./src/files/callsHistory.txt";

  if (path === undefined) {
    console.log("No file Selected");
    return;
  }

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      alert(err.message);
      return;
    }

    let callsHistorys = [];

    callsHistorys.push(data);

    let ul = document.querySelector("#lists");
    var html = ``;

    for (var i = 0; i < callsHistorys.toString().split(";").length - 1; i++) {
      html = `
    <li class="list-group-item my-2 ">
        <img src="man.png" alt="" width="40px" height="40px">
        <span class="mr-8">${callsHistorys.toString().split(";")[i]}</span>
    </li>
    `;
      ul.innerHTML = ul.innerHTML + html;
    }
  });
};

app.whenReady().then(createWindow);
