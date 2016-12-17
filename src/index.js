'use strict'; // In order to be able to use Block-scoped declarations (let, const, function, class)

const fs = require('fs');
const path = require('path');

const dirNames = [];
const fileNames = [];

// It walks recursively throught a directory. It calls 'done' when recursivity is finished
const walk = (dir, done) => {
  fs.readdir(dir, (err, files) => {
    let pending;

    // Return if error
    if (err) {
      return done(err);
    }

    // Add the current dir
    dirNames.push(dir);

    // Return if the directory is empty
    pending = files.length;
    if (!pending) {
      return done();
    }

    // Go through the files/folders
    files.forEach((file) => {
      const fileAbsPath = path.resolve(dir, file);

      // Read the file stats
      fs.stat(fileAbsPath, (err, stat) => {
        // Return if error
        if (err && pending > 0) {
          pending = 0; // To avoid multiple calls to 'done'
          done(err);
        }

        // If it's a directory, call 'walk' recursively
        if (stat.isDirectory()) {
          walk(fileAbsPath, (err) => {
            // Done if there are no elements pending
            if (!--pending) {
              done(err);
            }
          });
        } else { // If it's a file
          // Add the file path
          fileNames.push(fileAbsPath);

          // Done if there are no elements pending
          if (!--pending) {
            done();
          }
        }
      });
    });

  });
};

module.exports = (folderPath) => {
  return new Promise((resolve, reject) => {
    walk(folderPath, (err) => {
      // Reject if there's an error
      if (err) {
        reject(err);
      } else { // Resolve when we could go through the entire directory tree
        resolve({
          filenames: fileNames,
          dirnames: dirNames,
        });
      }
    });
  });
};
