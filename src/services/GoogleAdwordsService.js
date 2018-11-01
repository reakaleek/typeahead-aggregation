import _ from "lodash";

export default class GoogleAdwordsService {

    getData = (word) => {

        if (!word) {
            return Promise.all([]);
        }

        return new Promise(resolve => {
            setTimeout(() => {
                import('../adwords.json')
                    .then(data => {
                        const adwords = _.tail(data.default.data.split('\n')).map(this.mapToAdword);
                        resolve(adwords.filter(this.containsWord(word)));
                    })
            }, 500);
        })
    };

    containsWord = (word) => ({campaign, channel}) =>
        campaign.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        || channel.toLocaleLowerCase().includes(word.toLocaleLowerCase());

    mapToAdword = (line) => {
        const values = line.split(',');
        return {
            campaign: values[0],
            channel: values[1],
            clicks: values[2],
            impressions: values[3]
        };
    };

}