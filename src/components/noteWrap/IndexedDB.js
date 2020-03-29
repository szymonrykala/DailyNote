import Dexie from 'dexie';

class IndexedDataBase {
     constructor(name, patternOBJ) {
          this.DBName = name;
          this.pattern = patternOBJ;
          this.tableName = Object.keys(patternOBJ)[0];
          this.IDBconn = {}
     }

     init() {
          const idb = new Dexie(this.DBName);
          idb.version(1).stores(this.pattern);
          idb.open().catch(err => {
               console.error(err.stack || err);
               alert(err);
               return false;
          });
          this.IDBconn = idb;
          return true;
     }

     async getData(callback) {
          try {
               const data = await this.IDBconn[this.tableName].toArray();
               callback(data);
          } catch (error) {
               console.error(`read DB: ${error}`);
               return (`read DB: ${error}`);
          }
     }

     async deleteData(key, OBJ) {
          try {
               await this.IDBconn[this.tableName].where(key).equals(OBJ[key]).delete();
               return true;
          } catch (err) {
               console.error(err.stack || err);
               return false
          }
     }

     async insertData(OBJ) {
          try {
               await this.IDBconn[this.tableName].add(OBJ);
               return true
          } catch (err) {
               // alert(err);
               console.error(err.stack || err);
               return true
          }
     }

     async updateRow(key, newObject) {
          try {
               await this.IDBconn[this.tableName].where(key)
                    .equals(newObject[key])
                    .modify(newObject);
               return true;
          } catch (err) {
               console.error(err.stack || err);
               return false;
          }
     }

     async updateTable(table) {
          try {
               await this.IDBconn[this.tableName].bulkPut(table);
               return true;
          } catch (err) {
               console.error(err.stack || err)
               // alert(err);
               return false;
          }
     }
}
export default IndexedDataBase;