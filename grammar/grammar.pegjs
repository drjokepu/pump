{
	function Identifier(str)
	{
		this.value = str;
	}

	Identifier.prototype.value = '';
	Identifier.prototype.toString = function()
	{
		return this.value;
	};
}


start =
	exp:list_items_with_whitespace? whitespace { return exp; }

whitespace
	= [ \n]*

s_expression
	= atom
	/ list

atom
	= literal
	/ op:operator { return new Identifier(op); }
	/ identifier

literal
	= numeric_literal
	/ string_literal

numeric_literal
	= digits:[0-9]+ { return parseInt(digits.join(''), 10); }

string_literal
	= "\"" chars:string_char* "\"" { return chars.join(''); }

string_char
	= string_char_not_escaped
	/ string_char_escaped

string_char_not_escaped
	= [^"\\]

string_char_escaped
	= "\\\\" { return "\\"; }
	/ "\\\"" { return "\""; }

identifier
	= head:[a-zA-Z_$] tail:[a-zA-Z0-9_$]* { return new Identifier(head + tail.join('')); }

operator
	= '+'
	/ '-'
	/ '*'
	/ '/'

list
	= "(" list:list_items_with_whitespace whitespace ")" { return list; }

list_items_with_whitespace
	= whitespace list:list_items { return list; }

list_items
	= head:list_head tail:list_tail { return [ head ].concat(tail); }
	/

list_head
	= s_expression

list_tail
	= list_items_with_whitespace
	/
