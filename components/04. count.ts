import { fromEvent, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

document.getElementById('counterTemplate').innerHTML = `
    <button id="startBtn">開始新的計數器</button>
    <button id="countBtn">計數</button>
    <button id="errorBtn">發生錯誤</button>
    <button id="finishBtn">完成計數</button>

    <p>目前狀趟：<span id="statusTxt"></span></p>
    <p>目前計數：<span id="countTxt"></span></p>
    <p>偶數計數：<span id="evenCountTxt"></span></p>
`;

const startBtn = document.getElementById('startBtn');
const countBtn = document.getElementById('countBtn');
const errorBtn = document.getElementById('errorBtn');
const finishBtn = document.getElementById('finishBtn');

const statusTxt = document.getElementById('statusTxt');
const countTxt = document.getElementById('countTxt');
const evenCountTxt = document.getElementById('evenCountTxt');

let count = 0;
let counter$: Subject<number>;

fromEvent(startBtn, 'click').subscribe(x => {

    count = 0;
    counter$ = new Subject();
    const evenCounter$ = counter$.pipe(
        filter(x => x % 2 === 0)
    );

    counter$.subscribe({
        next: data => {
            statusTxt.innerText = '開始計數';
            countTxt.innerText = data.toString();
        }, error: err => {
            statusTxt.innerText = `錯誤，${err}`;
        }, complete: () => {
            statusTxt.innerText = '完成';
        }
    });

    evenCounter$.subscribe(x => {
        evenCountTxt.innerText = x.toString();
    });

    counter$.next(count);
});

fromEvent(finishBtn, 'click').subscribe(x => {
    counter$.complete();
});

fromEvent(countBtn, 'click').subscribe(x => {
    counter$.next(++count);
});

fromEvent(errorBtn, 'click').subscribe(() => {
    const reason = prompt('請輸入錯誤訊息');
    counter$.error(reason || 'error');
});