import _ from "lodash";

export default class GoogleAdwordsService {

    getData = (word) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!word) {
                    resolve([]);
                }
                import('../adwords.json')
                    .then(data => {
                        const adwords = _.tail(data.default.data.split('\n')).map(this.mapToAdword);
                        const filtered = _.filter(adwords, this.containsWord(word));
                        const grouped = _.groupBy(filtered, (o) => o.channel);
                        const aggregated = _.mapValues(
                            grouped, (arr) => _.reduce(arr, (acc, curr) => {
                                return {
                                    ...acc,
                                    clicks: Number(curr.clicks) + Number(acc.clicks),
                                    impressions: Number(curr.impressions) + Number(acc.clicks),
                                    campaign: _.union([...acc.campaign, ...curr.campaign]),
                                    channel: curr.channel
                                }
                            }, { clicks: 0, impressions: 0, campaign: '', channel: '' })
                        );
                        resolve(_.values(aggregated));
                    }).catch(err => {
                        reject(err);
                    })
            }, 500);
        })
    };

    containsWord = (word) => ({campaign, channel}) => {
        return campaign.join('|').toLocaleLowerCase().includes(word.toLocaleLowerCase())
            || channel.toLocaleLowerCase().includes(word.toLocaleLowerCase());
    };


    mapToAdword = (line) => {
        const values = line.split(',');
        return {
            campaign: values[0].split('|'),
            channel: values[1],
            clicks: values[2],
            impressions: values[3]
        };
    };

}