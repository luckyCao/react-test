class HashTable {
  constructor(capacity=10,loadFactor = 0.75) {
    this.capacity = capacity
    this.loadFactor = loadFactor
    this.count = 0
    this.threshold = Math.floor(this.capacity*this.loadFactor)
    this.table = new Array(capacity)
  }
  hashFunc(str){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var letter = str[i].charCodeAt(0)
      hash = hash + (letter << 5) - str[i].charCodeAt(0)
    }
    return hash%this.capacity
  }
  putObj(key, value) {
    const index = this.hashFunc(key)
    // 已经存在的情况下
    for (let entry = this.table[index];!!entry;entry = entry.next) {
      if (entry.key === key && entry.value === value) {
        const old = entry.value
        entry.value = value
        return old  // 把旧value返回
      }
    }
    let elem = this.table[index]
    this.table[index] = new Entry(index,key,value,elem)
    this.count++
    return null
  }
  getObj(key) {
    const index = this.hashFunc(key)
    for (let entry = this.table[index];!!entry;entry = entry.next) {
      if (entry.key === key) {
        return entry.value
      }
    }
    return null
  }
  remove(key) {
    const index = this.hashFunc(key)
    let value
    for (let cur = this.table[index],pre=null;!!cur;pre=cur,cur = cur.next) {
      if (cur.key === key) {
        value = cur.value
        if(!pre) {
          this.table[index] = cur.next
        } else {
          pre.next = cur.next
        }
        this.count--
      }
    }
    return value
  }
  rehash() {
    let oldCapacity = this.capacity
    this.capacity = oldCapacity*2 + 1
    this.threshold = Math.floor(this.capacity*this.loadFactor)
    let newTable = new Array(this.capacity)
    for (let i=oldCapacity;i>=0;i--) {
      for(let entry = this.table[i]; !!entry; ) {
        let old = entry
        entry = entry.next
        let index = this.hashFunc(old.key)
        old.next = newTable[index]
        newTable[index] = entry
      }
    }
    this.table = newTable
  }
}

class Entry {
  constructor(hash,key,value,next) {
    this.hash = hash
    this.key = key
    this.value = value
    this.next = next
  }
}