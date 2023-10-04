// import * as fse from 'fs-extra';
// import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';


const main = async () => {
  if (process.argv.length <= 2) {
    throw new Error(
      'Please pass the one of the following values gateway,core,plugin !!!'
    );
  }

  const artifactDir = path.resolve(__dirname, '..', 'artifact');

  fs.rmSync(artifactDir, { recursive: true, force: true });
  fs.mkdirSync(artifactDir);
  fs.mkdirSync(`${artifactDir}/packages`);

  const type = process.argv[2];
  let folderName = type;

  if (type === 'plugin') {
    if (process.argv.length <= 3) {
      throw new Error('Please pass plugin name !!!');
    }

    folderName = `plugin-${process.argv[3]}-api`;
  }

  fs.cpSync('../packages/api-utils', `${artifactDir}/packages/api-utils`, { recursive: true });
  fs.cpSync('../packages/tsconfig.api.jsonc', `${artifactDir}/packages/tsconfig.api.jsonc`);
  fs.cpSync(`../packages/${folderName}`, `${artifactDir}/packages/${folderName}`, { recursive: true });
  fs.cpSync('../yarn.lock', `${artifactDir}/yarn.lock`);
  fs.writeFileSync(`${artifactDir}/package.json`, JSON.stringify({
    name: `@erxes/${folderName}`,
    private: true,
    workspaces: [
      "packages/*"
    ],
  }))


  process.chdir(artifactDir);

  execSync(`yarn install`);
  execSync(`yarn workspaces run build`);

  // replace src dir with build result
  execSync('rm -rf ./packages/api-utils/src');
  execSync(`mv ./packages/api-utils/dist ./packages/api-utils/src`);
  execSync(`rm -rf ./packages/${folderName}/src`);
  execSync(`mv ./packages/${folderName}/dist ./packages/${folderName}/src`);

  execSync(`rm -rf node_modules ./packages/api-utils/node_modules ./packages/${folderName}/node_modules`);

  execSync('yarn install --production');
};

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
