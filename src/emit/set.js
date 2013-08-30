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
		return t.isFormWithName(ast, 'set');
	},
	emit: function(ast, options, indent)
	{
		if (ast.length < 2)
		{
			throw new Error('Set form is too short.')
		}

		var statements = [];
		for (var i = 1; i < ast.length; i++)
		{
			var assignmentAst = ast[i];
			if (t.type(assignmentAst) === 'Array')
			{
				if (assignmentAst.length !== 2)
				{
					throw new Error('Assignment list must have two items.');
				}

				var name = emit.expression(assignmentAst[0]);
				var value = emit.expression(assignmentAst[1]);
				statements.push(name + ' = ' + value);
			}
			else
			{
				throw new Error('Assignment arguments must be pairs.')
			}
		}

		var statementsString = statements.join(';\n' + t.indent(indent));
		return statementsString;
	},
	requiresSemicolon: true,
	handlesReturn: true
};