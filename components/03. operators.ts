import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

fromEvent(document, 'click').pipe(
    filter((_, index) => index % 2 === 0), // 使用 filter operator
    map((x: Event) => x as MouseEvent) // 使用 map opera
).subscribe(position => {
    console.log(`x: ${position.x}, y: ${position.y}`);
    console.log(position);
});
