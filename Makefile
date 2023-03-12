all:
	make prepare
	make linux
	make macos
	make windows
	make webapp
	make pack

prepare:
	rm -f mattermost-bitchute-plugin.tar.gz
	rm -rf mattermost-bitchute-plugin
	mkdir -p mattermost-bitchute-plugin
	mkdir -p mattermost-bitchute-plugin/client
	mkdir -p mattermost-bitchute-plugin/server

linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o mattermost-bitchute-plugin/server/plugin-linux-amd64 server/plugin.go

macos:
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -o mattermost-bitchute-plugin/server/plugin-darwin-amd64 server/plugin.go

windows:
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o mattermost-bitchute-plugin/server/plugin-windows-amd64 server/plugin.go

webapp:
	mkdir -p dist
	npm install
	./node_modules/.bin/webpack --mode=production

pack:
	cp -r dist/main.js mattermost-bitchute-plugin/client
	cp plugin.json mattermost-bitchute-plugin/
	tar -czvf mattermost-bitchute-plugin.tar.gz mattermost-bitchute-plugin
