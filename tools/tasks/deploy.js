import GitRepo from 'git-repository';
import run from '../lib/run';
import fetch from '../lib/fetch';
import build from './build';

/**
 * Deploy the contents of the '/build' folder to a remote
 * server via Git. Example: 'npm run deploy -- production'
 */
async function deploy() {
  // By default deploy to the staging deployment slot
  const remote = {
    name: 'heroku',
    url: 'https://beingbook@hbh-cloudbread-inspector.scm.azurewebsites.net:443/hbh-cloudbread-inspector.git',
    website: 'https://hbh-cloudbread-inspector.azurewebsites.net',
  };

  // Initialize a new Git repository inside the '/build' folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, 'master'))) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/master`, { hard: true });
    await repo.clean({ force: true });
  }
  await run(build);

  // Push the contents of the build folder to the remote server via Git
  await repo.add('--all .');
  await repo.commit('Build');
  await repo.push(remote.name, 'master');

  // Check if the site was successfully deployed
  const response = await fetch(remote.website);
  console.log(`${remote.website} -> ${response.statusCode}`);
}

export default deploy;
