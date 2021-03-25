import { from } from "rxjs";
import { map, pairwise, scan } from "rxjs/operators";

const priceHistories = [100, 98, 96, 102, 99, 105, 105];

from(priceHistories).pipe(
    pairwise(),
    map(([yesterdayPrice, todayPrice], index) => {
        let status: string;
        if (yesterdayPrice > todayPrice) {
            status = '下跌';
        } else if (yesterdayPrice < todayPrice) {
            status = '上漲';
        } else {
            status = '持平';
        }
        return {
            day: index + 2,
            yesterdayPrice: yesterdayPrice,
            todayPrice: todayPrice,
            status: status
        }
    }),
    scan((acc, value) =>
    ({
        ...value,
        under100: value.todayPrice < 100 ? ++acc.under100 : acc.under100
    }),
        { under100: 0 }
    )
).subscribe((data: any) => {
    console.log(`第 ${data.day} 天`);
    console.log(`本日股價: ${data.todayPrice}`);
    console.log(`本日股價 ${data.status}`);
    console.log(`歷史股價小於 100 的有 ${data.under100} 天`);
})