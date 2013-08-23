var emit = null;
var t = require('./tools.js');
var _ = require('underscore');

process.nextTick(function()
{
	emit = require('./emit.js');
});

var operators = ['+', '-', '*', '/'];

module.exports =
{
	test: function(ast)
	{
		for (var i = 0; i < operators.length; i++)
		{
			if (t.isFormWithName(ast, operators[i]))
			{
				return true;
			}
		}
		return false;
	},
	emit: function(ast)
	{
		var operands = _.map(_.rest(ast), emit);
		return '(' + operands.join(ast[0]) + ')';
	},
	requiresSemicolon: true
};