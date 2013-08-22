global.grammar = require('./grammar.js');

function parse(str)
{
    try
    {
        return global.grammar.parse(str);
    }
    catch(err)
    {
        throw new Error(err);
    }
}

var grammarEval = function(cmd, context, filename, callback)
{
	try
    {
    	var scmd = cmd.substr(1, cmd.length - 2);
        callback(null, parse(scmd));
    }
    catch(err)
    {
        callback(err, null);
    }
};

require('repl').start({ eval: grammarEval });
