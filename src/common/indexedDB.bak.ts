// /**
//  * indexedDb
//  * 还是用现成的轮子吧 这个留着
//  */
// import { DATABASE_NAME, DATABASE_VERSION, DATABASE_STORE } from '../conf/conf';

// type Store = typeof DATABASE_STORE;

// interface ObjectStore {
//   add: <T>(name: string, object: T) => Promise<IDBValidKey>;
//   find: <T>(name: string, key: string | number) => Promise<T>;
//   findAll: <T>(name: string) => Promise<IDBCursorWithValue | null>;
//   update: <T>(name: string, obj: T) => Promise<IDBValidKey>;
//   delete: <T>(name: string, key: string | number) => Promise<boolean>;
// }

// /**
//  * 创建事务
//  * @param { IDBDatabase } db 连接实例
//  * @param { Iterable<string> | string } storenames 库名
//  * @param { IDBTransactionMode  } type 读写类型
//  * @returns { Promise<IDBTransaction> }
//  */
// const beginTran = (db: IDBDatabase, storenames: string | Iterable<string>, type: IDBTransactionMode = 'readwrite'): Promise<IDBTransaction> => new Promise((resolve, reject) => {
//   const tranRequest = db.transaction(storenames, type);
//   tranRequest.onerror = (event) => {
//     console.log(`${type} 事务出错：`, event);
//     reject(new Error(`事务出错：${event}`));
//   };
//   tranRequest.oncomplete = () => {
//     // console.log('事务更新完成');
//     // resolve(tranRequest);
//   };
//   resolve(tranRequest);
// });

// class CreateIndexedDB implements ObjectStore {
//   public name: string;

//   public version: number;

//   public store: Store;

//   // public request!: IDBOpenDBRequest;

//   public db!: IDBDatabase;

//   constructor({ name, version, store }: {
//     name: string,
//     version: number,
//     store: Store
//   }) {
//     this.name = name;
//     this.version = version;
//     this.store = store;
//     // this.init();
//   }

//   init():Promise<IDBDatabase> {
//     return new Promise((resolve, reject) => {
//       const request = window.indexedDB.open(this.name, this.version);
//       request.onerror = (event) => {
//         console.error(event, 'indexedDB打开失败');
//         reject(new Error('indexedDB打开失败'));
//       };
//       request.onsuccess = () => {
//         this.db = request.result;
//         console.log('indexedDB连接成功');
//         resolve(request.result);
//       };
//       request.onupgradeneeded = (event) => {
//         console.log('onupgradeneeded');
//         const target = event.target as IDBOpenDBRequest;
//         this.db = target.result;
//         Object.keys(this.store).forEach((key) => {
//           const store = this.store[key as keyof typeof this.store];
//           if (!this.db.objectStoreNames.contains(key)) {
//             const objectStore = this.db.createObjectStore(key, { autoIncrement: !!store.keyPath, keyPath: store.keyPath ? store.keyPath : null });
//             if (!store.index.length) return;
//             store.index.forEach((index) => {
//               objectStore.createIndex(index, index, { unique: false });
//             });
//           }
//         });
//         resolve(request.result);
//       };
//     });
//   }

//   async beginTran(name: string) {
//     if (!this.db) {
//       this.db = await this.init();
//     }
//     return beginTran(this.db, name, 'readwrite');
//   }

//   async add<T>(name: string, object: T): Promise<IDBValidKey> {
//     return new Promise((resolve, reject) => {
//       this.beginTran(name).then((tranRequest) => {
//         const request = tranRequest.objectStore(name).add(object);
//         request.onsuccess = (event) => {
//           resolve(request.result);
//         };
//         request.onerror = (event) => {
//           console.error(event);
//           reject(new Error('添加失败'));
//         };
//       });
//     });
//   }

//   find<T>(name: string, key: string | number): Promise<T> {
//     return new Promise((resolve, reject) => {
//       this.beginTran(name).then((tranRequest) => {
//         const request = tranRequest.objectStore(name).get(key);
//         request.onsuccess = () => {
//           resolve(request.result);
//         };
//         request.onerror = (event) => {
//           console.error(event);
//           reject(new Error('查询失败'));
//         };
//       });
//     });
//   }

//   findAll(name: string): Promise<IDBCursorWithValue | null> {
//     return new Promise((resolve, reject) => {
//       this.beginTran(name).then((tranRequest) => {
//         const request = tranRequest.objectStore(name).openCursor();
//         request.onsuccess = () => {
//           resolve(request.result);
//         };
//         request.onerror = (event) => {
//           console.error(event);
//           reject(new Error('查询失败'));
//         };
//       });
//     });
//   }

//   update<T>(name: string, obj: T): Promise<IDBValidKey> {
//     return new Promise((resolve, reject) => {
//       this.beginTran(name).then((tranRequest) => {
//         const request = tranRequest.objectStore(name).put(obj);
//         request.onsuccess = () => {
//           resolve(request.result);
//         };
//         request.onerror = (event) => {
//           console.error(event);
//           reject(new Error('更新失败'));
//         };
//       });
//     });
//   }

//   delete(name: string, key: string | number): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       this.beginTran(name).then((tranRequest) => {
//         const request = tranRequest.objectStore(name).delete(key);
//         request.onsuccess = () => {
//           resolve(true);
//         };
//         request.onerror = (event) => {
//           console.error(event);
//           reject(new Error('更新失败'));
//         };
//       });
//     });
//   }
// }

// export interface CreateStore<T> {
//   add: (object: T) => Promise<IDBValidKey>;
//   find: (key: string | number) => Promise<T>;
//   findAll: () => Promise<IDBCursorWithValue | null>;
//   update: (obj: T) => Promise<IDBValidKey>;
//   delete: (key: string | number) => Promise<boolean>;
// }

// const useIndexedDb = {
//   dbName: '',
//   dbVersion: 1,
//   dbStore: {},
//   store: {} as {
//     [key: string]: any
//   },

//   createDB(name: string, version: number, store: Store) {
//     this.dbName = name;
//     this.dbVersion = version;
//     this.dbStore = store;
//     const indexDB = new CreateIndexedDB({ name, version, store });
//     Object.keys(store).forEach((key) => {
//       this.store[key as keyof typeof store] = {
//         add: <T>(object: T) => indexDB.add(key, object),
//         find: (findkey: string | number) => indexDB.find(key, findkey),
//         findAll: () => indexDB.findAll(key),
//         update: <T>(object: T) => indexDB.update(key, object),
//         delete: (findkey: string | number) => indexDB.delete(key, findkey),
//       };
//     });
//   },
//   useStore<T>(storeName: 'layout' | 'shortcut'): CreateStore<T> {
//     return this.store[storeName];
//   },
// };

// export default useIndexedDb;
