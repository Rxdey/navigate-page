import { DATABASE_NAME, DATABASE_VERSION, DATABASE_STORE } from './conf';

type Store = typeof DATABASE_STORE;

/**
 * 创建事务
 * @param { IDBDatabase } db 连接实例
 * @param { Iterable<string> | string } storenames 库名
 * @param { IDBTransactionMode  } type 读写类型
 * @returns { Promise<IDBTransaction> }
 */
const beginTran = (db: IDBDatabase, storenames: string | Iterable<string>, type: IDBTransactionMode = 'readwrite'): Promise<IDBTransaction> => new Promise((resolve, reject) => {
  const tranRequest = db.transaction(storenames, type);
  tranRequest.onerror = (event) => {
    console.log(`${type} 事务出错：`, event);
    reject(new Error(`事务出错：${event}`));
  };
  resolve(tranRequest);
});

class CreateIndexedDB {
  public name: string;

  public version: number;

  public store: Store;

  public request!: IDBOpenDBRequest;

  public db!: IDBDatabase;

  constructor({ name, version, store }: {
    name: string,
    version: number,
    store: Store
  }) {
    this.name = name;
    this.version = version;
    this.store = store;
    this.init();
  }

  init() {
    this.request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    this.request.onerror = (event) => {
      console.error(event, 'indexedDB打开失败');
    };
    this.request.onsuccess = () => {
      this.db = this.request.result;
      console.log('indexedDB连接成功');
    };
    this.request.onupgradeneeded = (event) => {
      console.log('onupgradeneeded');
      const target = event.target as IDBOpenDBRequest;
      this.db = target.result;
      Object.keys(this.store).forEach((key) => {
        const store = this.store[key as keyof typeof this.store];
        if (!this.db.objectStoreNames.contains(key)) {
          const objectStore = this.db.createObjectStore(key, { keyPath: store.keyPath });
          if (!store.index.length) return;
          store.index.forEach((index) => {
            objectStore.createIndex(index, index, { unique: false });
          });
        }
      });
    };
  }

  beginTran(name: string) {
    return beginTran(this.db, name, 'readwrite');
  }

  add(name: string, object: any) {
    return new Promise((resolve, reject) => {
      this.beginTran(name).then((tranRequest) => {
        const request = tranRequest.objectStore(name).add(object);
        request.onsuccess = (event) => {
          resolve(request.result);
        };
        request.onerror = (event) => {
          console.error(event);
          reject(new Error('添加失败'));
        };
      });
    });
  }

  find(name: string, key: string | number) {
    return new Promise((resolve, reject) => {
      this.beginTran(name).then((tranRequest) => {
        const request = tranRequest.objectStore(name).get(key);
        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = (event) => {
          console.error(event);
          reject(new Error('查询失败'));
        };
      });
    });
  }
}
