/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
 
import GitRepo from 'git-repository';
import run from '../lib/run';
import fetch from '../lib/fetch';
import build from './build';

// TODO: Update deployment URL
// For more information visit http://gitolite.com/deploy.html
const getRemote = (slot) => ({
  name: 'heroku',
  url: `https://git.heroku.com/react-isomorphic.git`,
  website: `http://react-isomorphic.herokuapp.com`,
});

/**
 * Deploy the contents of the `/build` folder to a remote
 * server via Git. Example: `npm run deploy -- production`
 */
async function deploy() {

  // By default deploy to the staging deployment slot
  const remote = getRemote(process.argv.includes('--production') ? null : 'staging');

  // Initialize a new Git repository inside the `/build` folder
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
