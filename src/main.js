var ClosureCompiler = require("closurecompiler");
var compiler = require('./compiler.js');
var fs = require('fs');
var mktemp = require('mktemp');
var path = require('path');
var program = require('commander');
var os = require('os');
var Q = require('q');
var UglifyJS = require("uglify-js");

program
	.version('0.0.1')
	.option('-c, --closure', 'Optimize output with the Closure Compiler')
	.option('-u, --uglify', 'Uglify output')
	.parse(process.argv);

function main()
{
	process.nextTick(delayedMain);
}

function delayedMain()
{
	if (program.args.length > 0)
	{
		for (var i = 0; i < program.args.length; i++)
		{
			compileFile(program.args[i], program.uglify, program.closure);
		}
	}
}

function compileFile(filePath, uglify, closure)
{
	compiler.compileFile(filePath).then(function(output)
	{
		if (closure)
		{
			return closureCompileFile(output);
		}
		else if (uglify)
		{
			return UglifyJS.minify(output,
			{
				fromString: true
			}).code;
		}
		else
		{
			return output;
		}
	})
	.then(function(output)
	{
		console.log(output);
	})
	.done();
}

function closureCompileFile(contents)
{
	var deferred = Q.defer(), tempPath = null;
	Q.ninvoke(mktemp, 'createFile', path.join(os.tmpdir(),
		'pump.compile.XXXXXXX.js')).then(function(tempPath_arg)
	{
		tempPath = tempPath_arg;
		return Q.ninvoke(fs, 'writeFile', tempPath, contents);
	})
	.then(function()
	{
		return Q.ninvoke(ClosureCompiler, 'compile',
		[
			tempPath
		],
		{
			compilation_level: "ADVANCED_OPTIMIZATIONS"
		}
		);
	})
	.then(function(output)
	{
		deferred.resolve(output);
	}, function(err)
	{
		deferred.reject(err);
	})
	.fin(function()
	{
		return Q.ninvoke(fs, 'unlink', tempPath);
	});

	return deferred.promise;
}

module.exports = main;