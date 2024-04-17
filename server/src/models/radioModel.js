export default class Radio {
  constructor({ id, slug, name, streamURL, logoURL, wikidataId, epgId }) {
    this.id = id;
    this.slug = slug || null;
    this.name = name || null;
    this.streamURL = streamURL || null;
    this.logoURL = logoURL || null;
    this.wikidataId = wikidataId || null;
    this.epgId = epgId || null;
  }
}
