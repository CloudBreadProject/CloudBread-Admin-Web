import { CLIEngine } from 'eslint';

const cli = new CLIEngine({
  useEslintrc: true,
});

const formatter = cli.getFormatter();

async function lint() {
  const report = cli.executeOnFiles(['./src', './tools']);
  console.log(formatter(report.results));
  return report;
}

export default lint;
