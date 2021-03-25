import { Observable } from 'rxjs';

console.log("已建立 Observable 資料流");
const subscriber = (subscriber) => {
    console.log('stream 開始');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    console.log('stream 結束');
    subscriber.complete();
};
let observable$ = new Observable(subscriber);

observable$.subscribe({
    next: data => console.log(`Observable 第一次訂閱: ${data}`),
    complete: () => console.log('第一次訂閱完成')
})
observable$.subscribe({
    next: data => console.log(`Observable 第二次訂閱: ${data}`),
    complete: () => console.log('第二次訂閱完成')
});

observable$ = new Observable(subscriber => {
    console.log('stream 開始');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
        console.log('stream 結束');
    });
});
observable$.subscribe({
    next: data => console.log(`Observable 第三次訂閱: ${data}`),
    complete: () => console.log('第三次訂閱完成')
});
console.log("------非同步-------");