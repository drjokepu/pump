var emit = null, undef = null;
var t = require('./tools.js');
var _ = require('underscore');

process.nextTick(function()
{
	emit = require('./emit.js');
	undef = require('./undefined.js');
});

module.exports =
{
	test: function(ast)
	{
		return t.isFormWithName(ast, 'block');
	},
	emit: function(ast, options, indent)
	{
		var statements = [];

		for (var i = 1; i < ast.length; i++)
		{
			if (i === ast.length - 1 && undef.test(ast[i])) continue;

			statements.push(emit(ast[i], {
				allowStatement: true,
				'return': options['return'] === true && i === ast.length - 1,
				semicolon: true
			}, indent));
		}

		return statements.join('\n' + t.indent(indent));
	},
	requiresSemicolon: false,
	handlesReturn: true
};