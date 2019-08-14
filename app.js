const electron = require("electron");
const url = require("url");
const path = require("path");
const {app,  BrowserWindow, Tray, Menu} = electron;

let mainWindow = null;


const instance = app.requestSingleInstanceLock();

if (!instance) {
	app.quit()
  } else {
	app.on('second-instance', (event, commandLine, workingDirectory) => {
	  if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore()
		mainWindow.focus()
	  }
	})
}

app.on('ready', function(){

	windowFactory(1000, 620);

	mainWindow.loadURL(url.format({
		pathname : path.join(__dirname, 'index.html'),
		protocol : 'file:',
		slashes : true
	})); 
	//debug
	mainWindow.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

});


app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('activate', () => {
	if (!mainWindow.isVisible()) {
		mainWindow.show();
	}
});


function windowFactory(width, height){

	//const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
	mainWindow = new BrowserWindow({
		title       : 'MyExpenser',
		titleBarStyle: 'hidden-inset',
		width       : width,
		height      : height,
		minWidth    : width,
		minHeight   : height,
		transparent : false,
		frame       : false,
		resizable   : false,
		radii: [5,5,5,5],
		webPreferences: {
            nodeIntegration: true
        }
	});
}