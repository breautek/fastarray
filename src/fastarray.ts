
const DEFAULT_INITIAL_SIZE: number = 1000;

export class FastArray<T> {
    private _data: Array<T>;
    private _pushIndex: number;

    public constructor(initialSize: number = DEFAULT_INITIAL_SIZE) {
        this._data = new Array<T>(initialSize);
        this._pushIndex = 0;
    }

    public get length(): number {
        return this._pushIndex;
    }

    private ___setData(array: Array<T>, pushIndex: number): void {
        this._data = array;
        this._pushIndex = pushIndex;
    }

    public setAt(index: number, item: T): void {
        this._data[index] = item;
        if (index >= this._pushIndex) {
            this._pushIndex = index + 1;
        }
    }

    public getAt(index: number): T {
        return this._data[index];
    }

    public unshift(item: T): number {
        this._data.unshift(item);
        this._pushIndex++;
        return this.length;
    }

    public push(item: T): void {
        this._data[this._pushIndex] = item;
        this._pushIndex++;
    }

    public shift(): T {
        var item: T = this._data.shift();
        this._pushIndex--;
        return item;
    }

    public pop(): T {
        // We can't use the Array.pop api here because the array could be much larger than the current working array
        var item: T = this._data[this._pushIndex - 1];
        this._data[this._pushIndex - 1] = undefined;
        this._pushIndex--;
        return item;
    }

    public toArray(): Array<T> {
        return this._data.slice(0, this._pushIndex);
    }

    public indexOf(item: T): number {
        return this._data.indexOf(item);
    }

    public lastIndexOf(item: T): number {
        return this._data.lastIndexOf(item);
    }

    public forEach(fn: (item: T, index: number) => void): void {
        for (var i: number = 0; i < this._pushIndex; i++) {
            fn(this._data[i], i);
        }
    }

    public splice(pos: number, n: number, ...items: Array<any>): Array<T> {
        var args: Array<any> = [pos, n].concat(items);
        var data: Array<T> = this._data.splice.apply(this._data, args);
        this._pushIndex -= data.length;
        return data;
    }

    public slice(start?: number, end?: number): FastArray<T> {
        if (!start) {
            start = 0;
        }
        if (!end) {
            end = this._pushIndex;
        }

        var data = this._data.slice(start, end);
        var array = new FastArray<T>(data.length);
        array.___setData(data, this._pushIndex);
        return array;
    }

    public concat(array: FastArray<T> | Array<T>): FastArray<T> {
        var fast: Array<T> = null;
        if (array instanceof FastArray) {
            fast = array.toArray();
        }
        else {
            fast = array;
        }

        var newArray: Array<T> = this.toArray().concat(fast);
        var initSize: number = newArray.length > DEFAULT_INITIAL_SIZE ? newArray.length : DEFAULT_INITIAL_SIZE;
        var newFast: FastArray<T> = new FastArray<T>(initSize);
        newFast.___setData(newArray, newArray.length);
        return newFast;
    }

    public static from(array: FastArray<any> | Array<any> | string): FastArray<any> {
        if (array instanceof Array) {
            var fastArray: FastArray<any> = new FastArray<any>();
            fastArray.___setData(array.slice(), array.length);
            return fastArray;
        }
        else if (typeof array === 'string') {
            return FastArray.from(array.split(''));
        }
        else {
            return array.slice();
        }
    }

    public static isFastArray(item: any): boolean {
        return item instanceof FastArray;
    }

    public static of(...item: any): FastArray<any> {
        var arr: Array<any> = Array.of.apply(null, item);
        return FastArray.from(arr);
    }

    // public reverse(): FastArray<T> {
        // var data: Array<T> = this._data.slice(0, this._pushIndex);
        // data = data.reverse();
        // var spliceArgs: any = [0, this._pushIndex].concat(data);
        // return this;
    // }
}

export default FastArray;
