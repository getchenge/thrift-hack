/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var POW_8 = Math.pow(2, 8);
var POW_16 = Math.pow(2, 16);
var POW_24 = Math.pow(2, 24);
var POW_32 = Math.pow(2, 32);
var POW_40 = Math.pow(2, 40);
var POW_48 = Math.pow(2, 48);
var POW_52 = Math.pow(2, 52);
var POW_1022 = Math.pow(2, 1022);

exports.readByte = function (b) {
  return b > 127 ? b - 256 : b;
};

exports.readI16 = function (buff, off) {
  off = off || 0;
  var v = buff[off + 1];
  v += buff[off] << 8;
  if (buff[off] & 128) {
    v -= POW_16;
  }
  return v;
};

exports.readI32 = function (buff, off) {
  off = off || 0;
  var v = buff[off + 3];
  v += buff[off + 2] << 8;
  v += buff[off + 1] << 16;
  v += buff[off] * POW_24;
  if (buff[off] & 0x80) {
    v -= POW_32;
  }
  return v;
};

exports.writeI16 = function (buff, v) {
  buff[1] = v & 0xff;
  v >>= 8;
  buff[0] = v & 0xff;
  return buff;
};

exports.writeI32 = function (buff, v) {
  buff[3] = v & 0xff;
  v >>= 8;
  buff[2] = v & 0xff;
  v >>= 8;
  buff[1] = v & 0xff;
  v >>= 8;
  buff[0] = v & 0xff;
  return buff;
};

exports.readDouble = function (buff, off) {
  return buff.readDoubleLE(off);
};

/*
 * Based on code from the jspack module:
 * http://code.google.com/p/jspack/
 */
exports.writeDouble = function (buff, v) {
  var buff = new Buffer(8);
  buff.writeDoubleLE(v, 0);
  return buff;
};
