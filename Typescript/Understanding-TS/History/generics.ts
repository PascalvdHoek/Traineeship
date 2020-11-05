/** Generics */

const names: Array<string> = []; // === string[]
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('this is done');
    }, 2000);
});

//object is too unspecific for TS to see what the result type might be
function merge1(objA: object, objB: object) {
    return Object.assign(objA, objB);
}
//doesnt give options or doesnt accept properties because its unknown for TS
const mergedObj1 = merge1({ name: 'Max' }, { age: 30 });
// mergedObj1.age  --> throws error

// more specific types, to see that specific T and U are intersected  T & U is the result
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

//This is acceptable because TS knowns the specific types
const mergedObj = merge({ name: 'Max' }, { age: 30 });
mergedObj.age;

interface Lenghty {
    length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 0) {
        descriptionText = 'Got 1 element';
    } else if (element.length > 0) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}

function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

// to prevent object will be stored, because it will conflict with the removeItem method
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Max');

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);

// Partial Type

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// function createCourseGoal(title: string, description: string, date: Date) : CourseGoal{
//     return { title: title, description: description, completeUntil: date}
// }

function createCourseGoal(
    title: string,
    description: string,
    date: Date
): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}
