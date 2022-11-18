type StorageType = 'localStorage' | 'sessionStorage';

export interface StorageProps {
  stringType: string;
  arrayType: Array<number>;
}

// 浏览器缓存
class Storage {
  type: StorageType;

  // 构造器
  constructor(type: StorageType) {
    this.type = type;
  }

  // 获取缓存的方法
  get<U extends keyof StorageProps>(key: U): StorageProps[U] {
    const result = window[this.type].getItem(key);
    try {
      // @ts-ignore
      return JSON.parse(result);
    } catch (error) {
      // @ts-ignore
      return result;
    }
  }

  // 设置缓存的方法
  set<T extends StorageProps, U extends keyof StorageProps>(
    key: U,
    value: T[U],
  ): void {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    window[this.type].setItem(key, val);
  }

  // 指定删除
  remove(key: keyof StorageProps): void {
    window[this.type].removeItem(key);
  }

  // 清除
  clear(key: keyof StorageProps): void {
    window[this.type].clear();
  }
}

// localStorage
const Local = new Storage('localStorage');

// sessionStorage
const Session = new Storage('sessionStorage');

export { Local, Session };
