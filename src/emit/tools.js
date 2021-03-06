var present = function(val)
{
	return val !== undefined && val !== null;
};

var type = function(val)
{
	return present(val) ? val.constructor.name : val;
};

var isForm = function(val)
{
	return type(val) === 'Array' && val.length > 0 && type(val[0]) === 'Identifier';
}

var isFormWithName = function(val, name)
{
	return isForm(val) && val[0].value === name;
};

var option = function(opt, name)
{
	return present(opt) ? opt[name] : null;
}

var indent = function(level)
{
	if (!present(level) || level === 0) return '';
	return new Array(level + 1).join('    ');
}

module.exports =
{
	present: present,
	type: type,
	isForm: isForm,
	isFormWithName: isFormWithName,
	option: option,
	indent: indent
}