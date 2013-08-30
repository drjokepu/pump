var tools = require('./tools.js')

var transformers =
[
	require('./number.js'),
	require('./string.js'),
	require('./identifier.js'),
	require('./arithmetic.js'),
	require('./function.js'),
	require('./refinement.js'),
	require('./if.js'),
	require('./list.js')
];

function findTransformer(ast)
{
	for (var i = 0; i < transformers.length; i++)
	{
		if (transformers[i].test(ast))
		{
			return transformers[i];
		}
	}

	throw new Error('Unknown structure: \n' + JSON.stringify(ast, null, 4));
}

function emit(ast, opt, out, indent)
{
	if (!tools.present(indent)) indent = 0;

	var transformer = findTransformer(ast);
	var emitReturn = tools.option(opt, 'return') === true;
	var output = transformer.emit(ast, opt, indent);

	if (emitReturn && transformer.canEmitReturn !== true)
	{
		output = 'return ' + output;
		if (requiresSemicolon(transformer.requiresSemicolon, opt))
		{
			output += ';';
		}
	}
	else if (tools.option(opt, 'semicolon') && !refusesSemicolon(transformer.refusesSemicolon, opt))
	{
		output += ';';
	}

	if (tools.present(out))
	{
		out.transformer = transformer;
	}

	return tools.indent(indent) + output;
}

emit.block = function(ast, indent)
{
	if (!tools.present(indent)) indent = 0;

	var opt = { allowStatement: true };
	if (tools.type(ast) === 'Array')
	{
		var output = '';
		for (var i = 0; i < ast.length; i++)
		{
			var out = {};
			var itemOutput = emit(ast[i], opt, out, indent);
			output += itemOutput;
			if (requiresSemicolon(out.transformer.requiresSemicolon, opt))
			{
				output += ';';
			} 
		}
		return output;
	}
	else
	{
		return emit(ast, opt, indent);
	}
}

function requiresSemicolon(req, opt)
{
	if (req === undefined || req === null || req === false) return false;
	if (req === true) return true;
	if (req.constructor.name === 'Function') return req(opt) === true;
	return false;
}

function refusesSemicolon(req, opt)
{
	if (req === undefined || req === null || req === true) return false;
	if (req === false) return true;
	if (req.constructor.name === 'Function') return req(opt) === false;
	return false;
}

emit.statement = function(ast)
{
	return emit(ast, { allowStatement: true });
}

emit.expression = function(ast)
{
	return emit(ast, { allowStatement: false });
}

module.exports = emit;