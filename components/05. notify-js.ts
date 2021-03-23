
// 觀察者 A
const observerA = {
    notify: id => {
        console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
    }
};

// 觀察者 B
const observerB = {
    notify: id => {
        console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
    }
};

const youtuberSubject = {
    // 存放所有的觀察者，也就是開啟通知的使用者
    observers: [],
    // 通知所有觀察者新影片上架了
    notifyObservers: id => {
        // 列舉出每個觀察者，並進行通知動作
        youtuberSubject.observers.forEach(observer => {
            observer.notify(id);
        });
    },
    // 加入新的觀察者，也就是有新使用者開啟通知了
    addObserver: observer => {
        youtuberSubject.observers.push(observer);
    },
    // 將某個觀察者移除，也就是某個使用者關閉通知了
    deleteObserver: observer => {
        youtuberSubject.observers = youtuberSubject.observers.filter(
            obs => obs !== observer
        );
    }
};

// 影片 1 上架，此時還沒有觀察者
youtuberSubject.notifyObservers(1);
// 輸出結果：
// (沒有任何輸出)

// 加入觀察者 A，也就是觀察者 A 開啟通知了
youtuberSubject.addObserver(observerA);
// 影片 2 上架，此時觀察者 A 會收到通知
youtuberSubject.notifyObservers(2);
// 輸出結果：
// 我是觀察者 A，我收到影片 2 上架通知了

// 加入觀察者 B，也就是觀察者 B 開啟通知了
youtuberSubject.addObserver(observerB);
// 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
youtuberSubject.notifyObservers(3);
// 輸出結果：
// 我是觀察者 A，我收到影片 3 上架通知了
// 我是觀察者 B，我收到影片 3 上架通知了

// 移除觀察者 B，也就是觀察者 B 關閉通知了
youtuberSubject.deleteObserver(observerB);
// 影片 4 上架，此時只剩下觀察者 A 會收到通知
youtuberSubject.notifyObservers(4);
// 輸出結果：
// 我是觀察者 A，我收到影片 4 上架通知了