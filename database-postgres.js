import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabasePostgres {
  #videos = new Map();

  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * from videos where title like ${
        '%' + search + '%'
      }`;
    } else {
      videos = await sql`SELECT * from videos`;
    }

    return videos;
  }

  async create(video) {
    const id = randomUUID();
    const { title, description, duration, url } = video;

    await sql`insert into videos (id, title, description, duration, url) VALUES (${id}, ${title}, ${description}, ${duration}, ${url})`;
  }

  async update(videoId, video) {
    const { title, description, duration, url } = video;

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration}, url = ${url} WHERE id = ${videoId}`;
  }

  async delete(videoId) {
    return await sql`delete from videos where id = ${videoId}`;
  }
}
