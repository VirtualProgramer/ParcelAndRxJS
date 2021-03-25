import { Observable, Subject } from 'rxjs';

const source$ = new Subject();

source$.subscribe(data => console.log(`Subject 第一次訂閱: ${data}`));

source$.next(1);
source$.next(2);

source$.subscribe(data => console.log(`Subject 第二次訂閱: ${data}`));

source$.next(3);
source$.next(4);

source$.subscribe(data => console.log(`Subject 第三次訂閱: ${data}`));

source$.complete();