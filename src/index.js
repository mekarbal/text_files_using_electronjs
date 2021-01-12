const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
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
}

const listContacts = () => {
  let path = "./src/files/number.txt";

  if (path === undefined) {
    console.warn("No file Selected");
    return;
  }

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      alert("An error occurred reading the file :" + err.message);
      return;
    }

    let contacts = [];

    contacts.push(data);

    console.log("the file content is:" + data);
    console.log(contacts);

    let ul = document.querySelector(".list-group");

    var html = ``;
    for (var i = 0; i < contacts.toString().split(";").length - 1; i++) {
      html = `
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
  let path = "./src/files/callsHistory.txt";

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
      const result = err ? err : "Calling ...";
      console.log(result);
    });
  } else {
    fs.writeFile(path, name + " " + number + " " + dateAppel + ";", (err) => {
      if (err) throw err;
      console.log("Calling");
    });
  }

  document.getElementById("callPopUp").innerHTML = number + "...";
};

const listAppels = () => {
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

    let ul = document.querySelector("#list-group");
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(createWindow);
