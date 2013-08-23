var t = require('./tools.js');

module.exports =
{
	test: function(ast)
	{
		return t.type(ast) === 'String';
	},
	emit: function(ast)
	{
		return "\"" + escape(ast) + "\"";
	},
	requiresSemicolon: true
};

function escape(str)
{
	return str;
}