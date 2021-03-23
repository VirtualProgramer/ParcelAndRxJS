import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe((position: any) => {
    console.log(`x: ${position.x}, y: ${position.y}`);
});
