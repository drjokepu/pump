var present = function(val)
{
	return val !== undefined && val !== null;
};

var type = function(val)
{
	return present(val) ? val.constructor.name : val;
};

var isFormWithName = function(val, name)
{
	return type(val) === 'Array' && val.length > 0 &&
		type(val[0]) === 'Identifier' && val[0].value === name;
};

module.exports =
{
	present: present,
	type: type,
	isFormWithName: isFormWithName
}