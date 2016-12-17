const expect = require('expect');
const path = require('path');
const flister = require('../src/index');

const FOLDERS_PATH = `${__dirname}/testFolders`;

describe('Folder lister tests', function() {

  it('should match the files and folders', function() {
    const pathName = path.resolve(`${FOLDERS_PATH}/foo`);
    const expected = {
      filenames: [
        `${pathName}/f1.txt`,
        `${pathName}/f2.txt`,
        `${pathName}/bar/bar1.txt`,
        `${pathName}/bar/bar2.txt`,
      ],
      dirnames: [
        `${pathName}`,
        `${pathName}/bar`,
        `${pathName}/baz`,
      ]
    };

    return flister(pathName)
      .then((result) => {
        expect(result).toEqual(expected);
      })
      .catch((err) => {
        expect(err).toNotExist();
      });
  });

  it('should not match the files and folders', function() {
    const pathName = path.resolve(`${FOLDERS_PATH}/foo`);
    const expected = {
      filenames: [
        `${pathName}/f1.txt`,
        `${pathName}/f2.txt`,
        `${pathName}/bar/bar1.txt`,
        `${pathName}/bar/bar2.txt`,
      ],
      dirnames: [
        // Missing Folder
        `${pathName}/bar`,
        `${pathName}/baz`,
      ]
    };

    return flister(pathName)
      .then((result) => {
        expect(result).toNotEqual(expected);
      })
      .catch((err) => {
          expect(err).toNotExist();
      });
  });

  it('should trigger an error when the folder doesn\'t exist', function() {
    return flister('/UnexistingPath')
      .then((result) => {
        // We expect no result
        expect(true).toEqual(false);
      })
      .catch((err) => {
        expect(err).toExist();
      });
  });
});