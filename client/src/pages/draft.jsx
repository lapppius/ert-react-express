function getRadioInfoPromise(res) {
    return new Promise((resolve, reject) => {
        // twitter: P2002, facebook: P2013, instagram: P2003, email: P968, website: P856, headquarters location: P159, streamUrl: P963, phone: P1329, frequencies: P2144
        const radio = {};
        for (const obj of Object.entries(res.entities)) {
            const claims = [
                'P2002',
                'P2003',
                'P2013',
                'P968',
                'P856',
                'P159',
                'P963',
                'P1329',
                'P2144',
            ];

            for (const claim of claims) {
                try {
                    const expression =
                        obj[1].claims[claim][0].mainsnak.datavalue.value;
                    switch (claim) {
                        // case 'P2002':
                        //     radio.twitter = expression;
                        //     break;
                        // case 'P2003':
                        //     radio.instagram = expression;
                        //     break;
                        // case 'P2013':
                        //     radio.facebook = expression;
                        //     break;
                        // case 'P963':
                        //     radio.streamUrl = expression;
                        //     break;
                        // case 'P968':
                        //     radio.email = expression;
                        //     break;
                        // case 'P856':
                        //     radio.website = expression;
                        //     break;
                        // case 'P1329':
                        //     const phones = [];
                        //     for (const phone of obj[1].claims[claim]) {
                        //         phones.push(phone.mainsnak.datavalue.value);
                        //     }
                        //     // obj[1].claims[claim][0].mainsnak.datavalue.value;

                        //     radio.phone = phones;
                        //     break;
                        // case 'P2144':
                            // const frequencies = {};
                            // const fm = [];
                            // const mw = [];
                            // const sw = [];
                            // for (const freq of obj[1].claims[claim]) {
                            //     const frequency =
                            //         freq.mainsnak.datavalue.value.amount.replace(
                            //             '+',
                            //             ''
                            //         );
                            //     const unit =
                            //         freq.mainsnak.datavalue.value.unit.replace(
                            //             'http://www.wikidata.org/entity/',
                            //             ''
                            //         );
                            //     // MHz Q732707
                            //     if (
                            //         frequency >= 87.5 &&
                            //         frequency <= 108 &&
                            //         unit === 'Q732707'
                            //     ) {
                            //         fm.push(frequency);
                            //     } else if (
                            //         frequency >= 531 &&
                            //         frequency <= 1602 &&
                            //         unit === 'Q2143992'
                            //     ) {
                            //         mw.push(frequency);
                            //     } else if (unit === 'Q2143992') {
                            //         sw.push(frequency);
                            //     }
                            // }
                            // frequencies.fm = fm;
                            // frequencies.mw = mw;
                            // frequencies.sw = sw;
                            // radio.fm = fm;
                            // radio.mw = mw;
                            // radio.sw = sw;
                            // break;
                        case 'P159':
                            let city = undefined;
                            let street = undefined;
                            let postcode =
                                obj[1].claims[claim][0].qualifiers.P281[0]
                                    .datavalue.value;
                            let number =
                                obj[1].claims[claim][0].qualifiers.P670[0]
                                    .datavalue.value;
                            let lat =
                                obj[1].claims[claim][0].qualifiers.P625[0]
                                    .datavalue.value.latitude;
                            let lon =
                                obj[1].claims[claim][0].qualifiers.P625[0]
                                    .datavalue.value.longitude;

                            getStreetPromise(
                                obj[1].claims[claim][0].qualifiers.P6375
                            ).then((res) => {
                                street = res;
                            });

                            getEntityNamePromise(
                                obj[1].claims[claim][0].mainsnak.datavalue.value
                                    .id
                            ).then((res) => {
                                city = res;
                            });

                            const location = {
                                city: city,
                                street: street,
                                number: number,
                                postcode: postcode,
                                lat: lat,
                                lon: lon,
                            };
                            radio.location = location;

                            break;
                        default:
                            break;
                    }
                } catch (error) {}
            }
            // radio.title = obj[1].sitelinks.elwiki.title;
            // radio.id = obj[1].id;
            resolve(radio);
        }
    });
}
