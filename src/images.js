import fs from 'fs';
import path from 'path';

import ProfilePic from './models/profilePic';

const absPath = path.join(__dirname, 'images');

const startFunction = async () => {
  const imagePathArray = [];
  await ProfilePic.deleteMany({});
  fs.readdirSync(absPath).forEach((file) => {
    imagePathArray.push({ img: fs.readFileSync(`${absPath}\\${file}`) });
  });

  await ProfilePic.insertMany(imagePathArray);
};
export default startFunction;
