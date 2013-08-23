var fs = require('fs');
var grammar = require('../grammar/grammar.js')
var Q = require('q');
var emit = require('./emit');

function compileFile(filePath)
{
	var deferred = Q.defer();

	process.nextTick(function()
	{
		Q.fcall(function()
		{
			return parseAst(filePath).then(function(ast)
			{
				return compileAst(ast);
			});
		})
		.then(function(output)
		{
			deferred.resolve(output);
		}, function(err)
		{
			deferred.reject(err);
		});
	});

	return deferred.promise;
}

function parseAst(filePath)
{
	return Q.ninvoke(fs, 'readFile', filePath).then(function(src)
	{
		return src.toString('utf8');
	})
	.then(function(src)
	{
		return grammar.parse(src);
	});
}

function compileAst(ast)
{
	var output = '';
	for (var i = 0; i < ast.length; i++)
	{
		output = output + emit(ast[i]);
	}
	return output;
}

module.exports =
{
	compileFile: compileFile
};