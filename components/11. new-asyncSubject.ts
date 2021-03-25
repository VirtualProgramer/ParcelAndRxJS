import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';

const source$ = new AsyncSubject();

source$.subscribe(data => console.log(`AsyncSubject 第一次訂閱: ${data}`));

source$.next(1);
source$.next(2);

source$.subscribe(data => console.log(`AsyncSubject 第二次訂閱: ${data}`));

source$.next(3);
source$.next(4);

source$.subscribe(data => console.log(`AsyncSubject 第三次訂閱: ${data}`));

source$.complete();