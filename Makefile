
test:
	USR=$(USR) PWD=$(PWD) ./node_modules/.bin/mocha

.PHONY: test