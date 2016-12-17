const expect = require('expect');
const path = require('path');
const fs = require('fs');
const flister = require('../src/index');

describe('Folder lister tests', function() {
  const fooPath = path.resolve(`${__dirname}/testFolders/foo`);

  before(function() {
    const bazDir = `${fooPath}/baz`;

    // Create empty 'baz' test folder (git doesn't allow empty folders)
    if (!fs.existsSync(bazDir)){
      fs.mkdirSync(bazDir);
    }
  });

  it('should match the files and folders', function() {
    const expected = {
      filenames: [
        `${fooPath}/f1.txt`,
        `${fooPath}/f2.txt`,
        `${fooPath}/bar/bar1.txt`,
        `${fooPath}/bar/bar2.txt`,
      ],
      dirnames: [
        `${fooPath}`,
        `${fooPath}/bar`,
        `${fooPath}/baz`,
      ]
    };

    // Sort for easier comparisson
    expected.filenames = expected.filenames.sort();
    expected.dirnames = expected.dirnames.sort();

    return flister(fooPath)
      .then((result) => {
        // Sort to allow matching
        result.filenames = result.filenames.sort();
        result.dirnames = result.dirnames.sort();

        expect(result).toEqual(expected);
      })
      .catch((err) => {
        expect(err).toNotExist();
      });
  });

  it('should not match the files and folders', function() {
    const expected = {
      filenames: [
        `${fooPath}/f1.txt`,
        `${fooPath}/f2.txt`,
        `${fooPath}/bar/bar1.txt`,
        `${fooPath}/bar/bar2.txt`,
      ],
      dirnames: [
        // !---- Missing Folder  ----!
        `${fooPath}/bar`,
        `${fooPath}/baz`,
      ]
    };

    // Sort for easier comparisson
    expected.filenames = expected.filenames.sort();
    expected.dirnames = expected.dirnames.sort();

    return flister(fooPath)
      .then((result) => {
        // Sort to allow matching
        result.filenames = result.filenames.sort();
        result.dirnames = result.dirnames.sort();

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