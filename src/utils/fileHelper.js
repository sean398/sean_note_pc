const fs = window.require('fs').promises

const fileHelper = {
    readFile:path=>{
        return fs.readFile(path,{encoding:'utf8'})
    },
    writeFile:(path,content)=>{
        return fs.writeFile(path,content,{encoding:'utf8'})
    },
    renameFile:(oldPath,newPath)=>{
        return fs.rename(oldPath,newPath)
    },
    deleteFile:path=>{
        return fs.unlink(path)
    }
}

export default fileHelper