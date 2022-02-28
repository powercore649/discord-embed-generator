new Vue({
    el: '#app',
    data: {
        cbxColor: false,
        embed: {
            color: "#0099ff",
            title: 'This is the title',
            url: 'https://discord.js.org',
            author: {
                name: 'Kater-Bot',
                icon_url: 'https://katerlol.github.io/discord-embed-generator/img/katerbot-pfp.webp',
                url: 'https://discord.js.org',
            },
            description: 'This is the description',
            thumbnail: {
                url: 'https://picsum.photos/200/200',
            },
            fields: [{
                    name: 'Regular field Title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://picsum.photos/500/500',
            },
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://katerlol.github.io/discord-embed-generator/img/katerbot-pfp.webp',
            },
        },
    },

    components: {
            draggable: window['vuedraggable'],
    },

    methods: {
        printTimestamp: function (timestamp) {
            return timestamp.toLocaleString();
        },

        // from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
        isValidURL: function (str) {
            var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null)
        },

        toEmbedStr: function () {
            const embedToPrint = Object.assign({}, this.embed);

            for (let i = 0; i < embedToPrint.fields; i++) {
                embedToPrint.fields[i].name = embedToPrint.fields[i].name ? embedToPrint.fields[i].name.trim() : '\\u200b';
                embedToPrint.fields[i].value = embedToPrint.fields[i].value ? embedToPrint.fields[i].value.trim() : '\\u200b';
            }

            for (let key of Object.keys(embedToPrint)) {
                let value = embedToPrint[key];
                if (value == null || value == '') {
                    delete embedToPrint[key];
                }
            }

            if (embedToPrint.author.name === "" && embedToPrint.author.icon_url === "" && embedToPrint.author.url === "")
                delete embedToPrint.author;

            if (embedToPrint.thumbnail.url === "")
                delete embedToPrint.thumbnail;

            if (embedToPrint.image.url === "")
                delete embedToPrint.image;

            if (embedToPrint.footer.text === "" && embedToPrint.footer.icon_url === "")
                delete embedToPrint.footer;

                alert(`!richembed post ${JSON.stringify(embedToPrint)}`);
            return JSON.stringify(embedToPrint);
        },

        isValidHexCode: function (hexCode) {
            return /^#[0-9A-F]{6}$/i.test(hexCode);
        },

        updateColor: function () {
            this.cbxColor = true;
            if (this.isValidHexCode(this.embed.color)) {
                document.body.style.setProperty('--background-color', this.embed.color);
            } else {
                document.body.style.setProperty('--background-color', "#202225");
            }
        },

        clearColor: function () {
            this.$nextTick(() => {
                this.embed.color = "";
                document.body.style.setProperty('--background-color', "#202225");
            });
        },

        deleteField: function (index) {
            this.embed.fields.splice(index, 1);
        },

        addField: function () {
            this.embed.fields.push({
                name: "\u200b",
                value: "\u200b",
                inline: false,
            })
        },

        clearTimestamp: function (event) {
            this.$nextTick(() => {
                if (!event.target.checked) {
                    this.embed.timestamp = "";
                } else {
                    this.embed.timestamp = new Date();
                }
            });
        },

        clearEmbed: function () {

            for (let key of Object.keys(this.embed)) {
                let value = this.embed[key];
                console.log(key, typeof value);
                if(typeof value == "string") {
                    this.embed[key] = "";
                }
                this.clearColor();
                this.embed.author.name = "";
                this.embed.author.icon_url = "";
                this.embed.author.url = "";
                this.embed.thumbnail.url = "";
                this.embed.image.url = "";
                this.embed.footer.text = "";
                this.embed.footer.icon_url = "";
                this.embed.timestamp = null;
                this.embed.fields = [];

            }
        },

        hoverField: function (index) {
            document.querySelectorAll('.discord-embed .discord-embed-field')[index].classList.add("hovered");
        },

        blurField: function (index) {
            document.querySelectorAll('.discord-embed .discord-embed-field')[index].classList.remove("hovered");
        },
    },

    created: function () {
        this.updateColor("#0099ff");
    }

})