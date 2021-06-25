import { concat, from, of } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

// 發出 (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// 過濾奇數
const example = source.pipe(
    filter(num => num % 2 === 0)
);
// 输出: "Even number: 2", "Even number: 4"
// const subscribe = example.subscribe(val =>
//     console.log(`Even number: ${val}`)
// );

concat(
    example
).pipe(
    switchMap((x) => of(x))
).subscribe(val =>
    console.log(`Even number: ${val}`)
);

// from(['', '', '', '', '', '']).pipe(
//     first(x => x !== ''),
//     throwError(() => new Error(`Invalid time ${ms}`));
// ).subscribe(x =>
//     console.log(x)
// );

// const errorWithTimestamp$ = throwError(() => {
//     const error: any = new Error(`This is error number ${++errorCount}`);
//     error.timestamp = Date.now();
//     return error;
//  });