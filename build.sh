mkdir -p dist
npm install
./node_modules/.bin/webpack --mode=production
rm -f mattermost-bitchute-plugin.tar.gz
rm -rf mattermost-bitchute-plugin
mkdir -p mattermost-bitchute-plugin
cp -r dist/main.js mattermost-bitchute-plugin/
cp plugin.json mattermost-bitchute-plugin/
tar -czvf mattermost-bitchute-plugin.tar.gz mattermost-bitchute-plugin