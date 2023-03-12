import React from 'react';
import axios from 'axios';


class PluginSettings {
    constructor(data) {
        /**
         * @type {number}
         */
        this.width = data.width == null ? 600 : data.width;
        /**
         * @type {number}
         */
        this.height = data.height == null ? 340 : data.height;
    }
}

class PostWillRenderEmbed extends React.Component {
    static plugin;
    /**
     * @type {PluginSettings}
     */
    static settings;

    render() {
        let title = '';
        let description = '';
        let iframeWidth = 600, iframeHeight = 340;

        try {
            iframeWidth = PostWillRenderEmbed.settings.width;
            iframeHeight = PostWillRenderEmbed.settings.height;
        } catch {
            try {
                iframeWidth = PostWillRenderEmbed.plugin.props.iframeWidth;
                iframeHeight = PostWillRenderEmbed.plugin.props.iframeHeight;
            } catch { }
        }

        try {
            title = this.props.embed.data.title;
            description = this.props.embed.data.description;
        } catch {
        }

        const url = this.props.embed.url.replace('/video/', '/embed/');

        return (
            <div>
                <h5>
                    Bitchute -&nbsp;
                    <a href={this.props.embed.url} target="_blank">
                        {title}
                    </a>
                </h5>
                <div>
                    <small>{description}</small>
                </div>
                <iframe src={url} width={iframeWidth} height={iframeHeight}>
                </iframe>
            </div>
        );
    }
}

class BitchutePlugin {
    static apiUrl = '/plugins/bitchute';

    initialize(registry, store) {
        PostWillRenderEmbed.plugin = store.getState().plugins.plugins.bitchute;
        axios.get(`${BitchutePlugin.apiUrl}/settings`)
            .then(res => {
                /**
                 * @type {PluginSettings}
                 */
                PostWillRenderEmbed.settings = new PluginSettings(res.data);
                registry.registerPostWillRenderEmbedComponent(
                    this.handleEmbed,
                    PostWillRenderEmbed,
                    false,
                );
            })
            .catch(err => {
                /**
                 * @type {PluginSettings}
                 */
                PostWillRenderEmbed.settings = new PluginSettings();
                registry.registerPostWillRenderEmbedComponent(
                    this.handleEmbed,
                    PostWillRenderEmbed,
                    false,
                );
            });
    }

    handleEmbed(embed) {
        if (embed.type == 'opengraph' && embed.url.includes('bitchute.com')) {
            return true;
        }
        return false;
    }

    uninitialize() {
        // No clean up required.
    }
}

window.registerPlugin('bitchute', new BitchutePlugin());