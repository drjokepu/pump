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
		return t.type(ast) === 'Array' && ast.length > 0;
	},
	emit: function(ast)
	{
		// for the time being, we assume that everything is a function call
		var name = emit(ast[0]);
		var operands = _.map(_.rest(ast), emit);
		return name + '(' + operands.join(',') + ')';
	},
	requiresSemicolon: true
};