// https://github.com/jonnysmith1981/getIndexedDbSize/blob/master/getIndexedDbSize.js
//https://gist.github.com/MKhowaja/c693545972f55c4231e8959bb191387e

// Both codes doesn't work for me. Use ths code to get all data.
// be careful of delay() method. 1 sec might not enough.
    var db;
    var dbarray = [];
    var storesizes = new Array();
    var dbNames = [];
    var parsablePrint = [];
    var totalSize = 0;
    function openDatabase(dbname) {
      return new Promise(function(resolve, reject) {
        // console.log(`openDatabase ${dbname}`);
        dbNames.push(dbname)
        var request = window.indexedDB.open(dbname);
        request.onsuccess = function (event) {
          db = event.target.result;
          dbarray.push(db);
          resolve(db.objectStoreNames);
        };
      });
    }
   

    var dbPromiseArray = [];
    var databases = [];
    window.indexedDB.databases().then(database => {
      databases.push(database);
      database.forEach(dbMap => {
        dbPromiseArray.push(openDatabase(dbMap.name));
      });
    });
var getTableSize = function(db, dbName){
  return new Promise((resolve,reject) => {
    if (db == null) {
      return reject();
    }
    var size = 0;
    db = event.target.result;
    var transaction = db.transaction([dbName])
      .objectStore(dbName)
      .openCursor();

    transaction.onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor){
            var storedObject = cursor.value;
            var json = JSON.stringify(storedObject);
            size += json.length;
            cursor.continue();
        }
        else{
          resolve(size);
        }
    }.bind(this);
    transaction.onerror = function(err){
        reject("error in " + dbName + ": " + err);
    }
  });
};


var getDatabaseSize = function (dbName) {
  // console.log(`getDatabaseSize`, dbName);
  var request = indexedDB.open(dbName);
  var db;
  var dbSize = 0;
  request.onerror = function(event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event) {
    db = event.target.result;
    var tableNames = [ ...db.objectStoreNames ];
    (function(tableNames, db) {
      var tableSizeGetters = tableNames
        .reduce( (acc, tableName) => {
          acc.push( getTableSize(db, tableName) );
          return acc;
        }, []);

      Promise.all(tableSizeGetters)
        .then(sizes => {
          console.log('--------- ' + db.name + ' -------------');
          tableNames.forEach( (tableName,i) => {
            console.log(" - " + tableName + "\t: " + humanReadableSize(sizes[i]));
          });
          var total = sizes.reduce(function(acc, val) {
            return acc + val;
          }, 0);

          console.log("TOTAL: " + humanReadableSize(total))
          parsablePrint.push(db.name +"\t "+ humanReadableSize(total));
          totalSize+=total;
        });
      })(tableNames, db);
  };
};

var humanReadableSize = function (bytes) {
  var thresh = 1024;
  if(Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = ['KB','MB','GB','TB','PB','EB','ZB','YB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1)+' '+units[u];
}

var printIndexDBSizes = function() {
   for(var i=0; i < dbNames.length; i++) {
      dbName = dbNames[i];
      getDatabaseSize(dbName);
  };

  delay(1500).then(() => {
    console.log("===================");
    for(var i=0; i < parsablePrint.length; i++) {
      console.log(parsablePrint[i]);
    }
    console.log("===================");
    console.log(humanReadableSize(totalSize));
  });
}

//usage
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => printIndexDBSizes());
;
