"use strict";
// Taken from the source of chrome devtools:
// https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/platform/utilities.js#L805-L1006
exports.__esModule = true;
exports.String = void 0;
// Copyright 2014 The Chromium Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
var String;
(function (String) {
    /**
     * @param {string} string
     * @param {number} index
     * @return {boolean}
     */
    function isDigitAt(string, index) {
        var c = string.charCodeAt(index);
        return 48 <= c && c <= 57;
    }
    /**
     * @param {string} format
     * @param {!Object.<string, function(string, ...):*>} formatters
     * @return {!Array.<!Object>}
     */
    function tokenizeFormatString(format, formatters) {
        var tokens = [];
        var substitutionIndex = 0;
        function addStringToken(str) {
            if (tokens.length && tokens[tokens.length - 1].type === 'string')
                tokens[tokens.length - 1].value += str;
            else
                tokens.push({ type: 'string', value: str });
        }
        function addSpecifierToken(specifier, precision, substitutionIndex) {
            tokens.push({
                type: 'specifier',
                specifier: specifier,
                precision: precision,
                substitutionIndex: substitutionIndex
            });
        }
        var index = 0;
        for (var precentIndex = format.indexOf('%', index); precentIndex !== -1; precentIndex = format.indexOf('%', index)) {
            if (format.length === index)
                // unescaped % sign at the end of the format string.
                break;
            addStringToken(format.substring(index, precentIndex));
            index = precentIndex + 1;
            if (format[index] === '%') {
                // %% escape sequence.
                addStringToken('%');
                ++index;
                continue;
            }
            if (isDigitAt(format, index)) {
                // The first character is a number, it might be a substitution index.
                var number = parseInt(format.substring(index), 10);
                while (isDigitAt(format, index))
                    ++index;
                // If the number is greater than zero and ends with a "$",
                // then this is a substitution index.
                if (number > 0 && format[index] === '$') {
                    substitutionIndex = number - 1;
                    ++index;
                }
            }
            var precision = -1;
            if (format[index] === '.') {
                // This is a precision specifier. If no digit follows the ".",
                // then the precision should be zero.
                ++index;
                precision = parseInt(format.substring(index), 10);
                if (isNaN(precision))
                    precision = 0;
                while (isDigitAt(format, index))
                    ++index;
            }
            if (!(format[index] in formatters)) {
                addStringToken(format.substring(precentIndex, index + 1));
                ++index;
                continue;
            }
            addSpecifierToken(format[index], precision, substitutionIndex);
            ++substitutionIndex;
            ++index;
        }
        addStringToken(format.substring(index));
        return tokens;
    }
    /**
     * @param {string} format
     * @param {?ArrayLike} substitutions
     * @param {!Object.<string, function(string, ...):Q>} formatters
     * @param {!T} initialValue
     * @param {function(T, Q): T|undefined} append
     * @param {!Array.<!Object>=} tokenizedFormat
     * @return {!{formattedResult: T, unusedSubstitutions: ?ArrayLike}};
     * @template T, Q
     */
    function format(format, substitutions, formatters, initialValue, append, tokenizedFormat) {
        if (!format || !substitutions || !substitutions.length)
            return {
                formattedResult: append(initialValue, format),
                unusedSubstitutions: substitutions
            };
        function prettyFunctionName() {
            return ('String.format("' +
                format +
                '", "' +
                Array.prototype.join.call(substitutions, '", "') +
                '")');
        }
        function warn(msg) {
            console.warn(prettyFunctionName() + ': ' + msg);
        }
        function error(msg) {
            console.error(prettyFunctionName() + ': ' + msg);
        }
        var result = initialValue;
        var tokens = tokenizedFormat || tokenizeFormatString(format, formatters);
        var usedSubstitutionIndexes = {};
        for (var i = 0; i < tokens.length; ++i) {
            var token = tokens[i];
            if (token.type === 'string') {
                result = append(result, token.value);
                continue;
            }
            if (token.type !== 'specifier') {
                error('Unknown token type "' + token.type + '" found.');
                continue;
            }
            if (token.substitutionIndex >= substitutions.length) {
                // If there are not enough substitutions for the current substitutionIndex
                // just output the format specifier literally and move on.
                error('not enough substitution arguments. Had ' +
                    substitutions.length +
                    ' but needed ' +
                    (token.substitutionIndex + 1) +
                    ', so substitution was skipped.');
                result = append(result, '%' + (token.precision > -1 ? token.precision : '') + token.specifier);
                continue;
            }
            usedSubstitutionIndexes[token.substitutionIndex] = true;
            if (!(token.specifier in formatters)) {
                // Encountered an unsupported format character, treat as a string.
                warn('unsupported format character \u201C' +
                    token.specifier +
                    '\u201D. Treating as a string.');
                result = append(result, substitutions[token.substitutionIndex]);
                continue;
            }
            result = append(result, formatters[token.specifier](substitutions[token.substitutionIndex], token));
        }
        var unusedSubstitutions = [];
        for (var i = 0; i < substitutions.length; ++i) {
            if (i in usedSubstitutionIndexes)
                continue;
            unusedSubstitutions.push(substitutions[i]);
        }
        return { formattedResult: result, unusedSubstitutions: unusedSubstitutions };
    }
    String.format = format;
})(String = exports.String || (exports.String = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbXBvbmVudC9kZXZ0b29scy1wYXJzZXIvc3RyaW5nLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBNEM7QUFDNUMsNkdBQTZHOzs7QUFFN0csNERBQTREO0FBQzVELEVBQUU7QUFDRixxRUFBcUU7QUFDckUseUVBQXlFO0FBQ3pFLE9BQU87QUFDUCxFQUFFO0FBQ0Ysc0VBQXNFO0FBQ3RFLGdFQUFnRTtBQUNoRSwrREFBK0Q7QUFDL0QseUVBQXlFO0FBQ3pFLGdFQUFnRTtBQUNoRSxnQkFBZ0I7QUFDaEIsNERBQTREO0FBQzVELHVFQUF1RTtBQUN2RSwyREFBMkQ7QUFDM0QsRUFBRTtBQUNGLHNFQUFzRTtBQUN0RSxvRUFBb0U7QUFDcEUsd0VBQXdFO0FBQ3hFLHVFQUF1RTtBQUN2RSx3RUFBd0U7QUFDeEUsbUVBQW1FO0FBQ25FLHdFQUF3RTtBQUN4RSx3RUFBd0U7QUFDeEUsc0VBQXNFO0FBQ3RFLHdFQUF3RTtBQUN4RSx1RUFBdUU7QUFFdkUsSUFBaUIsTUFBTSxDQTJNdEI7QUEzTUQsV0FBaUIsTUFBTTtJQUNyQjs7OztPQUlHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDeEMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsb0JBQW9CLENBQUMsTUFBVyxFQUFFLFVBQWU7UUFDeEQsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFBO1FBQ3BCLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFBO1FBRXpCLFNBQVMsY0FBYyxDQUFDLEdBQVE7WUFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FB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