/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/* This file was autogenerated from https://raw.githubusercontent.com/awslabs/smithy-vscode/master/syntaxes/smithy.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SmithyHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            include: "#comment"
        }, {
            token: [
                "meta.keyword.statement.smithy",
                "variable.other.smithy",
                "text",
                "keyword.operator.smithy"
            ],
            regex: /^(\$)(\s+.+)(\s*)(=)/
        }, {
            token: [
                "keyword.statement.smithy",
                "text",
                "entity.name.type.namespace.smithy"
            ],
            regex: /^(namespace)(\s+)([A-Z-a-z0-9_\.#$-]+)/
        }, {
            token: [
                "keyword.statement.smithy",
                "text",
                "keyword.statement.smithy",
                "text",
                "entity.name.type.smithy"
            ],
            regex: /^(use)(\s+)(shape|trait)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/
        }, {
            token: [
                "keyword.statement.smithy",
                "variable.other.smithy",
                "text",
                "keyword.operator.smithy"
            ],
            regex: /^(metadata)(\s+.+)(\s*)(=)/
        }, {
            token: [
                "keyword.statement.smithy",
                "text",
                "entity.name.type.smithy"
            ],
            regex: /^(apply|byte|short|integer|long|float|double|bigInteger|bigDecimal|boolean|blob|string|timestamp|service|resource|trait|list|map|set|structure|union|document)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/
        }, {
            token: [
                "keyword.operator.smithy",
                "text",
                "entity.name.type.smithy",
                "text",
                "text",
                "support.function.smithy",
                "text",
                "text",
                "support.function.smithy"
            ],
            regex: /^(operation)(\s+)([A-Z-a-z0-9_\.#$-]+)(\(.*\))(?:(\s*)(->)(\s*[A-Z-a-z0-9_\.#$-]+))?(?:(\s+)(errors))?/
        }, {
            include: "#trait"
        }, {
            token: [
                "support.type.property-name.smithy",
                "punctuation.separator.dictionary.pair.smithy"
            ],
            regex: /([A-Z-a-z0-9_\.#$-]+)(:)/
        }, {
            include: "#value"
        }, {
            token: "keyword.other.smithy",
            regex: /\->/
        }],
        "#comment": [{
            include: "#doc_comment"
        }, {
            include: "#line_comment"
        }],
        "#doc_comment": [{
            token: "comment.block.documentation.smithy",
            regex: /\/\/\/.*/
        }],
        "#line_comment": [{
            token: "comment.line.double-slash.smithy",
            regex: /\/\/.*/
        }],
        "#trait": [{
            token: [
                "punctuation.definition.annotation.smithy",
                "storage.type.annotation.smithy"
            ],
            regex: /(@)([0-9a-zA-Z\.#-]+)/
        }, {
            token: [
                "punctuation.definition.annotation.smithy",
                "punctuation.definition.object.end.smithy",
                "meta.structure.smithy"
            ],
            regex: /(@)([0-9a-zA-Z\.#-]+)(\()/,
            push: [{
                token: "punctuation.definition.object.end.smithy",
                regex: /\)/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                include: "#object_inner"
            }, {
                defaultToken: "meta.structure.smithy"
            }]
        }],
        "#value": [{
            include: "#constant"
        }, {
            include: "#number"
        }, {
            include: "#string"
        }, {
            include: "#array"
        }, {
            include: "#object"
        }],
        "#array": [{
            token: "punctuation.definition.array.begin.smithy",
            regex: /\[/,
            push: [{
                token: "punctuation.definition.array.end.smithy",
                regex: /\]/,
                next: "pop"
            }, {
                include: "#comment"
            }, {
                include: "#value"
            }, {
                token: "punctuation.separator.array.smithy",
                regex: /,/
            }, {
                token: "invalid.illegal.expected-array-separator.smithy",
                regex: /[^\s\]]/
            }, {
                defaultToken: "meta.structure.array.smithy"
            }]
        }],
        "#constant": [{
            token: "constant.language.smithy",
            regex: /\b(?:true|false|null)\b/
        }],
        "#number": [{
            token: "constant.numeric.smithy",
            regex: /-?(?:0|[1-9]\d*)(?:(?:\.\d+)?(?:[eE][+-]?\d+)?)?/
        }],
        "#object": [{
            token: "punctuation.definition.dictionary.begin.smithy",
            regex: /\{/,
            push: [{
                token: "punctuation.definition.dictionary.end.smithy",
                regex: /\}/,
                next: "pop"
            }, {
                include: "#trait"
            }, {
                include: "#object_inner"
            }, {
                defaultToken: "meta.structure.dictionary.smithy"
            }]
        }],
        "#object_inner": [{
            include: "#comment"
        }, {
            include: "#string_key"
        }, {
            token: "punctuation.separator.dictionary.key-value.smithy",
            regex: /:/,
            push: [{
                token: "punctuation.separator.dictionary.pair.smithy",
                regex: /,|(?=\})/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                token: "invalid.illegal.expected-dictionary-separator.smithy",
                regex: /[^\s,]/
            }, {
                defaultToken: "meta.structure.dictionary.value.smithy"
            }]
        }, {
            token: "invalid.illegal.expected-dictionary-separator.smithy",
            regex: /[^\s\}]/
        }],
        "#string_key": [{
            include: "#identifier_key"
        }, {
            include: "#dquote_key"
        }, {
            include: "#squote_key"
        }],
        "#identifier_key": [{
            token: "support.type.property-name.smithy",
            regex: /[A-Z-a-z0-9_\.#$-]+/
        }],
        "#dquote_key": [{
            include: "#dquote"
        }],
        "#squote_key": [{
            include: "#squote"
        }],
        "#string": [{
            include: "#textblock"
        }, {
            include: "#dquote"
        }, {
            include: "#squote"
        }, {
            include: "#identifier"
        }],
        "#textblock": [{
            token: "punctuation.definition.string.begin.smithy",
            regex: /"""/,
            push: [{
                token: "punctuation.definition.string.end.smithy",
                regex: /"""/,
                next: "pop"
            }, {
                token: "constant.character.escape.smithy",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.double.smithy"
            }]
        }],
        "#dquote": [{
            token: "punctuation.definition.string.begin.smithy",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.smithy",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.smithy",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.double.smithy"
            }]
        }],
        "#squote": [{
            token: "punctuation.definition.string.begin.smithy",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.smithy",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.smithy",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.single.smithy"
            }]
        }],
        "#identifier": [{
            token: "storage.type.smithy",
            regex: /[A-Z-a-z_][A-Z-a-z0-9_\.#$-]*/
        }]
    }
    
    this.normalizeRules();
};

SmithyHighlightRules.metaData = {
    name: "Smithy",
    fileTypes: ["smithy"],
    scopeName: "source.smithy",
    foldingStartMarker: "(\\{|\\[)\\s*",
    foldingStopMarker: "\\s*(\\}|\\])"
}


oop.inherits(SmithyHighlightRules, TextHighlightRules);

exports.SmithyHighlightRules = SmithyHighlightRules;
});