import { EMPTY, of, range, iif, Observable, from, fromEvent, fromEventPattern, interval, timer, defer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

//----- 1. EMPTY：空的 Observable，沒有任何事件，就直接結束了

EMPTY.subscribe(data => data => console.log(`empty 範例: ${data}`));
// (不會印出任何東西)

EMPTY.subscribe({
    next: data => console.log(`empty 範例: ${data}`),
    complete: () => console.log('empty 結束')
});
// empty 結束


//----- 2. of：將傳進去的值當作一條 Observable，當值都發送完後結束

of(1).subscribe(data => console.log(`of 範例: ${data}`));
// of 範例: 1

of(1, 2, 3, 4).subscribe(data => console.log(`of 範例: ${data}`));
// of 範例: 1
// of 範例: 2
// of 範例: 3
// of 範例: 4


//----- 3. range：依照一個範圍內的數列資料建立 Observable，包含兩個參數

range(3, 4).subscribe(data => console.log(`range 範例: ${data}`));
// range 範例: 3
// range 範例: 4
// range 範例: 5
// range 範例: 6


//----- 4. iif：透過條件來決定產生怎麼樣的 Observable，有三個參數

const emitHelloIfEven = (data) => {
    return iif(() => data % 2 === 0, of('Hello'), EMPTY);
};

emitHelloIfEven(1).subscribe(data => console.log(`iif 範例 (1): ${data}`));
// (不會印出任何東西)
emitHelloIfEven(2).subscribe(data => console.log(`iif 範例 (2): ${data}`));
// iif 範例 (2): Hello


//----- 5. throwError：透過條件來決定產生怎麼樣的 Observable，有三個參數

import { throwError } from 'rxjs';

const source$ = throwError('發生錯誤了');
source$.subscribe({
    next: (data) => console.log(`throwError 範例 (next): ${data}`),
    error: (error) => console.log(`throwError 範例 (error): ${error}`),
    complete: () => console.log('throwError 範例 (complete)'),
});
// throwError 範例 (error): 發生錯誤了


//----- 6. ajax：用來發送 HTTP 請求抓 API 資料的，會回傳 ajaxResponse 格式

const source2$ = ajax('https://api.github.com/repos/reactivex/rxjs/issues');
source2$.subscribe(result => console.log(result.response));

// 把 fetch API 包裝成 Observable 的範例程式
const source3$ = new Observable(subscriber => {
    fetch('https://api.github.com/repos/reactivex/rxjs/issues')
        .then(response => response.json())
        .then(responseBody => {
            subscriber.next(responseBody);
            subscriber.complete();
        });
});

source3$.subscribe(data => console.log(data));


//----- 7. from：可以接受的參數類型包含陣列、可疊代的物件 (iterable)、Promise 和「其他 Observable 實作」 等，
//               會根據傳遞進來的參數決定要如何建立一個新的 Observable

from([1, 2, 3, 4]).subscribe(data => {
    console.log(`from 示範 (1): ${data}`);
});
// from 示範 (1): 1
// from 示範 (1): 2
// from 示範 (1): 3
// from 示範 (1): 4

// 使用 generator 建立 iterable
function* createRange(start, end) {
    for (let i = start; i <= end; ++i) {
        yield i;
    }
}

from(createRange(1, 4)).subscribe(data => {
    console.log(`from 示範 (2): ${data}`);
});
// from 示範 (2): 1
// from 示範 (2): 2
// from 示範 (2): 3
// from 示範 (2): 4

// 傳入 Promise 當參數
from(Promise.resolve(1)).subscribe(data => {
    console.log(`from 示範 (3): ${data}`);
});
// from 示範 (3): 1

// 傳遞 Observable 當參數
from(of(1, 2, 3, 4)).subscribe(data => {
    console.log(`from 示範 (4): ${data}`)
});
// from 示範 (4): 1
// from 示範 (4): 2
// from 示範 (4): 3
// from 示範 (4): 4


//----- 8. fromEvent：將瀏覽器事件包裝成 Observable，參數有兩個：
//         A. target：實際上要監聽事件的 DOM 元素
//         B. eventName：事件名稱

fromEvent(document, 'click').subscribe(data => {
    console.log('fromEvent 示範: 滑鼠事件觸發了');
});


//----- 9. fromEventPattern：可以根據自訂的邏輯決定事件發生，只要我們將邏輯寫好就好，需要傳入兩個參數：
//         A. addHandler：當 subscribe 時，呼叫此方法決定如何處理事件邏輯
//         B. removeHandler：當 unsubscribe 時，呼叫次方法將原來的事件邏輯取消

const addClickHandler = (handler) => {
    console.log('fromEventPattern 示範: 自定義註冊滑鼠事件')
    document.addEventListener('click', event => handler(event));
}

const removeClickHandler = (handler) => {
    console.log('fromEventPattern 示範: 自定義取消滑鼠事件')
    document.removeEventListener('click', handler);
};

const source4$ = fromEventPattern(
    addClickHandler,
    removeClickHandler
);

const subscription = source4$
    .subscribe(event => console.log('fromEventPattern 示範: 滑鼠事件發生了', event));

setTimeout(() => {
    subscription.unsubscribe();
}, 3000);


//----- 10. interval：依照參數設定的時間 (毫秒) 來建議 Observable，當被訂閱時，就會每隔一段指定的時間發生一次資料流

interval(1000).subscribe(data => console.log(`interval 示範: ${data}`));

// 可以在一段時間後把它取消訂閱來結束 Observable：

const subscription2 = interval(1000)
    .subscribe(data => console.log(`interval 示範: ${data}`));

setTimeout(() => {
    subscription2.unsubscribe();
}, 5500);


//----- 11. timer：跟 interval 有點類似，但它多一個參數，用來設定經過多久時間後開始依照指定的間隔時間計時

timer(3000, 1000).subscribe(data => console.log(`timer 示範 (1): ${data}`));
// timer 示範 (1): 0
// timer 示範 (1): 1
// timer 示範 (1): 2
// timer 示範 (1): 3

// timer 如果沒有設定第二個參數，代表在指定的時間發生第一次事件後，就不會再發生任何事件了
timer(3000).subscribe(data => {
    console.log(`timer 示範 (2): ${data}`);
});
// timer 示範 (2): 0


//----- 12. defer：將建立 Observable 的邏輯包裝起來，提供更一致的使用感覺

const factory = () => of(1, 2, 3);
const source5$ = defer(factory);
source5$.subscribe(data => console.log(`defer 示範: ${data}`));