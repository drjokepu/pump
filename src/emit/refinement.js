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
		return t.isFormWithName(ast, 'ref');
	},
	emit: function(ast)
	{
		if (ast.length < 3)
		{
			throw new Error('Refinement is too short.');
		}

		var output = emit(ast[1]);

		for (var i = 2; i < ast.length; i++)
		{
			if (t.type(ast[i]) === 'Identifier')
			{
				output = output + '.' + ast[i].value;
			}
			else
			{
				output = output + '[' + emit(ast[i]) + ']';
			}
		}

		return output;
	},
	requiresSemicolon: true
};