import { v4 as uuidv4 } from "uuid";

export function createFileName(filename: string) {
    const imageExt = filename.split(".").pop();
    const imageName = filename.split(".")[0];

    return `${imageName}-${uuidv4()}.${imageExt}`;
}

// {
// [1]   name: 'search.png',
// [1]   data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 64 00 00 03 57 08 06 00 00 00 ea df ef 49 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2252615 more bytes>,
// [1]   size: 2252665,
// [1]   encoding: '7bit',
// [1]   tempFilePath: '',
// [1]   truncated: false,
// [1]   mimetype: 'image/png',
// [1]   md5: '19f5cd930579a3d62c4f4678dce1df43',
// [1]   mv: [Function: mv]
// [1] }
