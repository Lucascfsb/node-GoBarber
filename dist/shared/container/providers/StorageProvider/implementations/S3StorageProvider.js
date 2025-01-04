"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _clientS = require("@aws-sdk/client-s3");
var _upload = _interopRequireDefault(require("../../../../../config/upload"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _clientS.S3Client({
      region: 'us-east-1'
    });
  }
  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file);
    const mime = await Promise.resolve().then(() => _interopRequireWildcard(require('mime')));
    const ContentType = mime.default.getType(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }
    const fileContent = await _fs.default.promises.readFile(originalPath);
    const command = new _clientS.PutObjectCommand({
      Bucket: _upload.default.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    });
    await this.client.send(command);
    await _fs.default.promises.unlink(originalPath);
    return file;
  }
  async deleteFile(file) {
    const command = new _clientS.DeleteObjectCommand({
      Bucket: _upload.default.config.aws.bucket,
      Key: file
    });
    await this.client.send(command);
  }
}
var _default = exports.default = S3StorageProvider;