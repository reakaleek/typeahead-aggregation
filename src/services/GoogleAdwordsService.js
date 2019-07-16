import _ from "lodash";
import flow from "lodash/fp/flow";
import tail from "lodash/fp/tail";
import map from "lodash/fp/map";
import filter from "lodash/fp/filter";
import groupBy from "lodash/fp/groupBy";
import mapValues from "lodash/fp/mapValues";
import values from "lodash/fp/values";
import split from "lodash/fp/split";

export default class GoogleAdwordsService {

    getData = (word) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!word) {
                    resolve([]);
                }
                import('../adwords.json')
                    .then(data => {
                        resolve(this.aggregated(word)(data.default.data));
                    }).catch(err => {
                        reject(err);
                    })
            }, 500);
        })
    };

    aggregated = (word) => flow(
        split('\n'),
        tail,
        values,
        map(this.mapToAdword),
        filter(this.containsWord(word)),
        groupBy((o) => o.channel),
        mapValues((arr) => this.reduced(arr)),
        values
    );

    mapToAdword = (line) => {
        try {
            const splitted = line.split(',');
            return {
                campaign: splitted[0].split('|'),
                channel: splitted[1],
                clicks: splitted[2],
                impressions: splitted[3]
            };
        } catch (e) {
            return {}
        }

    };

    containsWord = (word) => ({campaign, channel}) => {
        return campaign.join('|').toLocaleLowerCase().includes(word.toLocaleLowerCase())
            || channel.toLocaleLowerCase().includes(word.toLocaleLowerCase());
    };


    reduced = (arr) => _.reduce(arr, (acc, curr) => {
        return {
            ...acc,
            clicks: Number(curr.clicks) + Number(acc.clicks),
            impressions: Number(curr.impressions) + Number(acc.clicks),
            campaign: _.union([...acc.campaign, ...curr.campaign]),
            channel: curr.channel
        }
    }, { clicks: 0, impressions: 0, campaign: '', channel: '' });
}