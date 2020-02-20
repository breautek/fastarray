
import FastArray from '../src/fastarray';

describe('FastArray', () => {
    let fastArray: FastArray<string> = null;

    beforeEach(() => {
        fastArray = new FastArray<string>();
        fastArray.push('one');
        fastArray.push('two');
        fastArray.push('three');
    });

    it('constructs', () => {
        let a: any = new FastArray();
        expect(a._pushIndex).toBe(0);
        expect(a._data.length).toBe(1000);
    });

    it('constructs with initial size', () => {
        let a: any = new FastArray(500);
        expect(a._pushIndex).toBe(0);
        expect(a._data.length).toBe(500);
    });

    it('can push data', () => {
        fastArray.push('four');
        expect(fastArray.getAt(fastArray.length - 1)).toBe('four');
    });

    it('can set data', () => {
        fastArray.setAt(0, 'ONE');
        expect(fastArray.getAt(0)).toBe('ONE');
    });

    it('can get data', () => {
        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(100)).toBeUndefined();
    });

    it('expects length property to reflect how many items in array', () => {
        expect(fastArray.length).toBe(3);
        fastArray.push('four');
        expect(fastArray.length).toBe(4);
        fastArray.pop();
        expect(fastArray.length).toBe(3);
        fastArray.shift();
        expect(fastArray.length).toBe(2);
    });

    it('can shift', () => {
        expect(fastArray.getAt(0)).toBe('one');
        let str: string = fastArray.shift();
        expect(str).toBe('one');
        expect(fastArray.length).toBe(2);
        expect(fastArray.getAt(0)).toBe('two');

        fastArray.push('four');
    });

    it('can unshift', () => {
        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.length).toBe(3);

        let result: number = fastArray.unshift('zero');
        expect(result).toBe(4);
    });

    it('can pop', () => {
        expect(fastArray.getAt(fastArray.length - 1)).toBe('three');
        expect(fastArray.length).toBe(3);

        let result: string = fastArray.pop();
        
        expect(result).toBe('three');
        expect(fastArray.length).toBe(2);
    });

    it('can toArray', () => {
        let result: Array<string> = fastArray.toArray();
        expect(result instanceof Array).toBe(true);
        expect(result[0]).toBe('one');
        expect(result[1]).toBe('two');
        expect(result[2]).toBe('three');
    });

    it('can indexOf', () => {
        fastArray.push('one');
        fastArray.push('two');
        fastArray.push('three');

        expect(fastArray.indexOf('one')).toBe(0);
        expect(fastArray.indexOf('two')).toBe(1);
        expect(fastArray.indexOf('three')).toBe(2);
    });

    it('can indexOf', () => {
        fastArray.push('one');
        fastArray.push('two');
        fastArray.push('three');

        expect(fastArray.lastIndexOf('one')).toBe(3);
        expect(fastArray.lastIndexOf('two')).toBe(4);
        expect(fastArray.lastIndexOf('three')).toBe(5);
    });

    it('can forEach', () => {
        let forFn: jasmine.Spy = jasmine.createSpy();
        fastArray.forEach(forFn);
        expect(forFn).toHaveBeenCalledTimes(3);
        expect(forFn.calls.all()[0].args).toEqual([ 'one', 0 ]);
        expect(forFn.calls.all()[1].args).toEqual([ 'two', 1 ]);
        expect(forFn.calls.all()[2].args).toEqual([ 'three', 2 ]);
    });

    it('can splice (no items)', () => {
        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('two');
        expect(fastArray.getAt(2)).toBe('three');

        fastArray.splice(1, 1);

        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('three');
        expect(fastArray.getAt(2)).toBeUndefined();
    });

    it('can splice (add 1 item)', () => {
        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('two');
        expect(fastArray.getAt(2)).toBe('three');

        fastArray.splice(1, 1, 'four');

        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('four');
        expect(fastArray.getAt(2)).toBe('three');
    });

    it('can splice (add 2 item)', () => {
        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('two');
        expect(fastArray.getAt(2)).toBe('three');

        fastArray.splice(1, 1, 'four', 'five');

        expect(fastArray.getAt(0)).toBe('one');
        expect(fastArray.getAt(1)).toBe('four');
        expect(fastArray.getAt(2)).toBe('five');
        expect(fastArray.getAt(3)).toBe('three');
    });

    it('can create array from (Array)', () => {
        let arr = [
            1,
            2,
            3
        ];
        let fast: FastArray<number> = FastArray.from(arr);
        expect(fast.getAt(0)).toBe(1);
        expect(fast.getAt(1)).toBe(2);
        expect(fast.getAt(2)).toBe(3);
    });

    it('can create array from (FastArray)', () => {
        let fast: FastArray<string> = FastArray.from(fastArray);
        expect(fast.getAt(0)).toBe('one');
        expect(fast.getAt(1)).toBe('two');
        expect(fast.getAt(2)).toBe('three');
    });

    it('can create array from (string)', () => {
        let fast: FastArray<string> = FastArray.from('abc');
        expect(fast.getAt(0)).toBe('a');
        expect(fast.getAt(1)).toBe('b');
        expect(fast.getAt(2)).toBe('c');
    });

    it('can determine if fast array', () => {
        expect(FastArray.isFastArray(fastArray)).toBe(true);
        expect(FastArray.isFastArray('abc')).toBe(false);
        expect(FastArray.isFastArray([
            1,
            2,
            3
        ])).toBe(false);
        expect(FastArray.isFastArray(false)).toBe(false);
        expect(FastArray.isFastArray(true)).toBe(false);
        expect(FastArray.isFastArray(undefined)).toBe(false);
        expect(FastArray.isFastArray(null)).toBe(false);
        expect(FastArray.isFastArray(NaN)).toBe(false);
        expect(FastArray.isFastArray(Infinity)).toBe(false);
    });

    it('can create FastArray of', () => {
        let fast: FastArray<number> = FastArray.of(1, 2, 3);
        expect(fast.getAt(0)).toBe(1);
        expect(fast.getAt(1)).toBe(2);
        expect(fast.getAt(2)).toBe(3);
    });

    it('can concat (with array)', () => {
        let arr: Array<string> = [
            '1',
            '2',
            '3'
        ];
        let newFast: FastArray<string> = fastArray.concat(arr);

        expect(newFast).not.toBe(fastArray);
        expect(arr.length + fastArray.length).toBe(newFast.length);
        expect(newFast.getAt(0)).toBe('one');
        expect(newFast.getAt(1)).toBe('two');
        expect(newFast.getAt(2)).toBe('three');
        expect(newFast.getAt(3)).toBe('1');
        expect(newFast.getAt(4)).toBe('2');
        expect(newFast.getAt(5)).toBe('3');
    });

    it('can concat (with fastarray)', () => {
        let arr: FastArray<string> = FastArray.from([
            '1',
            '2',
            '3'
        ]);
        let newFast: FastArray<string> = fastArray.concat(arr);

        expect(newFast).not.toBe(fastArray);
        expect(arr.length + fastArray.length).toBe(newFast.length);
        expect(newFast.getAt(0)).toBe('one');
        expect(newFast.getAt(1)).toBe('two');
        expect(newFast.getAt(2)).toBe('three');
        expect(newFast.getAt(3)).toBe('1');
        expect(newFast.getAt(4)).toBe('2');
        expect(newFast.getAt(5)).toBe('3');
    });

    // This might be better using a real benchmark library
    // it('performs much faster (insert) than normal arrays', () => {
    //     const size: number = 100000;
    //     const sampleSize: number = 1000;

    //     var avgFastSpeed: number = 0;
    //     var avgNormalSpeed: number = 0;

    //     for (var j: number = 0; j < sampleSize; j++) {
    //         const normalArrayStartTime: number = new Date().getTime();
    //         var normalArray: Array<any> = [];
    //         for (var i: number = 0; i < size; i++) {
    //             normalArray.push({});
    //         }
    //         const normalArrayEndTime: number = new Date().getTime();
    //         avgNormalSpeed += normalArrayEndTime - normalArrayStartTime;
    //     }

    //     for (var j: number = 0; j < sampleSize; j++) {
    //         const fastArrayStartTime: number = new Date().getTime();
    //         var fa: FastArray<any> = new FastArray<any>(size);
    //         for (var i: number = 0; i < size; i++) {
    //             fa.push({});
    //         }
    //         const fastArrayEndTime: number = new Date().getTime();
    //         avgFastSpeed += fastArrayEndTime - fastArrayStartTime; 
    //     }

    //     avgFastSpeed /= sampleSize;
    //     avgNormalSpeed /= sampleSize;

    //     // tslint:disable: no-console
    //     console.log();
    //     console.log('Normal Time', avgNormalSpeed, 'ms');
    //     console.log('Fast Time', avgFastSpeed, 'ms');
    //     console.log();

    //     expect(avgFastSpeed).toBeLessThan(avgNormalSpeed);
    // });
});
