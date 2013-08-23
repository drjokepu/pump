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
	emit: function(ast)
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

		if (t.type(ast[ast.length === 3 ? 2 : 3]) !== 'Array')
		{
			throw new Error('Function body must be a list.');
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
		output = output + '(' + emit(args).join(',') + ') {' + emit(body, { "return": true }) + '}';
		return output;
	},
	requiresSemicolon: false
};