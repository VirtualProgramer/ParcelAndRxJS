import { fromEvent, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// 發出 (1,2,3,4,5)
from([1, 2, 3, 4, 5]).pipe(
    // 過濾奇數
    filter(num => num % 2 === 0)
).subscribe(
    // 输出: "Even number: 2", "Even number: 4"
    val => console.log(`Even number: ${val}`)
);

// 發出 (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// 過濾奇數
const example = source.pipe(filter(num => num % 2 === 0));
// 输出: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));