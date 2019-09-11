# Use Node with Python using spawn with a JSON output

Some things are quick to get going with Python - and there's a lot of python out there for the Raspberry Pi for instance, but node is great at doing other stuff.

## Getting Started

Make sure that the python prints something that looks like JSON
e.g. 

````print '{"temperature":',temperature,',"pressure":',pressure,',"humidity":',humidity,'}'````

The javascript does some stuff to strip any problematic invisible characters from the string and turns it into JSON, you should then be able to use the JSON output
