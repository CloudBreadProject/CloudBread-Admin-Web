import dateFormat from './dateFormat';

async function run(task) {
  const startTime = new Date();
  console.log(`[${dateFormat(startTime)}] ${task.name} start`);
  const result = await task();
  const endTime = new Date();
  console.log(`[${dateFormat(endTime)}] ${task.name} finished after ${endTime.getTime() - startTime.getTime()}ms`);
  return result;
}

export default run;
