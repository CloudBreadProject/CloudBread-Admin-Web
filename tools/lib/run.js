import dateFormat from './dateFormat';

async function run(task, options) {
  const startTime = new Date();
  console.log(`[${dateFormat(startTime)}] ${task.name} start`);
  const result = await task(options);
  const endTime = new Date();
  console.log(`[${dateFormat(endTime)}] ${task.name} finished after ${endTime.getTime() - startTime.getTime()}ms`); // eslint-disable-line
  return result;
}

export default run;
