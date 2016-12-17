### Intro
This is a basic module that goes recursively through all the subdirectories of a given directory and groups the files and folders in the following form:

```javascript 
    {
        filenames: [
            "/foo/f1.txt",
            "/foo/f2.txt",
            "/foo/bar/bar1.txt",
            "/foo/bar/bar2.txt"
        ],
        dirnames: [
            "/foo",
            "/foo/bar"
            "/foo/bar/baz"
        ]
    }
    
    // Notice all the paths are absolute
```    

### Prerequisites
- Node >= v4.4.7 (it might work with lower versions)

### Install 
- `npm install` - Install the nodejs modules

### Test
- `npm test` - It will run the unit tests
   
### TODO 
- Add eslint
