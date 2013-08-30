var emit = null;
var t = require('./tools.js');
var _ = require('underscore');

process.nextTick(function()
{
	emit = require('./emit.js');
});

module.exports =
{
	test: function(ast)
	{
		return t.isFormWithName(ast, 'fn');
	},
	emit: function(ast, opt, indent)
	{
		if (ast.length < 3)
		{
			throw new Error('Function declaration is too short.');
		}

		if (ast.length > 4)
		{
			throw new Error('Function declaration is too long.');
		}

		if (ast.length === 4 && t.type(ast[1]) !== 'Identifier')
		{
			throw new Error('Function name must be an identifier.');
		}

		var argIndex = ast.length === 3 ? 1 : 2;
		if (t.type(ast[argIndex]) !== 'Array')
		{
			throw new Error('Function argument list must be a list.');
		}

		for (var i = 0; i < ast[argIndex].length; i++)
		{
			if (t.type(ast[argIndex][i]) !== 'Identifier')
			{
				throw new Error('Function arguments must be identifiers');
			}
		}

		var tail = _.rest(ast);
		var name = null, args = null, body = null;

		if (tail.length === 2)
		{
			args = tail[0];
			body = tail[1];
		}
		else
		{
			name = tail[0];
			args = tail[1];
			body = tail[2];
		}

		var output = 'function ';
		if (name !== null) output = output + emit(name);
		output +=
			'(' + _.pluck(args, 'value').join(',') + ')\n' + t.indent(indent) + '{\n' +
			emit(body, { "return": true, allowStatement: true }, null, indent + 1) +
			'\n' +
			t.indent(indent) +
			'}';
		return output;
	},
	requiresSemicolon: false
};