"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const path = require('path');
const SqlJs = require('sql.js');
const fs = require("fs");

let SqlHelpers = (function () {
	function SqlHelpers() {
	}

	function toBinArray (str) {
		var l = str.length,
				arr = new Uint8Array(l);
		for (var i=0; i<l; i++) arr[i] = str.charCodeAt(i);
		return arr;
	}

	function toBinString (arr) {
		var uarr = new Uint8Array(arr);
		var strings = [], chunksize = 0xffff;
		for (var i=0; i*chunksize < uarr.length; i++){
			strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
		}
		return strings.join('');
	}

	SqlHelpers.prototype.initialize = function () {

		try {
			var filebuffer = fs.readFileSync(path.join(__dirname, '../database/database.sqlite'));
		} catch (e) {
			console.log(e);
		}

		let config = { 
			locateFile: filename => 'database/sql-wasm.wasm' 
		}
		
		var ql = SqlJs(config).then(function(SQL){
			if(filebuffer != null){
				var db = new SQL.Database(filebuffer);
			}else{
				var db = new SQL.Database();
				db.run(
					"CREATE TABLE expense (`id` INTEGER  PRIMARY KEY autoincrement, `category_id` INTEGER(11), `type_id` INTEGER(11), `expense_amount` VARCHAR(200), `date` date)"
				);
				db.run(
					"CREATE TABLE categories (`category_id` INTEGER  PRIMARY KEY autoincrement, `category_title` VARCHAR(200))"
				);
				db.run(
					"CREATE TABLE type (`type_id` INTEGER  PRIMARY KEY autoincrement, `type_title` VARCHAR(200))"
				);
			}
			fs.writeFileSync(path.join(__dirname, '../database/database.sqlite'), Buffer.from(db.export()));;
			return db;

		});

		return ql;
	};
	
	return SqlHelpers;
}());
exports.SqlHelpers = SqlHelpers;
