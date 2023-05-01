const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { execSync } = require('node:child_process')

const protosAbsDir = join(__dirname, 'proto');

function getProtoFilePath(fileName) {
    return `/proto/${fileName}`;
}

const protocCliString = 'protoc --plugin=node_modules/.bin/protoc-gen-ts_proto.cmd -I=./proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb'

const protoSuffix = '.proto';

function cleanProtoExt(protoFile) {
    return protoFile.replace(protoSuffix, '');
} 

function getProtoGenCmd(protoFile) {
    const protoName = cleanProtoExt(protoFile);
    const protoPath = getProtoFilePath(protoFile);

    return `${protocCliString} --ts_proto_out=/src/${protoName} ${protoPath}`;
}

const protos = readdirSync(protosAbsDir);

const command =
    protos
        .map(getProtoGenCmd)
        .join(' && ');

execSync(command);