import { fromEvent, Subject } from 'rxjs';

let youtuberSubject$ = new Subject();

// 觀察者 A
const observerA = {
    next: id => {
        console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
    },
    error: err => { },
    complete: () => { }
};

// 觀察者 B
const observerB = {
    next: id => {
        console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
    },
    error: err => { },
    complete: () => { }
};

// 影片 1 上架，此時還沒有觀察者
youtuberSubject$.next(1);
// 輸出結果：
// (沒有任何輸出)

// 加入觀察者 A，也就是觀察者 A 開啟通知了
let observerASubscription = youtuberSubject$.subscribe(observerA);
// 影片 2 上架，此時觀察者 A 會收到通知
// youtuberSubject.notifyObservers(2);
youtuberSubject$.next(2);
// 輸出結果：
// 我是觀察者 A，我收到影片 2 上架通知了

// 加入觀察者 B，也就是觀察者 B 開啟通知了
let observerBSubscription = youtuberSubject$.subscribe(observerB);
// 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
youtuberSubject$.next(3);
// 輸出結果：
// 我是觀察者 A，我收到影片 3 上架通知了
// 我是觀察者 B，我收到影片 3 上架通知了

// 移除觀察者 B，也就是觀察者 B 關閉通知了
observerBSubscription.unsubscribe();
// 影片 4 上架，此時只剩下觀察者 A 會收到通知
youtuberSubject$.next(4);
// 輸出結果：
// 我是觀察者 A，我收到影片 4 上架通知了

observerBSubscription = youtuberSubject$.subscribe(observerB);
youtuberSubject$.next(5);
