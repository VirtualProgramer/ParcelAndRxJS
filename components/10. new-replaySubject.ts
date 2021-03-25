import { BehaviorSubject, Observable, Subject } from 'rxjs';

const source$ = new BehaviorSubject(0);

source$.subscribe(data => console.log(`BehaviorSubject 第一次訂閱: ${data}`));
// BehaviorSubject 第一次訂閱: 0

source$.next(1);
source$.next(2);

source$.subscribe(data => console.log(`BehaviorSubject 第二次訂閱: ${data}`));

source$.next(3);
source$.next(4);

console.log(`目前 BehaviorSubject 的內容為: ${source$.value}`);