const calcDueDate = require('../src/calcDueDate')

test('Calculate due date', () => {
    const submitTime = new Date("2022-04-12T09:00:00");
    const turnaroundHours = 16;
    const dueDate = new Date("2022-04-14T09:00:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('Calculate due date include weekends', () => {
    const submitTime = new Date("2022-04-15T09:00:00");
    const turnaroundHours = 10;
    const dueDate = new Date("2022-04-16T11:00:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('11 hours due date next day', () => {
    const submitTime = new Date("2022-04-11T09:00:00");
    const turnaroundHours = 11;
    const dueDate = new Date("2022-04-12T12:00:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('16 hours due date', () => {
    const submitTime = new Date("2022-04-12T14:12:00");
    const turnaroundHours = 16;
    const dueDate = new Date("2022-04-14T14:12:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('24 hours due date', () => {
    const submitTime = new Date("2022-04-11T09:45:00");
    const turnaroundHours = 24;
    const dueDate = new Date("2022-04-14T09:45:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('Same day 3 hours later due date', () => {
    const submitTime = new Date("2022-05-12T12:13:00");
    const turnaroundHours = 3;
    const dueDate = new Date("2022-05-12T15:13:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('0 hours due date', () => {
    const submitTime = new Date("2022-07-12T12:00:00");
    const turnaroundHours = 0;
    const dueDate = new Date("2022-07-12T12:00:00");
    expect(calcDueDate(submitTime, turnaroundHours)).toStrictEqual(dueDate)
});

test('Invalid submit time error weekday afternoon 1', () => {
    const submitTime = new Date("2022-04-12T17:01:00");
    const turnaroundHours = 16;
    expect(() => {
        calcDueDate(submitTime, turnaroundHours);
    }).toThrow()
});

test('Invalid submit time error weekday afternoon 2', () => {
    const submitTime = new Date("2023-04-11T19:00:00");
    const turnaroundHours = 16;
    expect(() => {
        calcDueDate(submitTime, turnaroundHours);
    }).toThrow()
});

test('Invalid submit time error weekday morning', () => {
    const submitTime = new Date("2022-04-14T08:59:00");
    const turnaroundHours = 24;
    expect(() => {
        calcDueDate(submitTime, turnaroundHours);
    }).toThrow()
});

test('Invalid submit time weekend 1', () => {
    const submitTime = new Date("2022-04-16T09:45:00");
    const turnaroundHours = 39;
    expect(() => {
        calcDueDate(submitTime, turnaroundHours);
    }).toThrow()
});

test('Invalid submit time weekend 2', () => {
    const submitTime = new Date("2022-04-17T14:12:00");
    const turnaroundHours = 10;
    expect(() => {
        calcDueDate(submitTime, turnaroundHours);
    }).toThrow()
});


