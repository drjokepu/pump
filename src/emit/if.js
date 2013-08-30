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
		return t.isFormWithName(ast, 'if');
	},
	emit: function(ast, options, indent)
	{
		if (ast.length < 3)
		{
			throw new Error('If statement is too short.');
		}

		if (ast.length > 4)
		{
			throw new Error('If statement is too long.')
		}

		if (options.allowStatement === true)
		{
			return emitStatement(ast, indent)
		}
		else
		{
			return emitExpression(ast, indent);
		}
		return output;
	},
	requiresSemicolon: function(opt)
	{
		return opt.allowStatement !== true;
	}
};

function emitStatement(ast, indent)
{
	var condition = emit.expression(ast[1]);
	var trueBranch = emit(ast[2],
	{
		allowStatement: true,
		'return': false,
		semicolon: true
	}, null, indent + 1);

	if (ast.length === 3)
	{
		return 'if (' + condition + ')\n' + t.indent(indent) + '{\n' +
			trueBranch + '\n' + t.indent(indent) + '}';
	}
	else
	{
		var falseBranch = emit(ast[3],
		{
			allowStatement: true,
			'return': false,
			semicolon: true
		}, null, indent + 1);
		return 'if (' + condition + ')\n' + t.indent(indent) + '{\n' + trueBranch + '\n' +
			t.indent(indent) + '}\n' +
			t.indent(indent) + 'else\n' + t.indent(indent) + '{\n' +
			falseBranch + '\n' + t.indent(indent) + '}';
	}
}

function emitExpression(ast, indent)
{
	var condition = emit.expression(ast[1]);
	var trueBranch = emit(ast[2],
	{
		allowStatement: false,
		'return': false,
		semicolon: false
	}, indent + 1);

	if (ast.length === 3)
	{
		return '(' + condition + ') ? (' + trueBranch + ') : undefined';
	}
	else
	{
		var falseBranch = emit(ast[3],
		{
			allowStatement: false,
			'return': false,
			semicolon: false
		}, indent + 1);
		return '(' + condition + ') ? (' + trueBranch + ') : (' + falseBranch + ')';
	}
}