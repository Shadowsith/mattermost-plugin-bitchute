import React from 'react';

class PostWillRenderEmbed extends React.Component {
    static plugin = null;

    render() {
        let title = '';
        let description = '';
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
                <small>{description}</small>
                <iframe src={url} width="600" height="350">
                </iframe>
            </div>
        );
    }
}

class BitchutePlugin {
    initialize(registry, store) {
        const plugin = store.getState().plugins.plugins.bitchute;
        PostWillRenderEmbed.plugin = plugin;
        registry.registerPostWillRenderEmbedComponent(
            (embed) => {
                if (embed.type == 'opengraph' && embed.url.includes('bitchute.com')) {
                    return true;
                }
                return false;
            },
            PostWillRenderEmbed,
            false,
        );
    }

    uninitialize() {
        // No clean up required.
    }
}

window.registerPlugin('bitchute', new BitchutePlugin());